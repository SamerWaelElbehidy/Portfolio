// ============================================================
//  GAME ENGINE — 2D Top-Down Driving Portfolio Minigame
//  Smooth vector graphics, WASD controls, H=horn, Enter=open
// ============================================================

class PortfolioGame {
  constructor(canvasId, categoryId) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext('2d');
    this.categoryId = categoryId;
    this.category = getCategoryById(categoryId);
    this.projects = getProjectsByCategory(categoryId);

    // ─── Canvas sizing ───
    this.resize();
    window.addEventListener('resize', () => this.resize());

    // ─── World state ───
    this.camera = { x: 0, y: 0 };
    this.worldWidth = 900;
    this.roadY = 0;
    this.roadWidth = 260;
    this.totalWorldHeight = Math.max(this.projects.length * 420 + 800, 3000);

    // ─── Car state ───
    this.car = {
      x: this.worldWidth / 2,
      y: this.totalWorldHeight - 250,
      angle: -Math.PI / 2,   // facing up
      speed: 0,
      maxSpeed: 5.5,
      acceleration: 0.22,
      friction: 0.88,
      turnSpeed: 0.048,
      width: 28,
      height: 52
    };

    // ─── Controls ───
    this.keys = {};
    this.setupControls();

    // ─── Project signs ───
    this.signs = this.generateSigns();
    this.activeSign = null;
    this.nearSign = null;
    this.hornActive = false;
    this.hornRipples = [];

    // ─── Particles / road markings ───
    this.roadMarkings = this.generateRoadMarkings();
    this.exhaustParticles = [];
    this.roadDust = [];

    // ─── Time ───
    this.lastTime = null;
    this.running = false;
    this.frame = 0;

    // ─── Trees / decoration ───
    this.decorations = this.generateDecorations();

    // ─── Camera smoothing ───
    this.cameraTarget = { x: 0, y: 0 };
    this.cameraLerp = 0.08;
  }

  // ──────────────────────────────────────────────────────
  resize() {
    this.canvas.width  = this.canvas.offsetWidth  * window.devicePixelRatio;
    this.canvas.height = this.canvas.offsetHeight * window.devicePixelRatio;
    this.ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    this.W = this.canvas.offsetWidth;
    this.H = this.canvas.offsetHeight;
  }

  // ──────────────────────────────────────────────────────
  generateSigns() {
    const signs = [];
    const totalProjects = this.projects.length;
    const spacing = Math.max(380, (this.totalWorldHeight - 600) / Math.max(totalProjects, 1));
    const roadCenter = this.worldWidth / 2;
    const halfRoad = this.roadWidth / 2;

    this.projects.forEach((proj, i) => {
      const worldY = this.totalWorldHeight - 300 - (i + 1) * spacing;
      const side = i % 2 === 0 ? 'left' : 'right';
      const signX = side === 'left'
        ? roadCenter - halfRoad - 110
        : roadCenter + halfRoad + 110;

      signs.push({
        project: proj,
        x: signX,
        y: worldY,
        side,
        width: 200,
        height: 90,
        glow: 0,          // 0-1 glow amount
        pulse: Math.random() * Math.PI * 2,
        hovered: false
      });
    });
    return signs;
  }

  // ──────────────────────────────────────────────────────
  generateRoadMarkings() {
    const marks = [];
    const centerX = this.worldWidth / 2;
    for (let y = 0; y < this.totalWorldHeight; y += 80) {
      marks.push({ x: centerX, y, length: 40 });
    }
    return marks;
  }

  // ──────────────────────────────────────────────────────
  generateDecorations() {
    const decs = [];
    const roadCenter = this.worldWidth / 2;
    const halfRoad = this.roadWidth / 2;

    for (let y = 0; y < this.totalWorldHeight; y += 60) {
      // Left side trees
      if (Math.random() < 0.35) {
        const x = roadCenter - halfRoad - 30 - Math.random() * 80;
        decs.push({ type: 'tree', x, y: y + Math.random() * 50, size: 12 + Math.random() * 8, sway: Math.random() * Math.PI * 2 });
      }
      // Right side trees
      if (Math.random() < 0.35) {
        const x = roadCenter + halfRoad + 30 + Math.random() * 80;
        decs.push({ type: 'tree', x, y: y + Math.random() * 50, size: 12 + Math.random() * 8, sway: Math.random() * Math.PI * 2 });
      }
      // Lamp posts
      if (y % 240 === 0) {
        decs.push({ type: 'lamp', x: roadCenter - halfRoad - 18, y });
        decs.push({ type: 'lamp', x: roadCenter + halfRoad + 18, y });
      }
    }
    return decs;
  }

  // ──────────────────────────────────────────────────────
  setupControls() {
    window.addEventListener('keydown', (e) => {
      this.keys[e.key.toLowerCase()] = true;

      if ((e.key === 'h' || e.key === 'H') && !this.hornActive) this.startHorn();
      if (e.key === 'Enter') {
        e.preventDefault();
        if (this.nearSign) this.openProject(this.nearSign.project);
      }
      if (e.key === 'Escape') this.closeProject();

      // Prevent page scroll
      if (['arrowup','arrowdown',' '].includes(e.key.toLowerCase())) {
        e.preventDefault();
      }
    });

    window.addEventListener('keyup', (e) => {
      this.keys[e.key.toLowerCase()] = false;
      if (e.key === 'h' || e.key === 'H') this.stopHorn();
    });

    // Mobile Joystick Controls
    const joystickZone = document.getElementById('joystick-zone');
    const joystickKnob = document.getElementById('joystick-knob');
    const DEAD_ZONE = 0.25;
    const MAX_RADIUS = 33; // max px the knob can travel from center

    const resetJoystick = () => {
      this.keys['w'] = false;
      this.keys['s'] = false;
      this.keys['a'] = false;
      this.keys['d'] = false;
      if (joystickKnob) {
        joystickKnob.style.transform = 'translate(0px, 0px)';
        joystickKnob.classList.remove('active');
      }
    };

    const handleJoystick = (touchX, touchY) => {
      if (!joystickZone || !joystickKnob) return;
      const rect = joystickZone.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      let dx = touchX - cx;
      let dy = touchY - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const clamped = Math.min(dist, MAX_RADIUS);
      const angle = Math.atan2(dy, dx);
      const nx = (clamped / MAX_RADIUS) * Math.cos(angle); // -1 to 1
      const ny = (clamped / MAX_RADIUS) * Math.sin(angle); // -1 to 1

      // Move knob visually
      joystickKnob.style.transform = `translate(${Math.cos(angle) * clamped}px, ${Math.sin(angle) * clamped}px)`;
      joystickKnob.classList.add('active');

      // Map to keys
      this.keys['w'] = ny < -DEAD_ZONE;
      this.keys['s'] = ny >  DEAD_ZONE;
      this.keys['a'] = nx < -DEAD_ZONE;
      this.keys['d'] = nx >  DEAD_ZONE;
    };

    if (joystickZone) {
      joystickZone.addEventListener('touchstart', (e) => { e.preventDefault(); handleJoystick(e.touches[0].clientX, e.touches[0].clientY); }, { passive: false });
      joystickZone.addEventListener('touchmove',  (e) => { e.preventDefault(); handleJoystick(e.touches[0].clientX, e.touches[0].clientY); }, { passive: false });
      joystickZone.addEventListener('touchend',   (e) => { e.preventDefault(); resetJoystick(); }, { passive: false });
    }

    const btnHorn = document.getElementById('dpad-horn');
    if (btnHorn) {
      btnHorn.addEventListener('touchstart', (e) => { e.preventDefault(); if (!this.hornActive) this.startHorn(); }, { passive: false });
      btnHorn.addEventListener('touchend', (e) => { e.preventDefault(); this.stopHorn(); }, { passive: false });
      btnHorn.addEventListener('mousedown', () => { if (!this.hornActive) this.startHorn(); });
      btnHorn.addEventListener('mouseup', () => { this.stopHorn(); });
      btnHorn.addEventListener('mouseleave', () => { this.stopHorn(); });
    }

    const btnEnter = document.getElementById('dpad-enter');
    if (btnEnter) {
      const triggerEnter = (e) => {
        if (e && e.preventDefault) e.preventDefault();
        if (this.nearSign) this.openProject(this.nearSign.project);
      };
      btnEnter.addEventListener('touchstart', triggerEnter, { passive: false });
      btnEnter.addEventListener('mousedown', triggerEnter);
    }
  }

  // ──────────────────────────────────────────────────────
  startHorn() {
    this.hornActive = true;
    this.hornRipples.push({
      x: this.car.x,
      y: this.car.y,
      r: 0,
      maxR: 120,
      life: 1.0
    });

    try {
      if (!this.audioCtx) {
        this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      }
      if (this.hornOsc1) this.stopHorn(); // cleanup if double triggered

      this.hornOsc1 = this.audioCtx.createOscillator();
      this.hornOsc2 = this.audioCtx.createOscillator();
      this.hornGain = this.audioCtx.createGain();

      this.hornOsc1.type = 'sawtooth';
      this.hornOsc2.type = 'sawtooth';
      
      // Car horns usually use two dissonant frequencies (e.g. 400Hz and 500Hz)
      this.hornOsc1.frequency.value = 400; 
      this.hornOsc2.frequency.value = 500; 

      this.hornGain.gain.setValueAtTime(0, this.audioCtx.currentTime);
      this.hornGain.gain.linearRampToValueAtTime(0.2, this.audioCtx.currentTime + 0.05);

      this.hornOsc1.connect(this.hornGain);
      this.hornOsc2.connect(this.hornGain);
      this.hornGain.connect(this.audioCtx.destination);

      this.hornOsc1.start();
      this.hornOsc2.start();
    } catch(e) { /* silence if audio not supported */ }
  }

  stopHorn() {
    this.hornActive = false;
    try {
      if (this.hornGain && this.audioCtx) {
        this.hornGain.gain.linearRampToValueAtTime(0, this.audioCtx.currentTime + 0.1);
        const osc1 = this.hornOsc1;
        const osc2 = this.hornOsc2;
        setTimeout(() => {
          if (osc1) { osc1.stop(); osc1.disconnect(); }
          if (osc2) { osc2.stop(); osc2.disconnect(); }
        }, 150);
      }
      this.hornOsc1 = null;
      this.hornOsc2 = null;
      this.hornGain = null;
    } catch(e) {}
  }

  // ──────────────────────────────────────────────────────
  start() {
    this.running = true;
    this.lastTime = performance.now();
    requestAnimationFrame((t) => this.loop(t));
  }

  stop() { this.running = false; }

  // ──────────────────────────────────────────────────────
  loop(timestamp) {
    if (!this.running) return;

    const dt = Math.min((timestamp - this.lastTime) / 16.67, 3); // Normalize to 60fps
    this.lastTime = timestamp;
    this.frame++;

    this.update(dt);
    this.draw();

    requestAnimationFrame((t) => this.loop(t));
  }

  // ──────────────────────────────────────────────────────
  update(dt) {
    this.updateCar(dt);
    this.updateCamera();
    this.updateSigns(dt);
    this.updateParticles(dt);
    this.updateHornRipples(dt);
    this.checkNearSigns();
    this.updateHUD();
  }

  // ──────────────────────────────────────────────────────
  updateCar(dt) {
    const k = this.keys;
    const car = this.car;

    // Steering
    const isTurning = k['a'] || k['arrowleft'] || k['d'] || k['arrowright'];
    if ((k['a'] || k['arrowleft']) && Math.abs(car.speed) > 0.3) {
      car.angle -= car.turnSpeed * dt * (car.speed > 0 ? 1 : -1);
    }
    if ((k['d'] || k['arrowright']) && Math.abs(car.speed) > 0.3) {
      car.angle += car.turnSpeed * dt * (car.speed > 0 ? 1 : -1);
    }

    // Acceleration
    if (k['w'] || k['arrowup']) {
      car.speed += car.acceleration * dt;
    } else if (k['s'] || k['arrowdown']) {
      car.speed -= car.acceleration * dt * 0.7;
    } else {
      car.speed *= Math.pow(car.friction, dt);
    }

    // Clamp speed
    car.speed = Math.max(-car.maxSpeed * 0.5, Math.min(car.maxSpeed, car.speed));

    // Move car
    car.x += Math.cos(car.angle) * car.speed * dt;
    car.y += Math.sin(car.angle) * car.speed * dt;

    // World bounds
    car.x = Math.max(30, Math.min(this.worldWidth - 30, car.x));
    car.y = Math.max(50, Math.min(this.totalWorldHeight - 50, car.y));

    // Exhaust particles when moving
    if (Math.abs(car.speed) > 0.8 && this.frame % 4 === 0) {
      this.spawnExhaust();
    }
  }

  spawnExhaust() {
    const car = this.car;
    const backAngle = car.angle + Math.PI;
    const spread = 0.3;

    for (let i = 0; i < 2; i++) {
      const a = backAngle + (Math.random() - 0.5) * spread;
      this.exhaustParticles.push({
        x: car.x + Math.cos(backAngle) * (car.height / 2 + 2),
        y: car.y + Math.sin(backAngle) * (car.height / 2 + 2),
        vx: Math.cos(a) * (1 + Math.random()),
        vy: Math.sin(a) * (1 + Math.random()),
        life: 1,
        size: 4 + Math.random() * 4,
        color: Math.abs(this.car.speed) > 4 ? '249,115,22' : '148,163,184'
      });
    }
  }

  // ──────────────────────────────────────────────────────
  updateCamera() {
    // Target: center car on screen
    this.cameraTarget.x = this.car.x - this.W / 2;
    this.cameraTarget.y = this.car.y - this.H / 2;

    // Smooth follow
    this.camera.x += (this.cameraTarget.x - this.camera.x) * this.cameraLerp;
    this.camera.y += (this.cameraTarget.y - this.camera.y) * this.cameraLerp;
  }

  // ──────────────────────────────────────────────────────
  updateSigns(dt) {
    this.signs.forEach(sign => {
      sign.pulse += 0.03 * dt;
      // Glow when near car
      const dist = this.distToSign(sign);
      const targetGlow = dist < 160 ? Math.max(0, 1 - dist / 160) : 0;
      sign.glow += (targetGlow - sign.glow) * 0.08 * dt;
    });
  }

  distToSign(sign) {
    return Math.hypot(this.car.x - sign.x, this.car.y - sign.y);
  }

  // ──────────────────────────────────────────────────────
  updateParticles(dt) {
    this.exhaustParticles = this.exhaustParticles.filter(p => {
      p.x += p.vx * dt;
      p.y += p.vy * dt;
      p.life -= 0.04 * dt;
      p.size *= 0.97;
      return p.life > 0;
    });
  }

  // ──────────────────────────────────────────────────────
  updateHornRipples(dt) {
    this.hornRipples = this.hornRipples.filter(r => {
      r.r += 3 * dt;
      r.life -= 0.04 * dt;
      return r.life > 0 && r.r < r.maxR;
    });
  }

  // ──────────────────────────────────────────────────────
  checkNearSigns() {
    let closest = null;
    let closestDist = 130;

    this.signs.forEach(sign => {
      const dist = this.distToSign(sign);
      if (dist < closestDist) {
        closestDist = dist;
        closest = sign;
      }
    });

    this.nearSign = closest;
    const prompt = document.getElementById('enter-prompt');
    if (prompt) {
      if (closest && Math.abs(this.car.speed) < 2.5) {
        const nameSpan = prompt.querySelector('.enter-prompt-project');
        if (nameSpan) nameSpan.textContent = closest.project.name;
        prompt.classList.add('visible');
      } else {
        prompt.classList.remove('visible');
      }
    }
  }

  // ──────────────────────────────────────────────────────
  updateHUD() {
    const speedEl = document.getElementById('hud-speed');
    if (speedEl) {
      const kmh = Math.abs(Math.round(this.car.speed * 18));
      speedEl.textContent = kmh + ' km/h';
    }
    const posEl = document.getElementById('hud-position');
    if (posEl) {
      const progress = 1 - (this.car.y / this.totalWorldHeight);
      posEl.textContent = Math.round(progress * 100) + '%';
    }
    // Track fill
    const fill = document.getElementById('track-fill');
    if (fill) {
      const p = 1 - (this.car.y / this.totalWorldHeight);
      fill.style.height = (p * 100) + '%';
    }
  }

  // ──────────────────────────────────────────────────────
  openProject(project) {
    if (this.activeSign === project) return;
    this.activeSign = project;
    this.car.speed *= 0.1; // slow down

    const overlay = document.getElementById('project-modal-overlay');
    if (!overlay) return;

    const cat = getCategoryById(project.category);
    const accentColor = cat ? cat.color : '#7c5cfc';

    // Accent line
    overlay.querySelector('.modal-accent-line').style.background = accentColor;

    // Category badge
    const badge = overlay.querySelector('.gm-category-badge');
    badge.style.background = accentColor + '22';
    badge.style.border = `1px solid ${accentColor}55`;
    badge.style.color = accentColor;
    badge.textContent = (cat ? cat.icon + ' ' + cat.name : '');

    // Title & desc
    overlay.querySelector('.gm-title').textContent = project.name;
    overlay.querySelector('.gm-short-desc').textContent = project.shortDesc;
    overlay.querySelector('.gm-full-desc').textContent = project.fullDesc || '';

    // How it works
    const howList = overlay.querySelector('.gm-how-list');
    howList.innerHTML = '';
    (project.howItWorks || []).forEach((step, i) => {
      const item = document.createElement('div');
      item.className = 'gm-how-item';
      item.innerHTML = `
        <div class="gm-step-badge" style="background: ${accentColor}">
          ${i + 1}
        </div>
        <div class="gm-step-text">${step}</div>
      `;
      howList.appendChild(item);
    });

    // Code snippet
    const codeEl = overlay.querySelector('.gm-code');
    if (project.codeSnippet) {
      codeEl.parentElement.style.display = '';
      codeEl.textContent = project.codeSnippet;
    } else {
      codeEl.parentElement.style.display = 'none';
    }

    // Tech stack
    const techGrid = overlay.querySelector('.gm-tech-grid');
    techGrid.innerHTML = '';
    (project.techStack || []).forEach(tech => {
      const pill = document.createElement('span');
      pill.className = 'gm-tech-pill';
      pill.textContent = tech;
      techGrid.appendChild(pill);
    });

    // Tags
    const tagsGrid = overlay.querySelector('.gm-tags-grid');
    if (tagsGrid) {
      tagsGrid.innerHTML = '';
      (project.tags || []).slice(0, 8).forEach(tag => {
        const t = document.createElement('span');
        t.className = 'tag';
        t.textContent = '#' + tag;
        tagsGrid.appendChild(t);
      });
    }

    overlay.classList.add('open');
  }

  closeProject() {
    this.activeSign = null;
    const overlay = document.getElementById('project-modal-overlay');
    if (overlay) overlay.classList.remove('open');
    if (document.activeElement && typeof document.activeElement.blur === 'function') {
      document.activeElement.blur();
    }
  }

  // ──────────────────────────────────────────────────────
  //  RENDERING
  // ──────────────────────────────────────────────────────
  draw() {
    const ctx = this.ctx;
    const W = this.W, H = this.H;
    const cx = this.camera.x;
    const cy = this.camera.y;

    // ── Clear ──
    ctx.clearRect(0, 0, W, H);

    // Save + transform to world space
    ctx.save();
    ctx.translate(-cx, -cy);

    this.drawBackground(ctx, cx, cy, W, H);
    this.drawRoad(ctx);
    this.drawDecorations(ctx, cx, cy, W, H);
    this.drawRoadMarkings(ctx, cx, cy, W, H);
    this.drawSigns(ctx, cx, cy, W, H);
    this.drawExhaust(ctx);
    this.drawHornRipples(ctx);
    this.drawCar(ctx);

    ctx.restore();
  }

  // ── Background (grass + gradient) ──
  drawBackground(ctx, cx, cy, W, H) {
    // Sky-like dark gradient — full world
    const bg = ctx.createLinearGradient(cx, cy, cx, cy + H);
    bg.addColorStop(0,   '#04040e');
    bg.addColorStop(0.5, '#060614');
    bg.addColorStop(1,   '#04040e');
    ctx.fillStyle = bg;
    ctx.fillRect(cx, cy, W, H);

    // Subtle grass on sides
    const roadCenter = this.worldWidth / 2;
    const halfRoad = this.roadWidth / 2 + 20; // shoulder

    // Left grass
    const lgGrad = ctx.createLinearGradient(0, 0, roadCenter - halfRoad, 0);
    lgGrad.addColorStop(0,   '#060e08');
    lgGrad.addColorStop(0.7, '#070f09');
    lgGrad.addColorStop(1,   '#0a1a0c');
    ctx.fillStyle = lgGrad;
    ctx.fillRect(cx, cy, roadCenter - halfRoad - cx, H);

    // Right grass
    const rgGrad = ctx.createLinearGradient(roadCenter + halfRoad, 0, this.worldWidth, 0);
    rgGrad.addColorStop(0,   '#0a1a0c');
    rgGrad.addColorStop(1,   '#060e08');
    ctx.fillStyle = rgGrad;
    ctx.fillRect(roadCenter + halfRoad, cy, this.worldWidth - (roadCenter + halfRoad), H);
  }

  // ── Road ──
  drawRoad(ctx) {
    const cx = this.worldWidth / 2;
    const hw = this.roadWidth / 2;
    const y1 = 0;
    const y2 = this.totalWorldHeight;

    // Road surface gradient (L→R)
    const roadGrad = ctx.createLinearGradient(cx - hw, 0, cx + hw, 0);
    roadGrad.addColorStop(0,    '#111120');
    roadGrad.addColorStop(0.12, '#171730');
    roadGrad.addColorStop(0.5,  '#1a1a38');
    roadGrad.addColorStop(0.88, '#171730');
    roadGrad.addColorStop(1,    '#111120');
    ctx.fillStyle = roadGrad;
    ctx.fillRect(cx - hw, y1, this.roadWidth, y2 - y1);

    // Road shoulder lines (white edges)
    ctx.strokeStyle = 'rgba(255,255,255,0.25)';
    ctx.lineWidth = 3;
    ctx.setLineDash([]);

    ctx.beginPath();
    ctx.moveTo(cx - hw, y1);
    ctx.lineTo(cx - hw, y2);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(cx + hw, y1);
    ctx.lineTo(cx + hw, y2);
    ctx.stroke();

    // Subtle road glow (center ambient)
    const glow = ctx.createLinearGradient(cx - hw, 0, cx + hw, 0);
    glow.addColorStop(0,   'transparent');
    glow.addColorStop(0.5, 'rgba(124,92,252,0.04)');
    glow.addColorStop(1,   'transparent');
    ctx.fillStyle = glow;
    ctx.fillRect(cx - hw, y1, this.roadWidth, y2 - y1);
  }

  // ── Decorations (trees, lamps) ──
  drawDecorations(ctx, cx, cy, W, H) {
    const t = this.frame * 0.01;
    this.decorations.forEach(dec => {
      // Only draw visible ones
      if (dec.y < cy - 100 || dec.y > cy + H + 100) return;

      if (dec.type === 'tree') {
        this.drawTree(ctx, dec.x, dec.y, dec.size, t + dec.sway);
      } else if (dec.type === 'lamp') {
        this.drawLampPost(ctx, dec.x, dec.y);
      }
    });
  }

  drawTree(ctx, x, y, size, t) {
    // Trunk
    ctx.fillStyle = '#2d1a0e';
    ctx.fillRect(x - 2, y, 4, size * 0.5);

    // Canopy (3 circles for smooth look)
    const sway = Math.sin(t) * 1.5;
    const colors = ['#0d3b1a', '#0f4a20', '#137328'];
    for (let i = 2; i >= 0; i--) {
      const r = size * (0.7 + i * 0.15);
      const yOff = -size * (0.3 + i * 0.2);
      ctx.beginPath();
      ctx.arc(x + sway * (i * 0.3), y + yOff, r, 0, Math.PI * 2);
      ctx.fillStyle = colors[i];
      ctx.fill();
    }

    // Highlight
    ctx.beginPath();
    ctx.arc(x - size * 0.2 + sway, y - size * 0.8, size * 0.3, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255,255,255,0.04)';
    ctx.fill();
  }

  drawLampPost(ctx, x, y) {
    // Post
    ctx.strokeStyle = '#2d3748';
    ctx.lineWidth = 3;
    ctx.setLineDash([]);
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x, y - 45);
    ctx.lineTo(x + (x < this.worldWidth / 2 ? 12 : -12), y - 45);
    ctx.stroke();

    // Glow
    const gGrad = ctx.createRadialGradient(
      x + (x < this.worldWidth / 2 ? 12 : -12), y - 45, 0,
      x + (x < this.worldWidth / 2 ? 12 : -12), y - 45, 25
    );
    gGrad.addColorStop(0,   'rgba(245,158,11,0.3)');
    gGrad.addColorStop(0.5, 'rgba(245,158,11,0.08)');
    gGrad.addColorStop(1,   'transparent');
    ctx.fillStyle = gGrad;
    ctx.beginPath();
    ctx.arc(x + (x < this.worldWidth / 2 ? 12 : -12), y - 45, 25, 0, Math.PI * 2);
    ctx.fill();

    // Lamp bulb
    ctx.beginPath();
    ctx.arc(x + (x < this.worldWidth / 2 ? 12 : -12), y - 45, 4, 0, Math.PI * 2);
    ctx.fillStyle = '#fde68a';
    ctx.fill();
  }

  // ── Road Markings (dashed center line) ──
  drawRoadMarkings(ctx, cx, cy, W, H) {
    const centerX = this.worldWidth / 2;
    ctx.strokeStyle = 'rgba(255,255,255,0.2)';
    ctx.lineWidth = 2.5;
    ctx.setLineDash([40, 40]);

    ctx.beginPath();
    // Draw the static line for the entire world length, let camera translation handle the rest
    ctx.moveTo(centerX, 0);
    ctx.lineTo(centerX, this.totalWorldHeight);
    ctx.stroke();

    ctx.setLineDash([]);
  }

  // ── Project Signs ──
  drawSigns(ctx, cx, cy, W, H) {
    this.signs.forEach(sign => {
      // Culling
      if (sign.y < cy - 200 || sign.y > cy + H + 200) return;
      this.drawSign(ctx, sign);
    });
  }

  drawSign(ctx, sign) {
    const { x, y, width, height, project, glow, pulse, side } = sign;
    const cat = getCategoryById(project.category);
    const catColor = cat ? cat.color : '#7c5cfc';

    const hw = width / 2;
    const hh = height / 2;

    // ── Pole ──
    const poleX = side === 'left' ? x + hw - 4 : x - hw + 4;
    ctx.strokeStyle = '#2d3748';
    ctx.lineWidth = 4;
    ctx.setLineDash([]);
    ctx.beginPath();
    ctx.moveTo(poleX, y + hh);
    ctx.lineTo(poleX, y + hh + 40);
    ctx.stroke();

    // ── Glow halo ──
    if (glow > 0.01) {
      const gHalo = ctx.createRadialGradient(x, y, 0, x, y, width * 0.9);
      gHalo.addColorStop(0,   hexToRgba(catColor, 0.12 * glow));
      gHalo.addColorStop(0.6, hexToRgba(catColor, 0.04 * glow));
      gHalo.addColorStop(1,   'transparent');
      ctx.fillStyle = gHalo;
      ctx.beginPath();
      ctx.ellipse(x, y, width * 0.9, height * 1.1, 0, 0, Math.PI * 2);
      ctx.fill();
    }

    // ── Sign board ──
    // Shadow
    ctx.fillStyle = 'rgba(0,0,0,0.5)';
    this.roundRect(ctx, x - hw + 4, y - hh + 4, width, height, 12);
    ctx.fill();

    // Background
    const bgGrad = ctx.createLinearGradient(x - hw, y - hh, x + hw, y + hh);
    bgGrad.addColorStop(0, '#0e0e22');
    bgGrad.addColorStop(1, '#12122e');
    ctx.fillStyle = bgGrad;
    this.roundRect(ctx, x - hw, y - hh, width, height, 12);
    ctx.fill();

    // Border with glow
    const borderAlpha = 0.3 + glow * 0.5 + Math.sin(pulse) * 0.08 * glow;
    ctx.strokeStyle = hexToRgba(catColor, borderAlpha);
    ctx.lineWidth = 2;
    this.roundRect(ctx, x - hw, y - hh, width, height, 12);
    ctx.stroke();

    // Top accent stripe
    const stripeGrad = ctx.createLinearGradient(x - hw, 0, x + hw, 0);
    stripeGrad.addColorStop(0, 'transparent');
    stripeGrad.addColorStop(0.5, catColor);
    stripeGrad.addColorStop(1, 'transparent');
    ctx.fillStyle = stripeGrad;
    this.roundRect(ctx, x - hw, y - hh, width, 3, 0);
    ctx.fill();

    // ── Icon + Category ──
    ctx.font = '16px serif';
    ctx.textAlign = 'center';
    ctx.fillText(cat ? cat.icon : '📁', x, y - hh + 22);

    // ── Project name ──
    ctx.font = 'bold 10px "Space Grotesk", sans-serif';
    ctx.fillStyle = '#f1f5f9';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // Wrap long names
    const maxW = width - 20;
    const words = project.name.split(' ');
    let lines = [];
    let currentLine = '';
    words.forEach(word => {
      const testLine = currentLine ? currentLine + ' ' + word : word;
      if (ctx.measureText(testLine).width > maxW && currentLine) {
        lines.push(currentLine);
        currentLine = word;
      } else {
        currentLine = testLine;
      }
    });
    if (currentLine) lines.push(currentLine);

    const lineHeight = 13;
    const totalH = lines.length * lineHeight;
    const startY = y - hh + 36;
    lines.forEach((line, i) => {
      ctx.fillText(line, x, startY + i * lineHeight);
    });

    // ── Short desc ──
    ctx.font = '8px "Space Grotesk", sans-serif';
    ctx.fillStyle = hexToRgba('#94a3b8', 0.85);
    const descY = startY + totalH + 6;
    const shortDesc = project.shortDesc.substring(0, 38) + (project.shortDesc.length > 38 ? '…' : '');
    ctx.fillText(shortDesc, x, descY);

    // ── Arrow indicator when close ──
    if (glow > 0.3) {
      const arrowX = side === 'left' ? x + hw + 10 : x - hw - 10;
      const arrowDir = side === 'left' ? 1 : -1;
      const arrowBounce = Math.sin(this.frame * 0.1) * 3;

      ctx.fillStyle = hexToRgba(catColor, glow);
      ctx.beginPath();
      ctx.moveTo(arrowX + arrowDir * (4 + arrowBounce), y);
      ctx.lineTo(arrowX - arrowDir * 4, y - 6);
      ctx.lineTo(arrowX - arrowDir * 4, y + 6);
      ctx.closePath();
      ctx.fill();
    }

    ctx.textBaseline = 'alphabetic';
  }

  // ── Exhaust Particles ──
  drawExhaust(ctx) {
    this.exhaustParticles.forEach(p => {
      ctx.globalAlpha = p.life * 0.6;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${p.color}, ${p.life * 0.5})`;
      ctx.fill();
    });
    ctx.globalAlpha = 1;
  }

  // ── Horn Ripples ──
  drawHornRipples(ctx) {
    this.hornRipples.forEach(r => {
      ctx.globalAlpha = r.life * 0.6;
      ctx.strokeStyle = `rgba(240,192,64,${r.life})`;
      ctx.lineWidth = 2;
      ctx.setLineDash([]);
      ctx.beginPath();
      ctx.arc(r.x, r.y, r.r, 0, Math.PI * 2);
      ctx.stroke();
    });
    ctx.globalAlpha = 1;
  }

  // ── Car (smooth vector) ──
  drawCar(ctx) {
    const car = this.car;
    ctx.save();
    ctx.translate(car.x, car.y);
    ctx.rotate(car.angle + Math.PI / 2); // align to direction

    const w = car.width;
    const h = car.height;

    // ── Car shadow ──
    ctx.save();
    ctx.shadowColor = 'rgba(0,0,0,0.6)';
    ctx.shadowBlur = 20;
    ctx.shadowOffsetY = 6;
    ctx.fillStyle = 'rgba(0,0,0,0.3)';
    this.roundRect(ctx, -w/2 + 2, -h/2 + 2, w, h, 8);
    ctx.fill();
    ctx.restore();

    // ── Headlights glow (when moving forward) ──
    if (this.car.speed > 0.5) {
      const headGlow = ctx.createRadialGradient(0, -h/2 - 10, 0, 0, -h/2 - 10, 40);
      headGlow.addColorStop(0,   'rgba(245,235,180,0.25)');
      headGlow.addColorStop(0.5, 'rgba(245,235,180,0.06)');
      headGlow.addColorStop(1,   'transparent');
      ctx.fillStyle = headGlow;
      ctx.beginPath();
      ctx.ellipse(0, -h/2 - 10, 40, 50, 0, 0, Math.PI * 2);
      ctx.fill();
    }

    // ── Car body ──
    // Main body
    const bodyGrad = ctx.createLinearGradient(-w/2, -h/2, w/2, h/2);
    bodyGrad.addColorStop(0,   '#2d1a4a');
    bodyGrad.addColorStop(0.3, '#3b2169');
    bodyGrad.addColorStop(0.7, '#2d1a4a');
    bodyGrad.addColorStop(1,   '#1a0d2e');
    ctx.fillStyle = bodyGrad;
    this.roundRect(ctx, -w/2, -h/2, w, h, 8);
    ctx.fill();

    // Body highlight (top sheen)
    const sheen = ctx.createLinearGradient(-w/2, -h/2, w/2, -h/4);
    sheen.addColorStop(0,   'rgba(255,255,255,0.12)');
    sheen.addColorStop(1,   'transparent');
    ctx.fillStyle = sheen;
    this.roundRect(ctx, -w/2, -h/2, w, h/3, 8);
    ctx.fill();

    // Accent stripe (purple/gold)
    const stripeGrad = ctx.createLinearGradient(-w/2, 0, w/2, 0);
    stripeGrad.addColorStop(0,   'transparent');
    stripeGrad.addColorStop(0.3, '#7c5cfc');
    stripeGrad.addColorStop(0.7, '#f0c040');
    stripeGrad.addColorStop(1,   'transparent');
    ctx.fillStyle = stripeGrad;
    ctx.fillRect(-w/2, -3, w, 6);

    // Car outline
    ctx.strokeStyle = '#7c5cfc';
    ctx.lineWidth = 1.5;
    this.roundRect(ctx, -w/2, -h/2, w, h, 8);
    ctx.stroke();

    // ── Windshield ──
    const wsGrad = ctx.createLinearGradient(-w/2+4, -h/2+6, w/2-4, -h/4);
    wsGrad.addColorStop(0,   'rgba(120,160,255,0.35)');
    wsGrad.addColorStop(1,   'rgba(80,120,220,0.15)');
    ctx.fillStyle = wsGrad;
    this.roundRect(ctx, -w/2+5, -h/2+5, w-10, h/3.5, 5);
    ctx.fill();
    // Windshield glare
    ctx.fillStyle = 'rgba(255,255,255,0.15)';
    this.roundRect(ctx, -w/2+6, -h/2+6, w/3, h/10, 3);
    ctx.fill();

    // ── Rear window ──
    ctx.fillStyle = 'rgba(80,120,220,0.2)';
    this.roundRect(ctx, -w/2+5, h/2-5-h/4.5, w-10, h/4.5, 4);
    ctx.fill();

    // ── Wheels ──
    const wheelPositions = [
      { x: -w/2 - 5, y: -h/2 + 10 },  // front-left
      { x:  w/2 + 5, y: -h/2 + 10 },  // front-right
      { x: -w/2 - 5, y:  h/2 - 10 },  // rear-left
      { x:  w/2 + 5, y:  h/2 - 10 }   // rear-right
    ];
    const wheelW = 7, wheelH = 14;
    wheelPositions.forEach(wh => {
      // Wheel body
      ctx.fillStyle = '#1a1a2e';
      this.roundRect(ctx, wh.x - wheelW/2, wh.y - wheelH/2, wheelW, wheelH, 3);
      ctx.fill();
      // Wheel border
      ctx.strokeStyle = '#2d2d4e';
      ctx.lineWidth = 1;
      this.roundRect(ctx, wh.x - wheelW/2, wh.y - wheelH/2, wheelW, wheelH, 3);
      ctx.stroke();
      // Rim
      ctx.fillStyle = '#4a4a6a';
      ctx.beginPath();
      ctx.ellipse(wh.x, wh.y, wheelW/2 - 1.5, wheelH/2 - 3, 0, 0, Math.PI * 2);
      ctx.fill();
    });

    // ── Headlights ──
    ctx.fillStyle = this.car.speed > 0.2 ? '#fef9c3' : '#a0a0c0';
    ctx.shadowColor = this.car.speed > 0.2 ? 'rgba(254,249,195,0.9)' : 'transparent';
    ctx.shadowBlur = this.car.speed > 0.2 ? 12 : 0;
    // Left headlight
    ctx.beginPath();
    ctx.ellipse(-w/2+8, -h/2+4, 5, 3, 0, 0, Math.PI * 2);
    ctx.fill();
    // Right headlight
    ctx.beginPath();
    ctx.ellipse(w/2-8, -h/2+4, 5, 3, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;

    // ── Tail lights ──
    const isReversing = this.car.speed < -0.3;
    const isBraking = (this.keys['s'] || this.keys['arrowdown']) && this.car.speed > 0.2;
    ctx.fillStyle = (isReversing || isBraking) ? '#ff4444' : '#7a1111';
    ctx.shadowColor = (isReversing || isBraking) ? 'rgba(255,68,68,0.8)' : 'transparent';
    ctx.shadowBlur = (isReversing || isBraking) ? 10 : 0;
    // Left tail
    ctx.beginPath();
    ctx.ellipse(-w/2+8, h/2-4, 5, 3, 0, 0, Math.PI * 2);
    ctx.fill();
    // Right tail
    ctx.beginPath();
    ctx.ellipse(w/2-8, h/2-4, 5, 3, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;

    // ── Horn flash ──
    if (this.hornActive) {
      ctx.fillStyle = 'rgba(240,192,64,0.15)';
      ctx.beginPath();
      ctx.arc(0, 0, w, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.restore();
  }

  // ── Utility: Rounded Rectangle ──
  roundRect(ctx, x, y, w, h, r) {
    if (r > w / 2) r = w / 2;
    if (r > h / 2) r = h / 2;
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + w - r, y);
    ctx.quadraticCurveTo(x + w, y, x + w, y + r);
    ctx.lineTo(x + w, y + h - r);
    ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    ctx.lineTo(x + r, y + h);
    ctx.quadraticCurveTo(x, y + h, x, y + h - r);
    ctx.lineTo(x, y + r);
    ctx.quadraticCurveTo(x, y, x + r, y);
    ctx.closePath();
  }
}

// ──────────────────────────────────────────────────────
//  UTILITY
// ──────────────────────────────────────────────────────
function hexToRgba(hex, alpha) {
  if (!hex || !hex.startsWith('#')) return `rgba(124,92,252,${alpha})`;
  const r = parseInt(hex.slice(1,3),16);
  const g = parseInt(hex.slice(3,5),16);
  const b = parseInt(hex.slice(5,7),16);
  return `rgba(${r},${g},${b},${alpha})`;
}

// ──────────────────────────────────────────────────────
//  MINIMAP RENDERER
// ──────────────────────────────────────────────────────
function renderMinimap(game) {
  const mmCanvas = document.getElementById('minimap-canvas');
  if (!mmCanvas) return;
  const ctx = mmCanvas.getContext('2d');
  const W = mmCanvas.width;
  const H = mmCanvas.height;

  ctx.clearRect(0, 0, W, H);

  const scaleX = W / game.worldWidth;
  const scaleY = H / game.totalWorldHeight;

  // Road
  const rxL = (game.worldWidth / 2 - game.roadWidth / 2) * scaleX;
  const rxR = (game.worldWidth / 2 + game.roadWidth / 2) * scaleX;
  ctx.fillStyle = 'rgba(26,26,56,0.9)';
  ctx.fillRect(rxL, 0, rxR - rxL, H);

  // Signs
  game.signs.forEach(sign => {
    const sx = sign.x * scaleX;
    const sy = sign.y * scaleY;
    const cat = getCategoryById(sign.project.category);
    ctx.fillStyle = cat ? cat.color : '#7c5cfc';
    ctx.globalAlpha = 0.7;
    ctx.beginPath();
    ctx.arc(sx, sy, 3, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = 1;
  });

  // Car
  const cx = game.car.x * scaleX;
  const cy = game.car.y * scaleY;
  ctx.fillStyle = '#f0c040';
  ctx.beginPath();
  ctx.arc(cx, cy, 4, 0, Math.PI * 2);
  ctx.fill();

  // Viewport rect
  const vpX = game.camera.x * scaleX;
  const vpY = game.camera.y * scaleY;
  const vpW = game.W * scaleX;
  const vpH = game.H * scaleY;
  ctx.strokeStyle = 'rgba(255,255,255,0.15)';
  ctx.lineWidth = 1;
  ctx.strokeRect(vpX, vpY, vpW, vpH);

  requestAnimationFrame(() => renderMinimap(game));
}

// ──────────────────────────────────────────────────────
//  GAME PAGE INIT
// ──────────────────────────────────────────────────────
function initGame() {
  const params = new URLSearchParams(window.location.search);
  const categoryId = params.get('category') || 'medical';
  const category   = getCategoryById(categoryId);

  if (!category) {
    window.location.href = 'index.html';
    return;
  }

  // Set page theme
  document.title = `${category.icon} ${category.name} — Samer Wael`;

  // Category badge
  const badge = document.getElementById('game-category-badge');
  if (badge) badge.textContent = category.icon + ' ' + category.name;

  // Intro overlay
  const intro = document.getElementById('game-intro');
  const introTitle = intro?.querySelector('.intro-category-name');
  if (introTitle) introTitle.textContent = category.name;

  // Project count
  const projects = getProjectsByCategory(categoryId);
  const countEl = document.getElementById('project-count');
  if (countEl) countEl.textContent = projects.length;

  // ── Init game FIRST so closures below can safely reference it ──
  const game = new PortfolioGame('game-canvas', categoryId);
  window._game = game;

  // Helper: hide intro and start game
  function startGame() {
    if (intro && !intro.classList.contains('hidden')) {
      intro.classList.add('hidden');
      setTimeout(() => { intro.style.display = 'none'; }, 700);
    }
    if (!game.running) game.start();
  }

  // Start button
  const startBtn = document.getElementById('start-game-btn');
  if (startBtn) {
    startBtn.addEventListener('click', startGame);
  }

  // Also start on any key press (while intro is visible)
  window.addEventListener('keydown', function startOnKey() {
    if (!intro || intro.classList.contains('hidden')) return;
    startGame();
  }, { once: true });

  // If 'open' param present, skip intro and open that project
  const openProjectId = params.get('open');
  if (openProjectId) {
    startGame();
    setTimeout(() => {
      const project = PROJECTS.find(p => p.id === openProjectId);
      if (project) game.openProject(project);
    }, 100);
  } else {
    // Start game immediately (no intro in our current game.html)
    game.start();
  }

  // Modal close
  const overlay = document.getElementById('project-modal-overlay');
  const closeBtn = document.getElementById('modal-close-btn');
  if (closeBtn) closeBtn.addEventListener('click', () => game.closeProject());
  if (overlay) {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) game.closeProject();
    });
  }

  // Minimap
  requestAnimationFrame(() => renderMinimap(game));
}

// Init on DOMContentLoaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initGame);
} else {
  initGame();
}
