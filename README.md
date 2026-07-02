# Sprite Hunt — live OBS tracker

A colorful sprite-collection dashboard plus a small on-stream overlay that celebrates every
catch. Host it on GitHub Pages once, and the dashboard (on any device) stays in sync with the
overlay in OBS **live** — check a sprite off, the overlay animates within about a second.

## Files
- **index.html** — the dashboard (grid you click to mark sprites caught + the "Copy OBS overlay URL" button)
- **overlay.html** — the compact "Now Hunting" overlay for your stream
- **sprites-data.js** — all sprite info + artwork (shared by both pages)
- **sync.js** — the real-time bridge that keeps them in sync

## 1. Put it on GitHub Pages
1. Create a new GitHub repo (public), e.g. `sprite-hunt`.
2. Upload all four files to the repo root.
3. Repo **Settings → Pages** → *Build and deployment* → Source: **Deploy from a branch** → Branch: **main** / **/(root)** → Save.
4. Wait ~1 minute. Your dashboard is now live at:
   `https://YOUR-USERNAME.github.io/sprite-hunt/`

## 2. Get your OBS overlay URL
1. Open your dashboard URL in a browser.
2. Up top you'll see **OBS overlay URL** with a **Copy** button. Click **Copy**.
   (It looks like `https://YOUR-USERNAME.github.io/sprite-hunt/overlay.html?room=abc123`.)
   The little dot shows **Live** when it's connected.

## 3. Add the overlay to OBS
1. Sources → **+** → **Browser**.
2. **Un-check** "Local file", paste the overlay URL into **URL**.
3. Set Width/Height around **360 × 480**. Background is transparent, so it floats over gameplay.
4. Done. Leave the dashboard open on your second monitor.

## 4. Hunt
Click a sprite in the dashboard when you catch it — the overlay snaps to it, bursts confetti,
slams a "SPRITE CAUGHT!" banner, and drops it from the rotation. Your progress ring ticks up.

---

### Good to know
- **Keep your overlay URL private.** The `?room=` code is your sync channel. It isn't shown to
  viewers (it only lives in the OBS source), so you're fine — just don't paste it on stream.
- **Controlling from more than one device?** Open the dashboard with the same room code on each,
  e.g. `.../index.html?room=abc123`. (On its own, a fresh device makes a new room.)
- **Cycle speed:** add `&speed=6000` to the overlay URL for 6 seconds per sprite (default 4.5s).
- **Offline backup:** the dashboard still has Save/Load backup buttons to export your progress as JSON.

### Want it fully private / rock-solid?
The default broker (`broker.emqx.io`) is a free public one — great for getting started, but shared
and not guaranteed. To make it private and reliable, open **sync.js** and change the `BROKER` line to
your own Firebase Realtime Database or a credentialed MQTT broker. Everything else stays the same.
