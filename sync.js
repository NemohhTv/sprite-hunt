/*
  Sprite Hunt data patch.
  Updates the checklist to the current Fortnite.GG count: 91 released sprites.
*/
(function () {
  const data = window.SPRITE_DATA;
  if (!data || !Array.isArray(data.sprites)) return;

  const variants = [
    ["basic", "Basic", ""],
    ["gold", "Gold", "Gold "],
    ["candy", "Candy", "Gummy "],
    ["galaxy", "Galaxy", "Galaxy "],
    ["gem", "Gem", "Gem "],
    ["holofoil", "Holofoil", "Holofoil "],
    ["cube", "Cube", "Cube "],
    ["quack", "Quack", "Quack "]
  ];

  const blocks = [
    ["family", "batman", "Batman", "Mythic", ["basic", "gold", "candy", "galaxy", "holofoil", "cube"]],
    ["family", "water", "Water", "Rare", ["basic", "gold", "candy", "galaxy", "holofoil"]],
    ["family", "earth", "Earth", "Rare", ["basic", "gold", "candy", "galaxy", "cube"]],
    ["family", "fire", "Fire", "Rare", ["basic", "gold", "candy", "galaxy", "holofoil", "cube"]],
    ["family", "duck", "Duck", "Epic", ["basic", "gold", "candy", "galaxy"]],
    ["family", "ghost", "Ghost", "Epic", ["basic", "gold", "candy", "galaxy", "holofoil"]],
    ["family", "dream", "Dream", "Legendary", ["basic", "gold", "candy", "galaxy", "cube"]],
    ["family", "demon", "Demon", "Epic", ["basic", "gold", "candy", "galaxy"]],
    ["family", "punk", "Punk", "Legendary", ["basic", "gold", "candy", "galaxy", "cube"]],
    ["family", "king", "King", "Epic", ["basic", "gold", "candy", "galaxy", "holofoil"]],
    ["single", "theburntpeanut_basic", "Burnt Peanut", "Mythic", false],
    ["single", "vinijr_basic", "Vini Jr.", "Mythic", false],
    ["family", "zeropoint", "Zero Point", "Mythic", ["basic", "gold", "candy", "galaxy"]],
    ["family", "fishy", "Fishy", "Rare", ["basic", "gold", "candy", "galaxy", "cube"]],
    ["family", "striker", "Striker", "Epic", ["basic", "gold", "candy", "galaxy", "holofoil"]],
    ["family", "aura", "Aura", "Epic", ["basic", "gold", "candy", "galaxy"]],
    ["family", "boss", "Boss", "Legendary", ["basic", "gold", "candy", "galaxy", "cube"]],
    ["family", "grim", "Grim", "Mythic", ["basic", "gold", "candy", "galaxy", "cube"]],
    ["family", "air", "Air", "Rare", ["basic", "gold", "candy", "galaxy", "holofoil"]],
    ["family", "seven", "Seven", "Legendary", ["basic", "gold", "candy", "galaxy", "holofoil"]],
    ["single", "wick_basic", "John Wick", "Mythic", true],
    ["single", "pollo_basic", "Pollo", "Mythic", false]
  ];

  const icon = "https://fortnite.gg/img/x/sprites/icons/";
  const defaultFile = {
    batman: "T_Icon_BR_FossilMeal_Default_L.webp",
    water: "T_Icon_BR_Creature_Sprite_Water_Unvault_Ch7S3_ui_L.webp",
    earth: "T_Icon_BR_Creature_Sprite_Earth_Ch7S3_UI_L.webp",
    fire: "T_Icon_BR_Creature_Sprite_Fire_Unvault_Ch7S3_ui_L.webp",
    duck: "T_Icon_BR_Duck_Default_L.webp",
    ghost: "T_Icon_BR_Creature_Sprite_Ghost_Unvault_L.webp",
    dream: "T_Icon_BR_Creature_Sprite_Sleepy_ui_L.webp",
    demon: "T_Icon_BR_RedDemon_Default_L.webp",
    punk: "T_Icon_BR_Creature_Sprite_Punk_ui_L.webp",
    king: "T_Icon_BR_Creature_Sprite_King_ui_L.webp",
    zeropoint: "T_Icon_BR_Creature_Sprite_ZeroPoint_ui_L.webp",
    fishy: "T_Icon_BR_Creature_Sprite_Fishy_ui_L.webp",
    striker: "T_Icon_BR_Creature_Sprite_Soccer_ui_L.webp",
    aura: "T_Icon_BR_Creature_Sprite_Drifter_ui_L.webp",
    boss: "T_Icon_BR_Creature_Sprite_Boss_ui_L.webp",
    grim: "T_Icon_BR_GrimReaper_Default_L.webp",
    air: "T_Icon_BR_Air_Default_L.webp",
    seven: "T_Icon_BR_Creature_Sprite_Seven_ui_L.webp",
    theburntpeanut: "T_Icon_BR_Creature_Sprite_BurntPeanut_ui_L.webp",
    vinijr: "T_Icon_BR_CokeParmesan_Default_L.webp",
    wick: "tmp_john_wick.webp",
    pollo: "T_Icon_BR_CompanyStargazer_Default_L.webp"
  };

  const prefix = {
    batman: "T_Icon_BR_FossilMeal_{V}_L.webp",
    water: "T_Icon_BR_Creature_Sprite_Water_{V}_ui_L.webp",
    earth: "T_Icon_BR_Creature_Sprite_Earth_{V}_ui_L.webp",
    fire: "T_Icon_BR_Creature_Sprite_Fire_{V}_ui_L.webp",
    duck: "T_Icon_BR_Duck_{V}_L.webp",
    ghost: "T_Icon_BR_Creature_Sprite_Ghost_{V}_ui_L.webp",
    dream: "T_Icon_BR_Creature_Sprite_Sleepy_{V}_ui_L.webp",
    demon: "T_Icon_BR_RedDemon_{V}_L.webp",
    punk: "T_Icon_BR_Creature_Sprite_Punk_{V}_ui_L.webp",
    king: "T_Icon_BR_Creature_Sprite_King_{V}_ui_L.webp",
    zeropoint: "T_Icon_BR_Creature_Sprite_ZeroPoint_{V}_ui_L.webp",
    fishy: "T_Icon_BR_Creature_Sprite_Fishy_{V}_L.webp",
    striker: "T_Icon_BR_Creature_Sprite_Soccer_{V}_ui_L.webp",
    aura: "T_Icon_BR_Creature_Sprite_Drifter_{V}_ui_L.webp",
    boss: "T_Icon_BR_Creature_Sprite_Boss_{V}_ui_L.webp",
    grim: "T_Icon_BR_GrimReaper_{V}_L.webp",
    air: "T_Icon_BR_Air_{V}_L.webp",
    seven: "T_Icon_BR_Creature_Sprite_Seven_{V}_ui_L.webp"
  };

  const specialFile = {
    batman_gem: "tmp_batman_gem.webp",
    batman_quack: "tmp_batman_quack.webp",
    water_cube: "tmp_water_cube.webp",
    water_quack: "tmp_water_quack.webp",
    earth_quack: "tmp_earth_quack.webp",
    fire_quack: "tmp_fire_quack.webp",
    duck_holofoil: "tmp_duck_holofoil.webp",
    duck_cube: "tmp_duck_cube.webp",
    duck_quack: "tmp_duck_quack.webp",
    ghost_cube: "tmp_ghost_cube.webp",
    ghost_quack: "tmp_ghost_quack.webp",
    dream_gem: "tmp_sleepy_gem.webp",
    dream_holofoil: "tmp_sleepy_holofoil.webp",
    dream_quack: "tmp_sleepy_quack.webp",
    demon_holofoil: "tmp_demon_holofoil.webp",
    demon_cube: "tmp_demon_cube.webp",
    demon_quack: "tmp_demon_quack.webp",
    punk_holofoil: "tmp_punk_holofoil.webp",
    king_gem: "tmp_king_gem.webp",
    king_cube: "tmp_king_cube.webp",
    king_quack: "tmp_king_quack.webp",
    zeropoint_holofoil: "tmp_zero_point_holofoil.webp",
    zeropoint_cube: "tmp_zero_point_cube.webp",
    fishy_gem: "tmp_fishy_gem.webp",
    fishy_holofoil: "tmp_fishy_holofoil.webp",
    fishy_quack: "tmp_fishy_quack.webp",
    grim_gem: "tmp_grim_gem.webp",
    grim_holofoil: "tmp_grim_holofoil.webp",
    grim_quack: "tmp_grim_quack.webp",
    air_gem: "tmp_air_gem.webp",
    air_holofoil: "T_Icon_BR_Air_Holo_L.webp",
    air_cube: "tmp_air_cube.webp",
    air_quack: "tmp_air_quack.webp",
    seven_gem: "tmp_seven_gem.webp",
    seven_cube: "tmp_seven_cube.webp",
    seven_quack: "tmp_seven_quack.webp"
  };

  const token = { gold: "Gold", candy: "Candy", galaxy: "Galaxy", gem: "Gem", holofoil: "Holofoil", cube: "Cube", quack: "Quack" };

  function spriteName(baseName, variant, label) {
    return variant === "basic" ? baseName : label + baseName;
  }

  function spriteImage(id) {
    const parts = id.split("_");
    const variant = parts.pop();
    const family = parts.join("_");
    if (variant === "basic") return icon + defaultFile[family];
    if (specialFile[id]) return icon + specialFile[id];
    return icon + prefix[family].replace("{V}", token[variant]);
  }

  const desired = [];
  for (const block of blocks) {
    if (block[0] === "single") {
      desired.push({ id: block[1], name: block[2], theme: "Basic", rarity: block[3], unreleased: block[4] });
      continue;
    }
    const family = block[1], baseName = block[2], rarity = block[3], released = new Set(block[4]);
    for (const [variant, theme, label] of variants) {
      desired.push({
        id: family + "_" + variant,
        name: spriteName(baseName, variant, label),
        theme,
        rarity: variant === "basic" ? rarity : "Special",
        unreleased: !released.has(variant)
      });
    }
  }

  data.sprites = desired;
  data.images = data.images || {};
  for (const s of desired) {
    if (!data.images[s.id] || s.id === "zeropoint_holofoil") data.images[s.id] = spriteImage(s.id);
  }

  const newlyReleased = [
    "batman_basic", "batman_gold", "batman_candy", "batman_galaxy", "batman_holofoil", "batman_cube",
    "water_holofoil", "earth_cube", "fire_holofoil", "fire_cube", "ghost_holofoil", "dream_cube",
    "punk_cube", "king_holofoil", "vinijr_basic", "fishy_cube", "striker_holofoil", "boss_cube",
    "grim_cube", "air_basic", "air_gold", "air_candy", "air_galaxy", "air_holofoil",
    "seven_basic", "seven_gold", "seven_candy", "seven_galaxy", "seven_holofoil", "pollo_basic"
  ];

  const wanted = new Set(desired.map(s => s.id));
  const missing = new Set((data.missing || []).filter(id => wanted.has(id)));
  for (const id of newlyReleased) missing.add(id);
  data.missing = desired.filter(s => missing.has(s.id)).map(s => s.id);
  data.version = "2026-07-23-fortnitegg-91";
})();

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