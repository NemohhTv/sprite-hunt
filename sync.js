/*
  Sprite Hunt — real-time sync bridge.
  The dashboard PUBLISHES your progress to a private "room"; the overlay SUBSCRIBES to it.
  Because they talk through a messaging broker (not the browser), the dashboard on any
  device stays in sync with the overlay running in OBS — live.

  Default broker is a free public one (no account). Data is namespaced by a random room
  code, so nobody sees your progress unless they have your exact overlay URL.

  --- Want it fully private/rock-solid instead? Swap to your own Firebase or an MQTT broker
      with credentials by editing BROKER below. Everything else stays the same. ---
*/
(function () {
  const BROKER = "wss://broker.emqx.io:8084/mqtt"; // free public broker, WebSocket + TLS
  const PREFIX = "spritehunt/v1/";
  let client = null, topic = null, onStateCb = null, onStatusCb = null;

  function setStatus(s) { if (onStatusCb) onStatusCb(s); }

  window.SpriteSync = {
    state: "idle", // idle | connecting | live | offline
    room: null,

    // Make or reuse a room code (dashboard side).
    resolveRoom() {
      const url = new URLSearchParams(location.search).get("room");
      if (url) return url;
      let r = null;
      try { r = localStorage.getItem("spriteHuntRoom"); } catch (e) {}
      if (!r) {
        r = Math.random().toString(36).slice(2, 8) + Math.random().toString(36).slice(2, 6);
        try { localStorage.setItem("spriteHuntRoom", r); } catch (e) {}
      }
      return r;
    },

    // Build the overlay URL to paste into OBS, based on where this page is hosted.
    overlayUrl(room) {
      try { return new URL("overlay.html?room=" + room, location.href).href; }
      catch (e) { return "overlay.html?room=" + room; }
    },

    init({ room, onState, onStatus }) {
      this.room = room;
      onStateCb = onState; onStatusCb = onStatus;
      topic = PREFIX + room + "/state";

      if (typeof mqtt === "undefined") { this.state = "offline"; setStatus("offline"); return; }
      this.state = "connecting"; setStatus("connecting");

      const cid = "sh_" + Math.random().toString(16).slice(2, 10);
      client = mqtt.connect(BROKER, { clientId: cid, clean: true, reconnectPeriod: 4000, connectTimeout: 9000, keepalive: 30 });

      client.on("connect", () => { this.state = "live"; setStatus("live"); client.subscribe(topic, { qos: 0 }); });
      client.on("reconnect", () => { this.state = "connecting"; setStatus("connecting"); });
      client.on("offline", () => { this.state = "offline"; setStatus("offline"); });
      client.on("close", () => { if (this.state === "live") { this.state = "offline"; setStatus("offline"); } });
      client.on("error", (e) => { console.warn("[SpriteSync]", e && e.message); });
      client.on("message", (t, payload) => {
        if (t !== topic) return;
        try { const msg = JSON.parse(payload.toString()); if (onStateCb) onStateCb(msg); } catch (e) {}
      });
    },

    // Dashboard publishes a retained message so the overlay gets the latest state the
    // instant it connects (even if it started after the last change).
    publish(msg) {
      if (!client || this.state !== "live") return;
      try { client.publish(topic, JSON.stringify(msg), { qos: 0, retain: true }); } catch (e) {}
    }
  };
})();
