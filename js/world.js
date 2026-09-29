/* ==========================================================================
   3D driving world — every project is a landmark, every domain a district.
   Three.js (r128) + a small custom arcade car / prop physics.
   ========================================================================== */
(async function () {
  'use strict';
  const { categories, projects, byCat, cat } = window.PORTFOLIO;
  const UI = window.PortfolioUI;
  const $ = (s) => document.querySelector(s);
  const TAU = Math.PI * 2;
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const lerp = (a, b, t) => a + (b - a) * t;
  const damp = (a, b, k, dt) => lerp(a, b, 1 - Math.exp(-k * dt));
  const angDiff = (a, b) => { let d = (b - a) % TAU; if (d > Math.PI) d -= TAU; if (d < -Math.PI) d += TAU; return d; };
  const IS_TOUCH = matchMedia('(pointer: coarse)').matches;
  // make sure the web fonts exist before any canvas text is drawn
  if (document.fonts && document.fonts.load) {
    await Promise.race([Promise.all([document.fonts.load("700 40px 'Space Grotesk'"), document.fonts.load("500 20px 'JetBrains Mono'"), document.fonts.load("400 20px 'Inter'")]).catch(() => {}), new Promise((r) => setTimeout(r, 2500))]);
  }

  /* ------------------------------------------------------------------ */
  /*  Renderer / scene                                                   */
  /* ------------------------------------------------------------------ */
  const canvas = $('#gl');
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: !IS_TOUCH, powerPreference: 'high-performance' });
  renderer.setPixelRatio(Math.min(devicePixelRatio || 1, IS_TOUCH ? 1.5 : 1.75));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.outputEncoding = THREE.sRGBEncoding;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;

  const FOG = new THREE.Color('#b0708f');
  const scene = new THREE.Scene();
  scene.background = FOG.clone();
  scene.fog = new THREE.FogExp2(FOG, 0.0042);

  const camera = new THREE.PerspectiveCamera(56, 1, 0.5, 1800);
  camera.position.set(0, 10, 30);

  /* lights */
  scene.add(new THREE.HemisphereLight(0xffc7a0, 0x3b3060, 0.85));
  const sun = new THREE.DirectionalLight(0xffb27a, 1.35);
  sun.position.set(-60, 70, -40);
  sun.castShadow = true;
  sun.shadow.mapSize.set(IS_TOUCH ? 1024 : 2048, IS_TOUCH ? 1024 : 2048);
  const sc = sun.shadow.camera; sc.left = -55; sc.right = 55; sc.top = 55; sc.bottom = -55; sc.near = 1; sc.far = 220;
  sun.shadow.bias = -0.0006; sun.shadow.normalBias = 0.05;
  scene.add(sun); scene.add(sun.target);

  /* ------------------------------------------------------------------ */
  /*  Helpers                                                            */
  /* ------------------------------------------------------------------ */
  const mat = (color, o) => new THREE.MeshStandardMaterial(Object.assign({ color, roughness: 0.75, metalness: 0.05 }, o));
  const glow = (color, k) => new THREE.MeshStandardMaterial({ color, emissive: color, emissiveIntensity: k == null ? 0.9 : k, roughness: 0.4, metalness: 0.1 });
  const box = (w, h, d, m) => new THREE.Mesh(new THREE.BoxGeometry(w, h, d), m);
  const cyl = (rt, rb, h, seg, m) => new THREE.Mesh(new THREE.CylinderGeometry(rt, rb, h, seg), m);
  function shadowAll(o, cast, recv) { o.traverse((n) => { if (n.isMesh) { n.castShadow = cast !== false; n.receiveShadow = !!recv; } }); return o; }

  function canvasTex(w, h, draw, opts) {
    const c = document.createElement('canvas'); c.width = w; c.height = h;
    const g = c.getContext('2d'); draw(g, w, h);
    const t = new THREE.CanvasTexture(c);
    t.encoding = THREE.sRGBEncoding; t.anisotropy = 4;
    if (opts && opts.repeat) { t.wrapS = t.wrapT = THREE.RepeatWrapping; t.repeat.set(opts.repeat, opts.repeat); }
    return t;
  }
  function wrapText(g, text, x, y, maxW, lineH, maxLines) {
    const words = text.split(/\s+/); let line = '', n = 0;
    for (let i = 0; i < words.length; i++) {
      const test = line ? line + ' ' + words[i] : words[i];
      if (g.measureText(test).width > maxW && line) {
        n++;
        if (n >= maxLines) { g.fillText(line.replace(/\s+\S*$/, '') + '…', x, y); return n; }
        g.fillText(line, x, y); y += lineH; line = words[i];
      } else line = test;
    }
    g.fillText(line, x, y); return n + 1;
  }
  const rr = (g, x, y, w, h, r) => { g.beginPath(); g.moveTo(x + r, y); g.arcTo(x + w, y, x + w, y + h, r); g.arcTo(x + w, y + h, x, y + h, r); g.arcTo(x, y + h, x, y, r); g.arcTo(x, y, x + w, y, r); g.closePath(); };
  const FONT = "'Space Grotesk', 'Inter', system-ui, sans-serif";

  /* seeded random for a stable layout */
  let seed = 20260929; const rnd = () => (seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0) / 4294967296;

  /* ------------------------------------------------------------------ */
  /*  Sky, ground                                                        */
  /* ------------------------------------------------------------------ */
  const sky = new THREE.Mesh(new THREE.SphereGeometry(1100, 32, 16), new THREE.ShaderMaterial({
    side: THREE.BackSide, depthWrite: false, fog: false,
    uniforms: { top: { value: new THREE.Color('#141c4d') }, mid: { value: new THREE.Color('#6d4a92') }, low: { value: new THREE.Color('#b0708f') } },
    vertexShader: 'varying vec3 vP; void main(){ vP = normalize(position); gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }',
    fragmentShader: 'varying vec3 vP; uniform vec3 top; uniform vec3 mid; uniform vec3 low; void main(){ float h = clamp(vP.y,0.0,1.0); vec3 c = mix(low, mid, smoothstep(0.0,0.28,h)); c = mix(c, top, smoothstep(0.22,0.85,h)); gl_FragColor = vec4(c,1.0); }'
  }));
  sky.renderOrder = -10; scene.add(sky);

  // stars
  { const n = 700, p = new Float32Array(n * 3);
    for (let i = 0; i < n; i++) { const a = rnd() * TAU, e = 0.25 + rnd() * 0.75, r = 1000; p[i * 3] = Math.cos(a) * Math.sqrt(1 - e * e) * r; p[i * 3 + 1] = e * r; p[i * 3 + 2] = Math.sin(a) * Math.sqrt(1 - e * e) * r; }
    const g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.BufferAttribute(p, 3));
    const s = new THREE.Points(g, new THREE.PointsMaterial({ color: 0xffffff, size: 2.4, sizeAttenuation: false, fog: false, transparent: true, opacity: 0.8, depthWrite: false }));
    s.renderOrder = -9; scene.add(s); sky.userData.stars = s; }

  // low sun disc
  { const sp = new THREE.Sprite(new THREE.SpriteMaterial({ map: canvasTex(256, 256, (g) => { const gr = g.createRadialGradient(128, 128, 0, 128, 128, 128); gr.addColorStop(0, 'rgba(255,240,200,1)'); gr.addColorStop(0.25, 'rgba(255,190,120,0.85)'); gr.addColorStop(1, 'rgba(255,140,90,0)'); g.fillStyle = gr; g.fillRect(0, 0, 256, 256); }), fog: false, depthWrite: false, transparent: true }));
    sp.scale.set(420, 420, 1); sp.position.set(-520, 150, -700); sp.renderOrder = -8; scene.add(sp); }

  const WORLD_R = 330;
  const groundTex = canvasTex(256, 256, (g, w, h) => {
    g.fillStyle = '#2c5e58'; g.fillRect(0, 0, w, h);
    for (let i = 0; i < 1400; i++) { g.fillStyle = `rgba(${rnd() > 0.5 ? '255,255,255' : '0,20,30'},${0.02 + rnd() * 0.04})`; g.fillRect(rnd() * w, rnd() * h, 2 + rnd() * 3, 2 + rnd() * 3); }
    g.fillStyle = 'rgba(255,255,255,0.035)'; g.fillRect(0, 0, w / 2, h / 2); g.fillRect(w / 2, h / 2, w / 2, h / 2);
  }, { repeat: 70 });
  const ground = new THREE.Mesh(new THREE.CircleGeometry(WORLD_R + 120, 72), new THREE.MeshStandardMaterial({ map: groundTex, roughness: 1, metalness: 0 }));
  ground.rotation.x = -Math.PI / 2; ground.receiveShadow = true; scene.add(ground);

  // world edge: rocky ring
  { const ring = new THREE.Mesh(new THREE.TorusGeometry(WORLD_R + 6, 3.2, 8, 96), mat(0x40355f, { roughness: 1 }));
    ring.rotation.x = Math.PI / 2; ring.position.y = 0.4; ring.scale.z = 2.2; scene.add(ring); }

  /* ------------------------------------------------------------------ */
  /*  Collision world                                                    */
  /* ------------------------------------------------------------------ */
  const CELL = 24;
  const grid = new Map();
  const statics = [];
  const key = (i, j) => i * 4096 + j;
  function addStatic(x, z, r) {
    const c = { x, z, r }; statics.push(c);
    const i = Math.floor(x / CELL), j = Math.floor(z / CELL);
    const k = key(i, j); if (!grid.has(k)) grid.set(k, []); grid.get(k).push(c);
    return c;
  }
  function nearStatics(x, z, out) {
    out.length = 0; const i = Math.floor(x / CELL), j = Math.floor(z / CELL);
    for (let a = -1; a <= 1; a++) for (let b = -1; b <= 1; b++) { const l = grid.get(key(i + a, j + b)); if (l) for (let n = 0; n < l.length; n++) out.push(l[n]); }
    return out;
  }

  /* ------------------------------------------------------------------ */
  /*  Layout                                                             */
  /* ------------------------------------------------------------------ */
  const ROAD_W = 11;
  const PLAZA_R = 22;
  const N = categories.length;
  const RING = 178;
  const districts = categories.map((c, k) => {
    const list = byCat(c.id);
    const a = (k / N) * TAU;
    const u = { x: Math.sin(a), z: -Math.cos(a) };
    const padR = 20 + Math.sqrt(list.length) * 7;
    const C = { x: u.x * RING, z: u.z * RING };
    const entrance = { x: C.x - u.x * (padR - 2), z: C.z - u.z * (padR - 2) };
    return { cat: c, list, a, u, padR, C, entrance, index: k };
  });

  /* ------------------------------------------------------------------ */
  /*  Plaza                                                              */
  /* ------------------------------------------------------------------ */
  const world = new THREE.Group(); scene.add(world);

  function makeDisc(radius, color, opts) {
    const m = new THREE.Mesh(new THREE.CircleGeometry(radius, 64), new THREE.MeshStandardMaterial(Object.assign({ color, roughness: 0.9 }, opts || {})));
    m.rotation.x = -Math.PI / 2; m.receiveShadow = true; return m;
  }

  // Plaza
  { const p = makeDisc(PLAZA_R + 2, 0x2b2f42); p.position.y = 0.02; world.add(p);
    const tex = canvasTex(512, 512, (g, w, h) => {
      g.fillStyle = '#242838'; g.fillRect(0, 0, w, h);
      g.translate(w / 2, h / 2);
      categories.forEach((c, i) => { g.rotate(TAU / N); g.fillStyle = c.color; g.globalAlpha = 0.85; g.beginPath(); g.moveTo(0, -w * 0.32); g.lineTo(-18, -w * 0.26); g.lineTo(18, -w * 0.26); g.closePath(); g.fill(); });
      g.globalAlpha = 1; g.setTransform(1, 0, 0, 1, 0, 0);
      g.strokeStyle = 'rgba(255,255,255,0.22)'; g.lineWidth = 3;
      [0.46, 0.36, 0.14].forEach((r) => { g.beginPath(); g.arc(w / 2, h / 2, w * r, 0, TAU); g.stroke(); });
    });
    const t = new THREE.Mesh(new THREE.CircleGeometry(PLAZA_R, 64), new THREE.MeshStandardMaterial({ map: tex, roughness: 0.85 }));
    t.rotation.x = -Math.PI / 2; t.position.y = 0.05; t.receiveShadow = true; world.add(t); }

  // Central monument: big name sign + rotating sphere of nodes
  const monument = new THREE.Group(); world.add(monument);
  { const base = cyl(4.4, 5, 1.2, 32, mat(0x363b57)); base.position.y = 0.6; base.receiveShadow = true; base.castShadow = true; monument.add(base);
    const core = new THREE.Mesh(new THREE.IcosahedronGeometry(2.6, 1), new THREE.MeshStandardMaterial({ color: 0x7c5cff, emissive: 0x4d33d6, emissiveIntensity: 0.7, flatShading: true, roughness: 0.35 }));
    core.position.y = 5.2; core.castShadow = true; monument.userData.core = core; monument.add(core);
    const wire = new THREE.Mesh(new THREE.IcosahedronGeometry(3.4, 1), new THREE.MeshBasicMaterial({ color: 0x33d6ff, wireframe: true, transparent: true, opacity: 0.5 }));
    wire.position.y = 5.2; monument.userData.wire = wire; monument.add(wire);
    // orbiting domain colours
    const orb = new THREE.Group(); orb.position.y = 5.2; monument.add(orb); monument.userData.orb = orb;
    categories.forEach((c, i) => { const s = new THREE.Mesh(new THREE.SphereGeometry(0.42, 16, 12), glow(c.color, 1)); const a = (i / N) * TAU; s.position.set(Math.cos(a) * 5.2, Math.sin(i * 1.7) * 0.9, Math.sin(a) * 5.2); orb.add(s); });
    // title billboard
    const tex = canvasTex(1024, 384, (g, w, h) => {
      g.clearRect(0, 0, w, h);
      g.textAlign = 'center'; g.fillStyle = '#fff';
      g.font = `700 150px ${FONT}`; g.fillText('SAMER WAEL', w / 2, 170);
      g.font = `500 44px ${FONT}`; g.fillStyle = 'rgba(255,255,255,0.8)';
      g.fillText('ML  ·  Embedded  ·  Robotics  ·  IoT', w / 2, 250);
      g.font = `500 32px 'JetBrains Mono', monospace`; g.fillStyle = '#33d6ff';
      g.fillText('DRIVE TO A DISTRICT  →', w / 2, 326);
    });
    const sign = new THREE.Mesh(new THREE.PlaneGeometry(15, 5.6), new THREE.MeshBasicMaterial({ map: tex, transparent: true, toneMapped: false, side: THREE.DoubleSide, depthWrite: false, fog: false }));
    sign.position.y = 11.6; monument.userData.sign = sign; monument.add(sign);
    addStatic(0, 0, 5.2); }

  /* Roads + district signposts */
  const roadTex = canvasTex(64, 256, (g, w, h) => {
    g.fillStyle = '#2c3044'; g.fillRect(0, 0, w, h);
    g.fillStyle = 'rgba(255,255,255,0.05)'; for (let i = 0; i < 150; i++) g.fillRect(rnd() * w, rnd() * h, 2, 2);
    g.fillStyle = '#ffd23f'; g.fillRect(w / 2 - 2, 20, 4, 80); g.fillRect(w / 2 - 2, 148, 4, 80);
    g.fillStyle = 'rgba(255,255,255,0.7)'; g.fillRect(3, 0, 2, h); g.fillRect(w - 5, 0, 2, h);
  });
  roadTex.wrapT = THREE.RepeatWrapping;
  const roadSegments = [];
  districts.forEach((d) => {
    const from = { x: d.u.x * (PLAZA_R - 2), z: d.u.z * (PLAZA_R - 2) };
    const to = d.entrance;
    const len = Math.hypot(to.x - from.x, to.z - from.z);
    const t = roadTex.clone(); t.needsUpdate = true; t.wrapS = t.wrapT = THREE.RepeatWrapping; t.repeat.set(1, len / 16);
    const road = new THREE.Mesh(new THREE.PlaneGeometry(ROAD_W, len), new THREE.MeshStandardMaterial({ map: t, roughness: 0.9 }));
    road.rotation.order = 'YXZ'; road.rotation.x = -Math.PI / 2; road.rotation.y = -d.a; // long axis along the road
    road.position.set((from.x + to.x) / 2, 0.04, (from.z + to.z) / 2); road.receiveShadow = true; world.add(road);
    roadSegments.push({ a: from, b: to });
    d.roadLen = len;
  });

  /* Signposts at the plaza edge */
  districts.forEach((d) => {
    const c = d.cat;
    const px = d.u.x * (PLAZA_R + 7) + d.u.z * 9, pz = d.u.z * (PLAZA_R + 7) - d.u.x * 9;
    const g = new THREE.Group();
    const post = box(0.35, 4.2, 0.35, mat(0x22263a)); post.position.y = 2.1; g.add(post);
    const tex = canvasTex(512, 160, (cx, w, h) => {
      cx.fillStyle = c.color; rr(cx, 4, 4, w - 8, h - 8, 26); cx.fill();
      cx.fillStyle = 'rgba(8,10,20,0.9)'; rr(cx, 12, 12, w - 24, h - 24, 20); cx.fill();
      cx.fillStyle = c.color; cx.font = `700 60px ${FONT}`; cx.textAlign = 'left'; cx.fillText(c.icon, 34, 100);
      cx.fillStyle = '#fff'; cx.font = `600 34px ${FONT}`; wrapText(cx, c.name, 110, 70, w - 190, 38, 2);
      cx.fillStyle = c.color; cx.font = `700 46px ${FONT}`; cx.textAlign = 'right'; cx.fillText('→', w - 30, 100);
    });
    const s = new THREE.Mesh(new THREE.PlaneGeometry(4.6, 1.44), new THREE.MeshBasicMaterial({ map: tex, toneMapped: false, side: THREE.DoubleSide }));
    s.position.y = 4.4; g.add(s);
    g.position.set(px, 0, pz);
    g.rotation.y = Math.atan2(-d.u.x, -d.u.z); // face the plaza centre
    shadowAll(g, true); world.add(g); addStatic(px, pz, 0.6);
  });

  /* ------------------------------------------------------------------ */
  /*  Emblems                                                            */
  /* ------------------------------------------------------------------ */
  function emblem(id, color) {
    const g = new THREE.Group();
    const m = () => new THREE.MeshStandardMaterial({ color, emissive: color, emissiveIntensity: 0.35, roughness: 0.4, metalness: 0.2 });
    const white = new THREE.MeshStandardMaterial({ color: 0xffffff, emissive: 0xffffff, emissiveIntensity: 0.2, roughness: 0.5 });
    switch (id) {
      case 'healthcare': { const a = box(1.9, 0.62, 0.62, m()), b = box(0.62, 1.9, 0.62, m()); g.add(a, b);
        const ring = new THREE.Mesh(new THREE.TorusGeometry(1.5, 0.08, 8, 40), white); g.add(ring); break; }
      case 'ai': { const c = new THREE.Mesh(new THREE.IcosahedronGeometry(1.05, 0), m()); c.material.flatShading = true; g.add(c);
        const w = new THREE.Mesh(new THREE.IcosahedronGeometry(1.5, 1), new THREE.MeshBasicMaterial({ color, wireframe: true })); g.add(w); g.userData.w = w; break; }
      case 'vision': { const e = new THREE.Mesh(new THREE.SphereGeometry(1.1, 24, 16), white); g.add(e);
        const i = new THREE.Mesh(new THREE.SphereGeometry(0.62, 20, 14), m()); i.position.z = 0.7; g.add(i);
        const p = new THREE.Mesh(new THREE.SphereGeometry(0.28, 16, 12), new THREE.MeshBasicMaterial({ color: 0x0a0a14 })); p.position.z = 1.15; g.add(p); break; }
      case 'iot': { const c = new THREE.Mesh(new THREE.SphereGeometry(0.6, 20, 14), m()); g.add(c);
        [0, 1].forEach((k) => { const r = new THREE.Mesh(new THREE.TorusGeometry(1.25, 0.05, 8, 48), white); r.rotation.set(k ? Math.PI / 2 : 0.5, k ? 0 : 0.3, 0); g.add(r); });
        const orb = new THREE.Group(); for (let i = 0; i < 3; i++) { const s = new THREE.Mesh(new THREE.SphereGeometry(0.22, 12, 10), m()); const a = (i / 3) * TAU; s.position.set(Math.cos(a) * 1.25, 0, Math.sin(a) * 1.25); orb.add(s); } g.add(orb); g.userData.orb = orb; break; }
      case 'agri': { for (let i = 0; i < 3; i++) { const c = new THREE.Mesh(new THREE.ConeGeometry(1.15 - i * 0.28, 1.05, 8), m()); c.position.y = -0.7 + i * 0.75; g.add(c); }
        const t = cyl(0.14, 0.14, 0.7, 8, mat(0x6b4a2b)); t.position.y = -1.3; g.add(t); break; }
      case 'robotics': { const gear = new THREE.Group(); const b = cyl(1, 1, 0.5, 18, m()); b.rotation.x = Math.PI / 2; gear.add(b);
        for (let i = 0; i < 9; i++) { const t = box(0.5, 0.5, 0.5, m()); const a = (i / 9) * TAU; t.position.set(Math.cos(a) * 1.15, Math.sin(a) * 1.15, 0); t.rotation.z = a; gear.add(t); }
        const hole = cyl(0.36, 0.36, 0.56, 12, new THREE.MeshBasicMaterial({ color: 0x0a0a14 })); hole.rotation.x = Math.PI / 2; gear.add(hole); g.add(gear); g.userData.gear = gear; break; }
      case 'embedded': { const chip = box(1.8, 0.3, 1.8, mat(0x161a28, { roughness: 0.4 })); g.add(chip);
        const dot = new THREE.Mesh(new THREE.CircleGeometry(0.16, 12), new THREE.MeshBasicMaterial({ color })); dot.rotation.x = -Math.PI / 2; dot.position.set(-0.6, 0.16, -0.6); g.add(dot);
        for (let i = 0; i < 6; i++) { [[-1, 0], [1, 0], [0, -1], [0, 1]].forEach(([x, z]) => { const pin = box(x ? 0.3 : 0.16, 0.08, z ? 0.3 : 0.16, m()); pin.position.set(x * 1.05 + (z ? (i - 2.5) * 0.28 : 0), 0, z * 1.05 + (x ? (i - 2.5) * 0.28 : 0)); g.add(pin); }); }
        g.rotation.x = 0.5; break; }
      case 'web': { const w = box(2.3, 1.7, 0.16, mat(0x151a2c)); g.add(w);
        const bar = box(2.3, 0.3, 0.2, m()); bar.position.y = 0.7; g.add(bar);
        [0, 1, 2].forEach((i) => { const d = new THREE.Mesh(new THREE.CircleGeometry(0.06, 10), new THREE.MeshBasicMaterial({ color: 0xffffff })); d.position.set(-0.95 + i * 0.16, 0.7, 0.11); g.add(d); });
        for (let i = 0; i < 3; i++) { const l = box(1.6 - i * 0.3, 0.14, 0.1, m()); l.position.set(-0.2 - i * 0.15, 0.15 - i * 0.32, 0.12); g.add(l); } break; }
      case 'interactive': { const k = new THREE.Mesh(new THREE.TorusKnotGeometry(0.7, 0.24, 96, 12), m()); g.add(k); break; }
    }
    return shadowAll(g, true);
  }

  /* ------------------------------------------------------------------ */
  /*  Districts, pedestals, portals                                      */
  /* ------------------------------------------------------------------ */
  const landmarks = []; // every project instance
  const districtGroups = [];

  function billboardTexture(p, c) {
    return canvasTex(384, 192, (g, w, h) => {
      g.fillStyle = '#0b0e1c'; g.fillRect(0, 0, w, h);
      const gr = g.createLinearGradient(0, 0, w, h); gr.addColorStop(0, c.color + '55'); gr.addColorStop(1, c.color + '00');
      g.fillStyle = gr; g.fillRect(0, 0, w, h);
      g.fillStyle = c.color; g.fillRect(0, 0, 10, h);
      g.strokeStyle = 'rgba(255,255,255,0.14)'; g.lineWidth = 2; g.strokeRect(1, 1, w - 2, h - 2);
      g.fillStyle = '#fff'; g.font = `700 33px ${FONT}`; g.textAlign = 'left';
      const lines = wrapText(g, p.name, 28, 50, w - 50, 37, 2);
      g.fillStyle = 'rgba(255,255,255,0.72)'; g.font = `400 19px 'Inter', system-ui, sans-serif`;
      wrapText(g, p.tagline, 28, 50 + lines * 37 + 6, w - 50, 24, lines > 1 ? 2 : 3);
      g.fillStyle = c.color; g.font = `500 15px 'JetBrains Mono', monospace`;
      g.fillText(p.cats.map((id) => cat(id).short).join(' · ').toUpperCase().slice(0, 40), 28, h - 16);
    });
  }

  districts.forEach((d) => {
    const c = d.cat, col = new THREE.Color(c.color);
    const grp = new THREE.Group(); grp.position.set(d.C.x, 0, d.C.z); world.add(grp); districtGroups.push(grp);
    d.group = grp;

    // pad
    const padTex = canvasTex(512, 512, (g, w, h) => {
      g.fillStyle = '#20243a'; g.fillRect(0, 0, w, h);
      const gr = g.createRadialGradient(w / 2, h / 2, 10, w / 2, h / 2, w / 2); gr.addColorStop(0, c.color + '40'); gr.addColorStop(0.65, c.color + '16'); gr.addColorStop(1, c.color + '00');
      g.fillStyle = gr; g.fillRect(0, 0, w, h);
      g.strokeStyle = c.color + '55'; g.lineWidth = 3;
      [0.9, 0.62, 0.3].forEach((r) => { g.beginPath(); g.arc(w / 2, h / 2, w / 2 * r, 0, TAU); g.stroke(); });
    });
    const pad = new THREE.Mesh(new THREE.CircleGeometry(d.padR, 72), new THREE.MeshStandardMaterial({ map: padTex, roughness: 0.9 }));
    pad.rotation.x = -Math.PI / 2; pad.position.y = 0.06; pad.receiveShadow = true; grp.add(pad);
    const rim = new THREE.Mesh(new THREE.RingGeometry(d.padR - 0.5, d.padR, 96), new THREE.MeshBasicMaterial({ color: col, transparent: true, opacity: 0.85, toneMapped: false }));
    rim.rotation.x = -Math.PI / 2; rim.position.y = 0.08; grp.add(rim);

    // monument at centre: stepped plinth + big emblem + name plate
    const plinth = cyl(4.6, 5.2, 0.9, 32, mat(0x2b3050)); plinth.position.y = 0.45; plinth.castShadow = true; plinth.receiveShadow = true; grp.add(plinth);
    const big = emblem(c.id, col); big.scale.setScalar(2.2); big.position.y = 6.2; grp.add(big); d.big = big;
    const nameTex = canvasTex(1024, 256, (g, w, h) => {
      g.textAlign = 'center'; g.fillStyle = '#fff'; g.font = `700 92px ${FONT}`;
      const lines = []; const words = c.name.split(' '); let l = '';
      words.forEach((wd) => { const t = l ? l + ' ' + wd : wd; if (g.measureText(t).width > w - 80 && l) { lines.push(l); l = wd; } else l = t; }); lines.push(l);
      lines.forEach((ln, i) => g.fillText(ln, w / 2, lines.length > 1 ? 92 + i * 96 : 140));
      g.fillStyle = c.color; g.font = `500 40px 'JetBrains Mono', monospace`; g.fillText(`${d.list.length} PROJECTS`, w / 2, 240);
    });
    const name = new THREE.Mesh(new THREE.PlaneGeometry(12, 3), new THREE.MeshBasicMaterial({ map: nameTex, transparent: true, toneMapped: false, side: THREE.DoubleSide, depthWrite: false, fog: false }));
    name.position.y = 12; grp.add(name); d.nameSign = name;
    addStatic(d.C.x, d.C.z, 5.2);

    // portal arch at the entrance
    const portal = new THREE.Group();
    const pm = mat(0x252a45, { roughness: 0.6, metalness: 0.3 });
    [-7.2, 7.2].forEach((x) => { const pl = box(1.3, 9.5, 1.3, pm); pl.position.set(x, 4.75, 0); portal.add(pl); const cap = box(1.7, 0.4, 1.7, glow(col, 1)); cap.position.set(x, 9.7, 0); portal.add(cap); });
    const beam = box(16.4, 1.5, 1.5, pm); beam.position.y = 9.5; portal.add(beam);
    const strip = box(15.4, 0.22, 1.6, glow(col, 1.1)); strip.position.y = 8.65; portal.add(strip);
    const ptex = canvasTex(1024, 192, (g, w, h) => {
      g.fillStyle = '#0a0d1b'; g.fillRect(0, 0, w, h);
      g.fillStyle = c.color; g.fillRect(0, 0, w, 10); g.fillRect(0, h - 10, w, 10);
      g.textAlign = 'center'; g.fillStyle = '#fff'; g.font = `700 78px ${FONT}`; g.fillText(c.name, w / 2, 110);
      g.fillStyle = c.color; g.font = `500 32px 'JetBrains Mono', monospace`; g.fillText(`${c.icon}  ${d.list.length} PROJECTS  ${c.icon}`, w / 2, 160);
    });
    [0.78, -0.78].forEach((z, i) => { const s = new THREE.Mesh(new THREE.PlaneGeometry(14, 2.6), new THREE.MeshBasicMaterial({ map: ptex, toneMapped: false })); s.position.set(0, 11.4, z); if (i) s.rotation.y = Math.PI; portal.add(s); });
    shadowAll(portal, true);
    // portal orientation: opening faces along the road (x axis of portal is perpendicular to road)
    portal.position.set(d.entrance.x, 0, d.entrance.z);
    portal.rotation.y = Math.atan2(d.u.x, d.u.z) + Math.PI; // local z along road
    world.add(portal);
    const px = Math.cos(portal.rotation.y), pz = -Math.sin(portal.rotation.y);
    [-7.2, 7.2].forEach((o) => addStatic(d.entrance.x + px * o, d.entrance.z + pz * o, 0.95));

    // project ring
    const r1 = d.padR * 0.62;
    const dirC = Math.atan2(-d.u.z, -d.u.x); // angle from centre toward the world centre (entrance direction)
    const gap = Math.max(0.5, 9 / r1);
    const n = d.list.length;
    d.list.forEach((p, i) => {
      const phi = dirC + gap + (n === 1 ? (TAU - 2 * gap) / 2 : (i / (n - 1)) * (TAU - 2 * gap));
      const lx = Math.cos(phi) * r1, lz = Math.sin(phi) * r1;
      const wx = d.C.x + lx, wz = d.C.z + lz;
      const inward = { x: -Math.cos(phi), z: -Math.sin(phi) };
      const item = new THREE.Group(); item.position.set(lx, 0, lz); grp.add(item);

      const ped = cyl(2.5, 2.9, 0.9, 24, mat(0x252a45, { roughness: 0.6, metalness: 0.25 })); ped.position.y = 0.45; ped.castShadow = true; ped.receiveShadow = true; item.add(ped);
      const top = new THREE.Mesh(new THREE.CircleGeometry(2.2, 32), new THREE.MeshBasicMaterial({ color: col, toneMapped: false })); top.rotation.x = -Math.PI / 2; top.position.y = 0.92; item.add(top);
      const halo = new THREE.Mesh(new THREE.RingGeometry(4.4, 5.0, 48), new THREE.MeshBasicMaterial({ color: col, transparent: true, opacity: 0.18, toneMapped: false, side: THREE.DoubleSide }));
      halo.rotation.x = -Math.PI / 2; halo.position.y = 0.1; item.add(halo);
      const em = emblem(c.id, col); em.scale.setScalar(1.05); em.position.y = 3.2; item.add(em);

      // billboard behind the pedestal, facing the district centre
      const bb = new THREE.Group(); bb.position.set(-inward.x * 3.6, 0, -inward.z * 3.6);
      bb.rotation.y = Math.atan2(inward.x, inward.z);
      const frame = box(6.6, 3.4, 0.25, mat(0x11142a, { roughness: 0.5 })); frame.position.y = 5.3; bb.add(frame);
      const postL = box(0.25, 3.8, 0.25, mat(0x11142a)); postL.position.set(-2.6, 1.9, 0); bb.add(postL);
      const postR = postL.clone(); postR.position.x = 2.6; bb.add(postR);
      const face = new THREE.Mesh(new THREE.PlaneGeometry(6.2, 3.1), new THREE.MeshBasicMaterial({ color: 0x0b0e1c, toneMapped: false }));
      face.position.set(0, 5.3, 0.14); bb.add(face);
      const led = box(6.6, 0.12, 0.3, glow(col, 1)); led.position.set(0, 7.06, 0); bb.add(led);
      shadowAll(bb, true); item.add(bb);

      addStatic(wx, wz, 2.7);
      landmarks.push({ p, d, item, em, halo, top, face, wx, wz, near: 0, texReady: false, phi, base: 3.2 + rnd() * 6 });
    });
  });

  // Lazily build billboard textures as the car approaches (saves VRAM)
  function ensureTexture(lm) {
    if (lm.texReady) return; lm.texReady = true;
    lm.face.material.map = billboardTexture(lm.p, lm.d.cat); lm.face.material.color.set(0xffffff); lm.face.material.needsUpdate = true;
  }

  /* ------------------------------------------------------------------ */
  /*  Scenery: trees, rocks, lamps, clouds                               */
  /* ------------------------------------------------------------------ */
  function distSeg(px, pz, a, b) {
    const dx = b.x - a.x, dz = b.z - a.z; const t = clamp(((px - a.x) * dx + (pz - a.z) * dz) / (dx * dx + dz * dz), 0, 1);
    return Math.hypot(px - (a.x + dx * t), pz - (a.z + dz * t));
  }
  function free(x, z, margin) {
    if (Math.hypot(x, z) < PLAZA_R + 8) return false;
    for (const d of districts) if (Math.hypot(x - d.C.x, z - d.C.z) < d.padR + margin) return false;
    for (const s of roadSegments) if (distSeg(x, z, s.a, s.b) < ROAD_W / 2 + margin) return false;
    return true;
  }

  { // trees
    const trunkG = new THREE.CylinderGeometry(0.28, 0.4, 1.8, 6), leafG = new THREE.ConeGeometry(1.7, 3.4, 7), leaf2G = new THREE.ConeGeometry(1.3, 2.6, 7);
    const cnt = 520; const tr = new THREE.InstancedMesh(trunkG, mat(0x5a3d2a), cnt), l1 = new THREE.InstancedMesh(leafG, mat(0x2f8f6b, { flatShading: true }), cnt), l2 = new THREE.InstancedMesh(leaf2G, mat(0x3aa87b, { flatShading: true }), cnt);
    const m = new THREE.Matrix4(), q = new THREE.Quaternion(), s = new THREE.Vector3(), pos = new THREE.Vector3(); let i = 0, tries = 0;
    const tints = [0x2f8f6b, 0x3aa87b, 0x2a7f7a, 0x5fae5a, 0x8a5fbf];
    while (i < cnt && tries++ < 6000) {
      const a = rnd() * TAU, r = 30 + Math.sqrt(rnd()) * (WORLD_R - 26); const x = Math.cos(a) * r, z = Math.sin(a) * r;
      if (!free(x, z, 5)) continue;
      const k = 0.8 + rnd() * 1.1; s.set(k, k, k); q.setFromAxisAngle(new THREE.Vector3(0, 1, 0), rnd() * TAU);
      pos.set(x, 0.9 * k, z); m.compose(pos, q, s); tr.setMatrixAt(i, m);
      pos.set(x, (1.8 + 1.6) * k, z); m.compose(pos, q, s); l1.setMatrixAt(i, m); l1.setColorAt(i, new THREE.Color(tints[(rnd() * tints.length) | 0]));
      pos.set(x, (1.8 + 3.4) * k, z); m.compose(pos, q, s); l2.setMatrixAt(i, m); l2.setColorAt(i, new THREE.Color(tints[(rnd() * tints.length) | 0]));
      addStatic(x, z, 0.9 * k); i++;
    }
    [tr, l1, l2].forEach((o) => { o.count = i; o.castShadow = true; o.frustumCulled = false; world.add(o); if (o.instanceColor) o.instanceColor.needsUpdate = true; });
    // rocks
    const rockG = new THREE.DodecahedronGeometry(1, 0), rk = new THREE.InstancedMesh(rockG, mat(0x59527a, { flatShading: true, roughness: 1 }), 160); let j = 0; tries = 0;
    while (j < 160 && tries++ < 3000) { const a = rnd() * TAU, r = 30 + Math.sqrt(rnd()) * (WORLD_R - 10); const x = Math.cos(a) * r, z = Math.sin(a) * r; if (!free(x, z, 4)) continue;
      const k = 0.6 + rnd() * 1.6; s.set(k * 1.2, k * 0.8, k); q.setFromEuler(new THREE.Euler(rnd(), rnd() * TAU, rnd())); pos.set(x, k * 0.3, z); m.compose(pos, q, s); rk.setMatrixAt(j, m); addStatic(x, z, k * 1.0); j++; }
    rk.count = j; rk.castShadow = true; rk.receiveShadow = true; rk.frustumCulled = false; world.add(rk);
  }

  { // lamp posts along roads
    const poleG = new THREE.CylinderGeometry(0.12, 0.16, 6, 6), bulbG = new THREE.SphereGeometry(0.3, 10, 8);
    const arr = []; districts.forEach((d) => { for (let t = 26; t < d.roadLen - 6; t += 24) [-1, 1].forEach((sd) => arr.push([d.u.x * t + -d.u.z * (ROAD_W / 2 + 1.4) * sd, d.u.z * t + d.u.x * (ROAD_W / 2 + 1.4) * sd, d])); });
    const poles = new THREE.InstancedMesh(poleG, mat(0x2a2f48), arr.length), bulbs = new THREE.InstancedMesh(bulbG, new THREE.MeshBasicMaterial({ color: 0xffe2a8, toneMapped: false }), arr.length);
    const m = new THREE.Matrix4(); arr.forEach(([x, z, d], i) => { m.makeTranslation(x, 3, z); poles.setMatrixAt(i, m); m.makeTranslation(x, 6.2, z); bulbs.setMatrixAt(i, m); addStatic(x, z, 0.35); });
    poles.castShadow = true; poles.frustumCulled = false; bulbs.frustumCulled = false; world.add(poles, bulbs);
  }

  // clouds
  const clouds = [];
  { const cm = new THREE.MeshBasicMaterial({ color: 0xffd0c0, transparent: true, opacity: 0.6, fog: false, depthWrite: false });
    for (let i = 0; i < 22; i++) { const g = new THREE.Group(); const n = 3 + ((rnd() * 3) | 0); for (let k = 0; k < n; k++) { const s = new THREE.Mesh(new THREE.SphereGeometry(10 + rnd() * 9, 10, 8), cm); s.position.set(k * 12 - n * 6, rnd() * 4, rnd() * 8); s.scale.y = 0.45; g.add(s); }
      const a = rnd() * TAU, r = 200 + rnd() * 500; g.position.set(Math.cos(a) * r, 120 + rnd() * 90, Math.sin(a) * r); g.userData.sp = 1.5 + rnd() * 2.5; clouds.push(g); scene.add(g); } }

  /* ------------------------------------------------------------------ */
  /*  Props: cones, crates, balls, pins (pushable)                       */
  /* ------------------------------------------------------------------ */
  const props = [];
  function addProp(mesh, x, z, r, mass, kind) {
    mesh.position.set(x, 0, z); world.add(mesh); shadowAll(mesh, true);
    const p = { mesh, x, z, vx: 0, vz: 0, r, m: mass, yaw: rnd() * TAU, spin: 0, kind, tilt: 0, tiltAxis: 0 };
    mesh.rotation.y = p.yaw; props.push(p); return p;
  }
  function makeCone() {
    const g = new THREE.Group(); const b = box(1.0, 0.1, 1.0, mat(0x222634)); b.position.y = 0.05; g.add(b);
    const c = new THREE.Mesh(new THREE.ConeGeometry(0.36, 1.05, 12), mat(0xff7a2e, { roughness: 0.5 })); c.position.y = 0.62; g.add(c);
    const s = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.26, 0.16, 12), mat(0xffffff)); s.position.y = 0.6; g.add(s); return g;
  }
  function makeCrate(col) { const g = new THREE.Group(); const b = box(1.3, 1.3, 1.3, mat(col, { roughness: 0.8 })); b.position.y = 0.65; g.add(b);
    const e = box(1.36, 0.16, 1.36, mat(0x3b2b1f)); e.position.y = 0.2; g.add(e); const e2 = e.clone(); e2.position.y = 1.1; g.add(e2); return g; }
  function makeBall(col) { const g = new THREE.Group(); const s = new THREE.Mesh(new THREE.SphereGeometry(1.5, 24, 16), mat(col, { roughness: 0.35 })); s.position.y = 1.5; g.add(s);
    const st = new THREE.Mesh(new THREE.TorusGeometry(1.5, 0.08, 6, 32), mat(0xffffff)); st.position.y = 1.5; g.add(st); return g; }
  function makePin() { const g = new THREE.Group(); const b = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.34, 1.1, 10), mat(0xf4f4f8, { roughness: 0.3 })); b.position.y = 0.55; g.add(b);
    const h = new THREE.Mesh(new THREE.SphereGeometry(0.22, 10, 8), mat(0xf4f4f8, { roughness: 0.3 })); h.position.y = 1.2; g.add(h);
    const s = new THREE.Mesh(new THREE.CylinderGeometry(0.26, 0.28, 0.1, 10), mat(0xe8343d)); s.position.y = 0.8; g.add(s); return g; }

  { // cone slalom near plaza, on each road side
    districts.forEach((d) => { for (let t = 34; t < 78; t += 9) { const off = (Math.sin(t * 0.7 + d.index) * 2.6); addProp(makeCone(), d.u.x * t - d.u.z * off, d.u.z * t + d.u.x * off, 0.5, 1, 'cone'); } });
    // bowling triangle
    const bx = -34, bz = 26; let n = 0; for (let row = 0; row < 4; row++) for (let c = 0; c <= row; c++) { addProp(makePin(), bx + row * 1.25, bz + (c - row / 2) * 1.3, 0.34, 0.7, 'pin'); n++; }
    // crate wall
    const cols = [0xd8964a, 0xc9803a, 0xe0a55c]; for (let i = 0; i < 4; i++) for (let j = 0; j < 4; j++) addProp(makeCrate(cols[(i + j) % 3]), 30 + i * 1.5, 24 + j * 1.5, 0.75, 3, 'crate');
    // beach balls
    [0xff6bd6, 0x33d6ff, 0xffd23f].forEach((c, i) => addProp(makeBall(c), 6 + i * 6, 34, 1.5, 4, 'ball'));
    // random meadow props
    for (let i = 0; i < 60; i++) { const a = rnd() * TAU, r = 38 + rnd() * 240; const x = Math.cos(a) * r, z = Math.sin(a) * r; if (!free(x, z, 6)) continue; addProp(rnd() > 0.5 ? makeCone() : makeCrate(cols[(rnd() * 3) | 0]), x, z, rnd() > 0.5 ? 0.5 : 0.75, 1.5, 'misc'); }
  }
  props.forEach((p) => { if (p.kind === 'misc' && p.r === 0.5) p.kind = 'cone'; });

  /* ------------------------------------------------------------------ */
  /*  The car                                                            */
  /* ------------------------------------------------------------------ */
  const carRoot = new THREE.Group(); scene.add(carRoot);
  const carBody = new THREE.Group(); carRoot.add(carBody); // tilts
  const wheels = [];
  const stopLights = [];
  let headBeams;
  { const paint = new THREE.MeshStandardMaterial({ color: 0xff7a2e, roughness: 0.3, metalness: 0.55 });
    const dark = mat(0x0d0f18, { roughness: 0.4, metalness: 0.4 });
    const glass = new THREE.MeshStandardMaterial({ color: 0x14202f, roughness: 0.08, metalness: 0.9 });
    const chrome = mat(0xd8dbe8, { roughness: 0.2, metalness: 0.9 });
    // lower body
    const low = box(2.1, 0.62, 4.5, paint); low.position.y = 0.72; carBody.add(low);
    const hood = box(1.96, 0.16, 1.5, paint); hood.position.set(0, 1.06, 1.35); hood.rotation.x = 0.07; carBody.add(hood);
    const trunk = box(1.96, 0.16, 1.1, paint); trunk.position.set(0, 1.06, -1.6); trunk.rotation.x = -0.05; carBody.add(trunk);
    // cabin (tapered)
    const cg = new THREE.BoxGeometry(1.8, 0.62, 2.0); const pa = cg.attributes.position;
    for (let i = 0; i < pa.count; i++) if (pa.getY(i) > 0) { pa.setX(i, pa.getX(i) * 0.82); pa.setZ(i, pa.getZ(i) * (pa.getZ(i) > 0 ? 0.72 : 0.9)); }
    cg.computeVertexNormals();
    const cabin = new THREE.Mesh(cg, glass); cabin.position.set(0, 1.4, -0.2); carBody.add(cabin);
    const roof = box(1.46, 0.07, 1.5, paint); roof.position.set(0, 1.74, -0.28); carBody.add(roof);
    // stripe
    const stripe = box(0.34, 0.02, 4.51, mat(0xffffff, { roughness: 0.4 })); stripe.position.set(0, 1.135, 0); carBody.add(stripe);
    // bumpers, splitter, diffuser
    const fb = box(2.1, 0.3, 0.3, dark); fb.position.set(0, 0.48, 2.3); carBody.add(fb);
    const rb = box(2.1, 0.3, 0.3, dark); rb.position.set(0, 0.48, -2.3); carBody.add(rb);
    const grille = box(1.1, 0.22, 0.06, chrome); grille.position.set(0, 0.78, 2.27); carBody.add(grille);
    // spoiler
    const sp = box(1.9, 0.08, 0.5, dark); sp.position.set(0, 1.5, -2.05); carBody.add(sp);
    [-0.8, 0.8].forEach((x) => { const s = box(0.08, 0.4, 0.3, dark); s.position.set(x, 1.28, -2.0); carBody.add(s); });
    // mirrors
    [-1, 1].forEach((sd) => { const m = box(0.12, 0.14, 0.24, paint); m.position.set(sd * 1.0, 1.28, 0.55); carBody.add(m); });
    // headlights
    const hm = new THREE.MeshBasicMaterial({ color: 0xfff3c2, toneMapped: false });
    [-0.72, 0.72].forEach((x) => { const h = box(0.42, 0.18, 0.08, hm); h.position.set(x, 0.86, 2.27); carBody.add(h); });
    const tm = new THREE.MeshBasicMaterial({ color: 0x8a1420, toneMapped: false });
    [-0.72, 0.72].forEach((x) => { const t = box(0.5, 0.16, 0.08, tm); t.position.set(x, 0.9, -2.27); carBody.add(t); stopLights.push(t); });
    // plate
    const plate = new THREE.Mesh(new THREE.PlaneGeometry(0.8, 0.22), new THREE.MeshBasicMaterial({ map: canvasTex(256, 64, (g, w, h) => { g.fillStyle = '#f6f6f2'; g.fillRect(0, 0, w, h); g.fillStyle = '#12224a'; g.fillRect(0, 0, w, 10); g.fillStyle = '#12224a'; g.font = `700 38px ${FONT}`; g.textAlign = 'center'; g.fillText('SAMER', w / 2, 52); }) }));
    plate.position.set(0, 0.6, -2.46); plate.rotation.y = Math.PI; carBody.add(plate);
    // beams
    headBeams = new THREE.Group(); const beamMat = new THREE.MeshBasicMaterial({ color: 0xffe9b0, transparent: true, opacity: 0.05, depthWrite: false, blending: THREE.AdditiveBlending, fog: false });
    [-0.72, 0.72].forEach((x) => { const cone = new THREE.Mesh(new THREE.ConeGeometry(1.7, 9, 16, 1, true), beamMat); cone.rotation.x = -Math.PI / 2; cone.position.set(x, 0.84, 2.3 + 4.5); headBeams.add(cone); });
    carBody.add(headBeams);
    shadowAll(carBody, true);
    // wheels
    const tireM = mat(0x0b0c12, { roughness: 0.9 }), rimM = mat(0xc9ceea, { roughness: 0.25, metalness: 0.9 });
    [[-1.06, 1.4, true], [1.06, 1.4, true], [-1.06, -1.4, false], [1.06, -1.4, false]].forEach(([x, z, front]) => {
      const pivot = new THREE.Group(); pivot.position.set(x, 0.42, z); carRoot.add(pivot);
      const spin = new THREE.Group(); pivot.add(spin);
      const tire = cyl(0.42, 0.42, 0.34, 20, tireM); tire.rotation.z = Math.PI / 2; spin.add(tire);
      const rim = cyl(0.26, 0.26, 0.36, 12, rimM); rim.rotation.z = Math.PI / 2; spin.add(rim);
      for (let i = 0; i < 5; i++) { const sp = box(0.37, 0.07, 0.42, rimM); sp.rotation.x = (i / 5) * Math.PI; spin.add(sp); }
      shadowAll(pivot, true); wheels.push({ pivot, spin, front }); }); }

  // Car physics state
  const car = { x: 0, z: 14, h: Math.PI, vx: 0, vz: 0, yaw: 0, steer: 0, lat: 0, long: 0, speed: 0, drift: 0, pitch: 0, roll: 0, bounce: 0 };

  function resetCar(x, z, h) { car.x = x; car.z = z; car.h = h; car.vx = car.vz = car.yaw = car.steer = 0; }
  resetCar(-10, 13, Math.PI * 0.62);

  /* ------------------------------------------------------------------ */
  /*  Effects: smoke + skidmarks                                         */
  /* ------------------------------------------------------------------ */
  const smokeTex = canvasTex(64, 64, (g) => { const gr = g.createRadialGradient(32, 32, 0, 32, 32, 32); gr.addColorStop(0, 'rgba(255,255,255,0.9)'); gr.addColorStop(1, 'rgba(255,255,255,0)'); g.fillStyle = gr; g.fillRect(0, 0, 64, 64); });
  const puffs = []; for (let i = 0; i < 70; i++) { const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: smokeTex, transparent: true, depthWrite: false, opacity: 0, color: 0xdfe4ff })); s.visible = false; scene.add(s); puffs.push({ s, life: 0, max: 1, vx: 0, vy: 0, vz: 0 }); }
  let puffI = 0;
  function puff(x, y, z, vx, vy, vz, size, life, col) { const p = puffs[puffI++ % puffs.length]; p.s.visible = true; p.s.position.set(x, y, z); p.vx = vx; p.vy = vy; p.vz = vz; p.life = p.max = life; p.size = size; p.s.material.color.set(col || 0xdfe4ff); }
  const SKID = 260; const skid = new THREE.InstancedMesh(new THREE.PlaneGeometry(0.34, 0.8), new THREE.MeshBasicMaterial({ color: 0x05060a, transparent: true, opacity: 0.55, depthWrite: false, polygonOffset: true, polygonOffsetFactor: -2 }), SKID);
  skid.frustumCulled = false; skid.count = 0; scene.add(skid); let skidI = 0, skidN = 0; const _m = new THREE.Matrix4(), _q = new THREE.Quaternion(), _e = new THREE.Euler(-Math.PI / 2, 0, 0), _s1 = new THREE.Vector3(1, 1, 1), _v = new THREE.Vector3();
  function addSkid(x, z, h) { _e.set(-Math.PI / 2, 0, h); _q.setFromEuler(_e); _v.set(x, 0.09, z); _m.compose(_v, _q, _s1); skid.setMatrixAt(skidI, _m); skidI = (skidI + 1) % SKID; skidN = Math.min(SKID, skidN + 1); skid.count = skidN; skid.instanceMatrix.needsUpdate = true; }

  /* ------------------------------------------------------------------ */
  /*  Input                                                              */
  /* ------------------------------------------------------------------ */
  const keys = new Set();
  const input = { throttle: 0, steer: 0, drift: false, horn: false };
  const touchIn = { x: 0, y: 0, drift: false, horn: false };
  let paused = false, started = false;

  // Layout-independent key names: use the physical key (e.code) so WASD works on Arabic and any other keyboard layout.
  const CODE = { KeyW: 'w', KeyA: 'a', KeyS: 's', KeyD: 'd', KeyH: 'h', KeyR: 'r', KeyC: 'c', KeyM: 'm', Space: ' ', Tab: 'tab', Enter: 'enter', NumpadEnter: 'enter', ArrowUp: 'arrowup', ArrowDown: 'arrowdown', ArrowLeft: 'arrowleft', ArrowRight: 'arrowright', Escape: 'escape' };
  const keyOf = (e) => CODE[e.code] || (e.key || '').toLowerCase();
  addEventListener('keydown', (e) => {
    if (e.target && e.target.tagName === 'INPUT') { if (e.key === 'Escape') e.target.blur(); return; }
    const k = keyOf(e);
    if (['arrowup', 'arrowdown', 'arrowleft', 'arrowright', ' ', 'tab'].includes(k)) e.preventDefault();
    if (e.repeat) return;
    keys.add(k);
    kickstart();
    if (k === 'enter') openNear();
    else if (k === 'r') respawn();
    else if (k === 'c') toggleCam();
    else if (k === 'm') toggleSound();
    else if (k === 'tab') togglePanel();
    else if (k === 'h') horn(true);
  });
  addEventListener('keyup', (e) => { const k = keyOf(e); keys.delete(k); if (k === 'h') horn(false); });
  addEventListener('blur', () => keys.clear());
  addEventListener('pointerdown', () => kickstart());

  function readInput() {
    if (paused) { input.throttle = 0; input.steer = 0; input.drift = false; return; }
    let t = 0, s = 0;
    if (keys.has('w') || keys.has('arrowup')) t += 1;
    if (keys.has('s') || keys.has('arrowdown')) t -= 1;
    if (keys.has('a') || keys.has('arrowleft')) s += 1;
    if (keys.has('d') || keys.has('arrowright')) s -= 1;
    if (IS_TOUCH || Math.abs(touchIn.x) + Math.abs(touchIn.y) > 0) { if (Math.abs(touchIn.y) > 0.12) t = clamp(touchIn.y, -1, 1); if (Math.abs(touchIn.x) > 0.1) s = -clamp(touchIn.x, -1, 1); }
    input.throttle = t; input.steer = s; input.drift = keys.has(' ') || touchIn.drift;
    if (touchIn.horn) horn(true);
  }

  /* touch joystick */
  if (IS_TOUCH) {
    const stick = $('#stick'), knob = $('#knob'); let pid = null, cx = 0, cy = 0;
    const R = 62;
    const move = (e) => { const dx = e.clientX - cx, dy = e.clientY - cy; const d = Math.hypot(dx, dy) || 1; const k = Math.min(d, R) / d; const x = dx * k, y = dy * k; knob.style.transform = `translate(${x}px,${y}px)`; touchIn.x = x / R; touchIn.y = -y / R; };
    stick.addEventListener('pointerdown', (e) => { pid = e.pointerId; stick.setPointerCapture(pid); const r = stick.getBoundingClientRect(); cx = r.left + r.width / 2; cy = r.top + r.height / 2; move(e); kickstart(); });
    stick.addEventListener('pointermove', (e) => { if (e.pointerId === pid) move(e); });
    const end = (e) => { if (e.pointerId !== pid) return; pid = null; touchIn.x = touchIn.y = 0; knob.style.transform = ''; };
    stick.addEventListener('pointerup', end); stick.addEventListener('pointercancel', end);
    const hold = (id, prop, cb) => { const b = $(id); b.addEventListener('pointerdown', (e) => { e.preventDefault(); touchIn[prop] = true; cb && cb(true); kickstart(); }); const up = () => { touchIn[prop] = false; cb && cb(false); }; b.addEventListener('pointerup', up); b.addEventListener('pointercancel', up); b.addEventListener('pointerleave', up); };
    hold('#t-drift', 'drift'); hold('#t-horn', 'horn', horn);
    $('#t-open').addEventListener('click', openNear);
  }

  /* ------------------------------------------------------------------ */
  /*  Audio                                                              */
  /* ------------------------------------------------------------------ */
  let actx, engine, engGain, engFilter, hornNodes, soundOn = true, master;
  function initAudio() {
    if (actx) return; try {
      actx = new (window.AudioContext || window.webkitAudioContext)(); master = actx.createGain(); master.gain.value = soundOn ? 0.5 : 0; master.connect(actx.destination);
      engine = actx.createOscillator(); engine.type = 'sawtooth'; engine.frequency.value = 50;
      const e2 = actx.createOscillator(); e2.type = 'square'; e2.frequency.value = 25;
      engFilter = actx.createBiquadFilter(); engFilter.type = 'lowpass'; engFilter.frequency.value = 400; engGain = actx.createGain(); engGain.gain.value = 0.0;
      engine.connect(engFilter); e2.connect(engFilter); engFilter.connect(engGain); engGain.connect(master); engine.start(); e2.start(); engine._e2 = e2;
      const h1 = actx.createOscillator(), h2 = actx.createOscillator(); h1.type = h2.type = 'square'; h1.frequency.value = 349; h2.frequency.value = 440;
      const hg = actx.createGain(); hg.gain.value = 0; h1.connect(hg); h2.connect(hg); hg.connect(master); h1.start(); h2.start(); hornNodes = hg;
    } catch (e) { actx = null; }
  }
  function kickstart() { if (!started) { started = true; $('#keys').classList.add('fade'); setTimeout(() => $('#keys').style.display = 'none', 1200); } initAudio(); if (actx && actx.state === 'suspended') actx.resume(); }
  function horn(on) { if (hornNodes) hornNodes.gain.setTargetAtTime(on ? 0.12 : 0, actx.currentTime, 0.02); }
  function thump(v) { if (!actx || !soundOn) return; const b = actx.createBuffer(1, 2400, 22050), d = b.getChannelData(0); for (let i = 0; i < d.length; i++) d[i] = (Math.random() * 2 - 1) * Math.exp(-i / 500); const s = actx.createBufferSource(); s.buffer = b; const g = actx.createGain(); g.gain.value = clamp(v / 20, 0.05, 0.6); const f = actx.createBiquadFilter(); f.type = 'lowpass'; f.frequency.value = 500; s.connect(f); f.connect(g); g.connect(master); s.start(); }
  function toggleSound() { soundOn = !soundOn; $('#btn-snd').classList.toggle('off', !soundOn); if (master) master.gain.setTargetAtTime(soundOn ? 0.5 : 0, actx.currentTime, 0.05); }
  $('#btn-snd').addEventListener('click', () => { kickstart(); toggleSound(); });

  /* ------------------------------------------------------------------ */
  /*  Physics step                                                       */
  /* ------------------------------------------------------------------ */
  const MAX_SPEED = 30, ACC = 24, BRAKE = 44, REV_MAX = 9;
  const tmp = [];
  const carCircles = [[0, 1.35], [0, 0], [0, -1.35]];
  let hitCool = 0, nearest = null;

  function stepCar(dt) {
    const fx = Math.sin(car.h), fz = Math.cos(car.h), rx = Math.cos(car.h), rz = -Math.sin(car.h);
    let vLong = car.vx * fx + car.vz * fz, vLat = car.vx * rx + car.vz * rz;
    const t = input.throttle;
    // longitudinal
    if (t > 0) { vLong += (vLong < -0.5 ? BRAKE * 1.5 : ACC * (1 - clamp(vLong / MAX_SPEED, 0, 1))) * t * dt; }
    else if (t < 0) { if (vLong > 0.6) vLong -= BRAKE * -t * dt; else vLong = Math.max(vLong + ACC * 0.5 * t * dt, -REV_MAX); }
    vLong -= vLong * 0.16 * dt; if (t === 0) vLong -= Math.sign(vLong) * Math.min(Math.abs(vLong), 3.2 * dt);
    if (input.drift) vLong -= vLong * 0.4 * dt;
    if (paused) vLong -= Math.sign(vLong) * Math.min(Math.abs(vLong), 34 * dt);
    // steering
    const target = input.steer; car.steer = damp(car.steer, target, target === 0 ? 10 : 7, dt);
    const speedK = 1 / (1 + Math.abs(vLong) / 26);
    const steerAng = car.steer * 0.62 * speedK;
    let yawT = (vLong * Math.tan(steerAng)) / 2.7; if (input.drift) yawT *= 1.4;
    yawT = clamp(yawT, -2.5, 2.5);
    car.yaw = damp(car.yaw, yawT, 9, dt);
    car.h += car.yaw * dt;
    // grip
    const slip = Math.abs(vLat);
    const grip = input.drift ? 1.6 : clamp(9.5 - Math.abs(car.steer * vLong) * 0.12, 4.5, 9.5);
    vLat *= Math.exp(-grip * dt);
    car.drift = clamp(slip / 6, 0, 1);
    // recompose
    const nfx = Math.sin(car.h), nfz = Math.cos(car.h), nrx = Math.cos(car.h), nrz = -Math.sin(car.h);
    car.vx = nfx * vLong + nrx * vLat; car.vz = nfz * vLong + nrz * vLat;
    car.x += car.vx * dt; car.z += car.vz * dt;
    car.long = vLong; car.lat = vLat;

    // world bounds
    const rr = Math.hypot(car.x, car.z); if (rr > WORLD_R) { const nx = car.x / rr, nz = car.z / rr; car.x = nx * WORLD_R; car.z = nz * WORLD_R; const vn = car.vx * nx + car.vz * nz; if (vn > 0) { car.vx -= 1.4 * vn * nx; car.vz -= 1.4 * vn * nz; } }

    // collisions with statics
    for (let ci = 0; ci < carCircles.length; ci++) {
      const cx = car.x + nfx * carCircles[ci][1], cz = car.z + nfz * carCircles[ci][1]; const R = 1.15;
      nearStatics(cx, cz, tmp);
      for (let k = 0; k < tmp.length; k++) {
        const s = tmp[k]; const dx = cx - s.x, dz = cz - s.z, dd = dx * dx + dz * dz, rs = R + s.r;
        if (dd < rs * rs && dd > 1e-6) {
          const d = Math.sqrt(dd), nx = dx / d, nz = dz / d, pen = rs - d;
          car.x += nx * pen; car.z += nz * pen;
          const vn = car.vx * nx + car.vz * nz;
          if (vn < 0) { car.vx -= 1.35 * vn * nx; car.vz -= 1.35 * vn * nz; car.yaw += (nx * nfz - nz * nfx) * vn * 0.02 * (ci === 0 ? 1 : ci === 2 ? -1 : 0); if (-vn > 3 && hitCool <= 0) { thump(-vn); hitCool = 0.25; car.bounce = clamp(-vn / 30, 0, 0.5); for (let q = 0; q < 4; q++) puff(cx, 0.6, cz, nx * 3 + (Math.random() - 0.5) * 2, 1.5, nz * 3 + (Math.random() - 0.5) * 2, 1.4, 0.6, 0xc9b8a0); } }
        }
      }
      // props
      for (let pi = 0; pi < props.length; pi++) {
        const p = props[pi]; const dx = p.x - cx, dz = p.z - cz; if (Math.abs(dx) > 6 || Math.abs(dz) > 6) continue;
        const dd = dx * dx + dz * dz, rs = R + p.r;
        if (dd < rs * rs && dd > 1e-6) {
          const d = Math.sqrt(dd), nx = dx / d, nz = dz / d, pen = rs - d;
          p.x += nx * pen; p.z += nz * pen;
          const rvn = (car.vx - p.vx) * nx + (car.vz - p.vz) * nz;
          if (rvn > 0) { const cm = 8; const k = (1.5 * rvn) / (1 + p.m / cm); p.vx += nx * k * (cm / (cm + p.m)) * 1.9; p.vz += nz * k * (cm / (cm + p.m)) * 1.9; car.vx -= nx * k * (p.m / (cm + p.m)) * 0.6; car.vz -= nz * k * (p.m / (cm + p.m)) * 0.6;
            p.spin = (Math.random() - 0.5) * 8; p.tilt = clamp(rvn / 14, 0, 1.2); p.tiltAxis = Math.atan2(nz, nx); if (rvn > 5 && hitCool <= 0) { thump(rvn * 0.5); hitCool = 0.15; } }
        }
      }
    }
  }

  function stepProps(dt) {
    for (let i = 0; i < props.length; i++) {
      const p = props[i]; const sp = p.vx * p.vx + p.vz * p.vz;
      if (sp > 0.0004) {
        p.x += p.vx * dt; p.z += p.vz * dt; const f = Math.exp(-(p.kind === 'ball' ? 0.55 : 1.9) * dt); p.vx *= f; p.vz *= f;
        // statics
        nearStatics(p.x, p.z, tmp);
        for (let k = 0; k < tmp.length; k++) { const s = tmp[k]; const dx = p.x - s.x, dz = p.z - s.z, dd = dx * dx + dz * dz, rs = p.r + s.r; if (dd < rs * rs && dd > 1e-6) { const d = Math.sqrt(dd), nx = dx / d, nz = dz / d; p.x += nx * (rs - d); p.z += nz * (rs - d); const vn = p.vx * nx + p.vz * nz; if (vn < 0) { p.vx -= 1.6 * vn * nx; p.vz -= 1.6 * vn * nz; } } }
        // other props (cheap: only moving ones against all within range)
        for (let j = 0; j < props.length; j++) { if (j === i) continue; const q = props[j]; const dx = q.x - p.x, dz = q.z - p.z; if (Math.abs(dx) > 3 || Math.abs(dz) > 3) continue; const dd = dx * dx + dz * dz, rs = p.r + q.r;
          if (dd < rs * rs && dd > 1e-6) { const d = Math.sqrt(dd), nx = dx / d, nz = dz / d, pen = (rs - d) * 0.5; q.x += nx * pen; q.z += nz * pen; p.x -= nx * pen; p.z -= nz * pen; const rvn = (p.vx - q.vx) * nx + (p.vz - q.vz) * nz; if (rvn > 0) { const k = rvn * 0.9; q.vx += nx * k; q.vz += nz * k; p.vx -= nx * k * 0.5; p.vz -= nz * k * 0.5; q.spin = (Math.random() - 0.5) * 6; q.tilt = 0.5; q.tiltAxis = Math.atan2(nz, nx); } } }
        const rr = Math.hypot(p.x, p.z); if (rr > WORLD_R - 2) { p.x *= (WORLD_R - 2) / rr; p.z *= (WORLD_R - 2) / rr; p.vx *= -0.4; p.vz *= -0.4; }
        p.yaw += p.spin * dt; p.spin *= Math.exp(-2 * dt);
      }
    }
  }
  function syncProps(dt) {
    for (let i = 0; i < props.length; i++) {
      const p = props[i]; const sp = p.vx * p.vx + p.vz * p.vz;
      const moving = sp > 0.0004 || p.tilt > 0.001; if (!moving && !p.dirty) continue;
      if (p.tilt > 0.001) p.tilt = damp(p.tilt, 0, 4, dt);
      const m = p.mesh; m.position.set(p.x, 0, p.z); m.rotation.set(0, p.yaw, 0);
      if (p.tilt > 0.001 && p.kind !== 'ball') m.rotateOnWorldAxis(_v.set(Math.sin(p.tiltAxis), 0, -Math.cos(p.tiltAxis)), p.tilt * 0.9);
      if (p.kind === 'ball' && sp > 0.01) m.rotateOnWorldAxis(_v.set(p.vz, 0, -p.vx).normalize(), Math.sqrt(sp) * dt / 1.5);
      p.dirty = false;
    }
  }

  /* ------------------------------------------------------------------ */
  /*  Camera                                                             */
  /* ------------------------------------------------------------------ */
  let camAngle = car.h, camMode = 0; const camPos = new THREE.Vector3(), camLook = new THREE.Vector3();
  const CAMS = [{ dist: 15, h: 7.2, look: 6 }, { dist: 24, h: 15, look: 4 }, { dist: 6.8, h: 2.9, look: 10 }];
  function toggleCam() { camMode = (camMode + 1) % CAMS.length; }
  $('#btn-cam').addEventListener('click', toggleCam);
  function updateCamera(dt) {
    const cm = CAMS[camMode];
    // follow direction of travel when moving fast, else heading
    const sp = Math.hypot(car.vx, car.vz);
    let want = car.h;
    if (sp > 6 && car.long > 0) { const va = Math.atan2(car.vx, car.vz); want = car.h + angDiff(car.h, va) * 0.35; }
    camAngle += angDiff(camAngle, want) * (1 - Math.exp(-3.2 * dt));
    const fx = Math.sin(camAngle), fz = Math.cos(camAngle);
    const back = cm.dist + sp * 0.06;
    const tx = car.x - fx * back, tz = car.z - fz * back, ty = cm.h + sp * 0.03;
    camPos.set(tx, ty, tz);
    if (camera.userData.init !== true) { camera.position.copy(camPos); camera.userData.init = true; }
    camera.position.x = damp(camera.position.x, tx, 6, dt); camera.position.y = damp(camera.position.y, ty, 5, dt); camera.position.z = damp(camera.position.z, tz, 6, dt);
    camLook.set(car.x + fx * cm.look, 1.4, car.z + fz * cm.look);
    camera.lookAt(camLook);
    const fov = 54 + clamp(sp / MAX_SPEED, 0, 1) * 11 + (camMode === 2 ? 6 : 0);
    if (Math.abs(camera.fov - fov) > 0.05) { camera.fov = damp(camera.fov, fov, 4, dt); camera.updateProjectionMatrix(); }
  }

  /* ------------------------------------------------------------------ */
  /*  HUD / interaction                                                  */
  /* ------------------------------------------------------------------ */
  const el = { spd: $('#spd'), prompt: $('#prompt'), district: $('#district'), hud: $('#hud'), mini: $('#minimap') };
  const promptTxt = el.prompt.querySelector('.txt');
  let currentDistrict = null, bannerT = 0;

  function openNear() { if (paused || !nearest) return; paused = true; horn(false); UI.open(nearest.p, { onClose: () => { paused = false; } }); }
  el.prompt.addEventListener('click', openNear);
  function respawn() { resetCar(-10, 13, Math.PI * 0.62); camAngle = car.h; }

  function updateInteraction(dt, tNow) {
    let best = null, bd = 1e9;
    for (let i = 0; i < landmarks.length; i++) {
      const lm = landmarks[i]; const dx = lm.wx - car.x, dz = lm.wz - car.z; const d2 = dx * dx + dz * dz;
      const vis = d2 < 230 * 230; if (lm.item.visible !== vis) lm.item.visible = vis;
      if (!vis) continue;
      if (d2 < 150 * 150) ensureTexture(lm);
      if (d2 < bd) { bd = d2; best = lm; }
      // animate
      const isNear = d2 < 8.5 * 8.5; lm.near = damp(lm.near, isNear ? 1 : 0, 6, dt);
      lm.em.rotation.y += dt * (0.6 + lm.near * 2.2);
      lm.em.position.y = 3.2 + Math.sin(tNow * 1.6 + lm.base) * 0.22 + lm.near * 0.5;
      const sc = 1.05 + lm.near * 0.3; lm.em.scale.setScalar(sc);
      lm.halo.material.opacity = 0.16 + lm.near * 0.5; lm.halo.scale.setScalar(1 + lm.near * 0.12 + Math.sin(tNow * 3) * 0.02 * lm.near);
      const u = lm.em.userData; if (u.gear) u.gear.rotation.z += dt * 1.2; if (u.orb) u.orb.rotation.y += dt * 2; if (u.w) u.w.rotation.x += dt * 0.7;
    }
    nearest = best && bd < 8.5 * 8.5 ? best : null;
    const show = !!nearest && !paused;
    if (show) { promptTxt.textContent = nearest.p.name; el.prompt.style.setProperty('--c', nearest.d.cat.color); }
    el.prompt.classList.toggle('show', show); el.prompt.hidden = false; el.prompt.style.pointerEvents = show ? 'auto' : 'none';
    if (IS_TOUCH) $('#t-open').style.opacity = nearest ? 1 : 0.45;

    // district banner
    let inD = null; for (const d of districts) if (Math.hypot(car.x - d.C.x, car.z - d.C.z) < d.padR) { inD = d; break; }
    if (Math.hypot(car.x, car.z) < PLAZA_R) inD = { plaza: true };
    if (inD !== currentDistrict) {
      currentDistrict = inD;
      if (inD) { const b = el.district.querySelector('b'); const sm = el.district.querySelector('small'); if (inD.plaza) { sm.textContent = 'Central plaza'; b.textContent = 'Samer Wael'; b.style.color = '#fff'; } else { sm.textContent = 'Now entering'; b.textContent = inD.cat.name; b.style.color = inD.cat.color; } el.district.classList.add('show'); bannerT = 3.2; }
    }
    if (bannerT > 0) { bannerT -= dt; if (bannerT <= 0) el.district.classList.remove('show'); }
  }

  /* minimap */
  const mg = el.mini.getContext('2d');
  function drawMini() {
    const W = el.mini.width, s = (W / 2 - 8) / (RING + 60);
    mg.clearRect(0, 0, W, W); mg.save(); mg.translate(W / 2, W / 2);
    mg.fillStyle = 'rgba(255,255,255,0.06)'; mg.beginPath(); mg.arc(0, 0, PLAZA_R * s, 0, TAU); mg.fill();
    mg.strokeStyle = 'rgba(255,255,255,0.18)'; mg.lineWidth = 3;
    districts.forEach((d) => { mg.beginPath(); mg.moveTo(0, 0); mg.lineTo(d.entrance.x * s, d.entrance.z * s); mg.stroke(); });
    districts.forEach((d) => { mg.fillStyle = d.cat.color + '55'; mg.strokeStyle = d.cat.color; mg.lineWidth = 2; mg.beginPath(); mg.arc(d.C.x * s, d.C.z * s, d.padR * s, 0, TAU); mg.fill(); mg.stroke(); });
    if (nearest) { mg.fillStyle = '#fff'; mg.beginPath(); mg.arc(nearest.wx * s, nearest.wz * s, 3, 0, TAU); mg.fill(); }
    mg.translate(car.x * s, car.z * s); mg.rotate(-car.h + Math.PI); mg.fillStyle = '#ff7a2e'; mg.strokeStyle = '#fff'; mg.lineWidth = 1.5;
    mg.beginPath(); mg.moveTo(0, -8); mg.lineTo(5.5, 6); mg.lineTo(0, 3); mg.lineTo(-5.5, 6); mg.closePath(); mg.fill(); mg.stroke();
    mg.restore();
  }

  /* panel: districts & search */
  const panel = $('#panel'), plist = $('#plist'), pq = $('#pq');
  function teleportTo(lm) {
    const inw = { x: lm.d.C.x - lm.wx, z: lm.d.C.z - lm.wz }; const l = Math.hypot(inw.x, inw.z);
    const px = lm.wx + (inw.x / l) * 7, pz = lm.wz + (inw.z / l) * 7;
    resetCar(px, pz, Math.atan2(-inw.x, -inw.z)); camAngle = car.h; camera.userData.init = false; togglePanel(false);
  }
  function teleportDistrict(d) { resetCar(d.entrance.x - d.u.x * 9, d.entrance.z - d.u.z * 9, Math.atan2(d.u.x, d.u.z)); camAngle = car.h; camera.userData.init = false; togglePanel(false); }
  function renderPanel() {
    const q = pq.value.trim().toLowerCase(); plist.innerHTML = '';
    districts.forEach((d) => {
      const items = landmarks.filter((l) => l.d === d && (!q || (l.p.name + l.p.tagline + l.p.stack.join(' ')).toLowerCase().includes(q)));
      if (!items.length) return;
      const box = UI.el('div', 'pd'); const h = UI.el('h4', null, `<i style="background:${d.cat.color}"></i>${UI.esc(d.cat.name)}<button>Drive there →</button>`); h.style.setProperty('--c', d.cat.color);
      h.querySelector('button').addEventListener('click', () => teleportDistrict(d)); box.appendChild(h);
      const ul = UI.el('ul'); items.forEach((l) => { const li = UI.el('li'); const b = UI.el('button', null, UI.esc(l.p.name)); b.addEventListener('click', () => teleportTo(l)); li.appendChild(b); ul.appendChild(li); }); box.appendChild(ul); plist.appendChild(box);
    });
  }
  function togglePanel(force) { const open = force == null ? !panel.classList.contains('open') : force; panel.classList.toggle('open', open); panel.setAttribute('aria-hidden', String(!open)); paused = open || UI.isOpen(); if (open) { renderPanel(); if (!IS_TOUCH) setTimeout(() => pq.focus(), 350); } else pq.blur(); }
  $('#btn-map').addEventListener('click', () => togglePanel()); $('#panel-x').addEventListener('click', () => togglePanel(false)); pq.addEventListener('input', renderPanel);

  /* ------------------------------------------------------------------ */
  /*  Main loop                                                          */
  /* ------------------------------------------------------------------ */
  function resize() { const w = innerWidth, h = innerHeight; renderer.setSize(w, h, false); camera.aspect = w / h; camera.updateProjectionMatrix(); }
  addEventListener('resize', resize); resize();

  let last = performance.now(), acc = 0, tNow = 0, miniT = 0, smokeT = 0;
  function frame(now) {
    requestAnimationFrame(frame);
    let dt = Math.min(0.05, (now - last) / 1000); last = now; tNow += dt;
    readInput();
    acc += dt; const H = 1 / 120; let steps = 0;
    while (acc >= H && steps < 6) { stepCar(H); stepProps(H); acc -= H; steps++; if (hitCool > 0) hitCool -= H; }
    if (steps === 6) acc = 0;
    syncProps(dt);

    // car visuals
    const sp = Math.hypot(car.vx, car.vz); car.speed = sp;
    carRoot.position.set(car.x, 0, car.z); carRoot.rotation.y = car.h;
    car.pitch = damp(car.pitch, clamp(-(input.throttle > 0 ? 0.018 : 0) * 1 + (input.throttle < 0 && car.long > 1 ? 0.03 : 0), -0.05, 0.05) * 1, 6, dt);
    car.roll = damp(car.roll, clamp(-car.yaw * car.long * 0.0075, -0.09, 0.09), 6, dt);
    car.bounce = damp(car.bounce, 0, 6, dt);
    carBody.rotation.set(car.pitch, 0, car.roll);
    carBody.position.y = Math.sin(tNow * 40) * Math.min(0.012, sp * 0.0005) + car.bounce * 0.2;
    wheels.forEach((w) => { w.spin.rotation.x += (car.long / 0.42) * dt; if (w.front) w.pivot.rotation.y = car.steer * 0.5; });
    const braking = (input.throttle < 0 && car.long > 0.6) || input.drift; stopLights.forEach((s) => s.material.color.setHex(braking ? 0xff2a3a : 0x8a1420));
    headBeams.visible = true;

    // smoke + skid
    smokeT -= dt;
    if (smokeT <= 0 && (car.drift > 0.45 || (input.drift && sp > 5) || (input.throttle > 0 && car.long < 6 && sp < 8 && input.throttle > 0.9 && false))) {
      smokeT = 0.03; const fx = Math.sin(car.h), fz = Math.cos(car.h), rx = Math.cos(car.h), rz = -Math.sin(car.h);
      [-1, 1].forEach((sd) => { const x = car.x - fx * 1.4 + rx * sd * 1.06, z = car.z - fz * 1.4 + rz * sd * 1.06; puff(x, 0.25, z, car.vx * 0.1 + (Math.random() - 0.5), 0.8, car.vz * 0.1 + (Math.random() - 0.5), 1.6, 0.9); addSkid(x, z, Math.atan2(car.vx, car.vz)); });
    }
    for (const p of puffs) { if (p.life > 0) { p.life -= dt; const k = 1 - p.life / p.max; p.s.position.x += p.vx * dt; p.s.position.y += p.vy * dt; p.s.position.z += p.vz * dt; const s = p.size * (0.6 + k * 1.6); p.s.scale.set(s, s, 1); p.s.material.opacity = 0.42 * (1 - k); if (p.life <= 0) p.s.visible = false; } }

    // audio
    if (engGain) { const th = Math.abs(input.throttle), ratio = clamp(sp / MAX_SPEED, 0, 1); const f = 46 + ratio * 120 + th * 20; engine.frequency.setTargetAtTime(f, actx.currentTime, 0.05); engine._e2.frequency.setTargetAtTime(f * 0.5, actx.currentTime, 0.05); engFilter.frequency.setTargetAtTime(280 + ratio * 900 + th * 300, actx.currentTime, 0.08); engGain.gain.setTargetAtTime(0.05 + th * 0.06 + ratio * 0.05, actx.currentTime, 0.08); }

    // world animation
    monument.userData.core.rotation.y += dt * 0.5; monument.userData.core.rotation.x += dt * 0.2; monument.userData.wire.rotation.y -= dt * 0.3; monument.userData.orb.rotation.y += dt * 0.4;
    monument.userData.sign.rotation.y = Math.atan2(camera.position.x, camera.position.z);
    districts.forEach((d) => { d.big.rotation.y += dt * 0.5; d.big.position.y = 6.2 + Math.sin(tNow + d.index) * 0.35; d.nameSign.rotation.y = Math.atan2(camera.position.x - d.C.x, camera.position.z - d.C.z); });
    clouds.forEach((c) => { c.position.x += c.userData.sp * dt; if (c.position.x > 700) c.position.x = -700; });
    sky.position.copy(camera.position);

    updateCamera(dt);
    // shadow follows car
    sun.position.set(car.x - 60, 70, car.z - 40); sun.target.position.set(car.x, 0, car.z); sun.target.updateMatrixWorld();
    updateInteraction(dt, tNow);

    el.spd.textContent = Math.round(sp * 3.6);
    miniT -= dt; if (miniT <= 0) { drawMini(); miniT = 0.05; }
    renderer.render(scene, camera);
  }

  /* boot */
  function boot() {
    resize(); $('#ld-fill').style.width = '100%';
    renderer.compile(scene, camera);
    requestAnimationFrame((t) => { last = t; frame(t); });
    setTimeout(() => { $('#loader').classList.add('done'); el.hud.hidden = false; setTimeout(() => $('#loader').remove(), 700); currentDistrict = null; }, 350);
  }
  boot();

  window.__world = { car, districts, landmarks, teleportTo, respawn, scene, camera, renderer };
})();
