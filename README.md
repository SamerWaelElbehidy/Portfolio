# Samer Wael — Portfolio

Static portfolio site (no build step): a professional landing page plus a 3D world you drive through.

- `index.html` — landing page: flagship projects, nine domains, searchable/filterable project explorer, about, contact.
- `world.html` — Three.js driving world. Each domain is a district; every project is a landmark. Drive up to one and press **Enter** (or tap *Open* on mobile).
- `js/data.js` — the single source of truth for projects (written from the actual source code / repos). A project lists every domain it belongs to in `cats`, and appears in each district.
- `js/vendor/three.min.js` — Three.js r128 (MIT), vendored so the site has no CDN dependency.

Run locally: `python -m http.server 5174` and open http://localhost:5174.

Controls: `WASD` / arrows drive · `Space` drift · `H` horn · `Enter` open · `R` reset · `C` camera · `Tab` district list · `M` sound.
