// ============================================================
//  LANDING PAGE LOGIC — Particles, Animations, Search, Nav
// ============================================================

// ─── PARTICLE SYSTEM ───────────────────────────────────────
class ParticleSystem {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.mouse = { x: -1000, y: -1000 };
    this.resize();
    this.spawnParticles(80);
    this.bindEvents();
    this.loop();
  }

  resize() {
    this.canvas.width  = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.W = window.innerWidth;
    this.H = window.innerHeight;
  }

  spawnParticles(count) {
    for (let i = 0; i < count; i++) {
      this.particles.push(this.createParticle());
    }
  }

  createParticle() {
    const colors = ['124,92,252','240,192,64','244,63,94','34,211,238','16,185,129'];
    const color = colors[Math.floor(Math.random() * colors.length)];
    return {
      x:     Math.random() * this.W,
      y:     Math.random() * this.H,
      vx:    (Math.random() - 0.5) * 0.5,
      vy:    (Math.random() - 0.5) * 0.5,
      r:     Math.random() * 2 + 0.5,
      alpha: Math.random() * 0.5 + 0.1,
      color,
      pulse: Math.random() * Math.PI * 2
    };
  }

  bindEvents() {
    window.addEventListener('resize', () => this.resize());
    window.addEventListener('mousemove', (e) => {
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;
    });
  }

  loop() {
    const ctx = this.ctx;
    ctx.clearRect(0, 0, this.W, this.H);

    this.particles.forEach((p, i) => {
      // Mouse repulsion
      const dx = p.x - this.mouse.x;
      const dy = p.y - this.mouse.y;
      const dist = Math.hypot(dx, dy);
      if (dist < 120) {
        const force = (120 - dist) / 120;
        p.vx += (dx / dist) * force * 0.3;
        p.vy += (dy / dist) * force * 0.3;
      }

      p.vx *= 0.97;
      p.vy *= 0.97;
      p.x += p.vx;
      p.y += p.vy;
      p.pulse += 0.02;

      // Wrap
      if (p.x < 0) p.x = this.W;
      if (p.x > this.W) p.x = 0;
      if (p.y < 0) p.y = this.H;
      if (p.y > this.H) p.y = 0;

      const alpha = p.alpha * (0.7 + Math.sin(p.pulse) * 0.3);
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${p.color},${alpha})`;
      ctx.fill();

      // Connect nearby particles
      this.particles.slice(i + 1).forEach(p2 => {
        const d = Math.hypot(p.x - p2.x, p.y - p2.y);
        if (d < 100) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = `rgba(${p.color},${(1 - d / 100) * 0.12})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      });
    });

    requestAnimationFrame(() => this.loop());
  }
}

// ─── NAVBAR SCROLL EFFECT ──────────────────────────────────
function initNav() {
  const nav = document.querySelector('.nav');
  if (!nav) return;

  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  });

  // Active link based on scroll
  const sections = document.querySelectorAll('section[id]');
  const links = document.querySelectorAll('.nav-link[data-section]');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        links.forEach(l => l.classList.remove('active'));
        const link = document.querySelector(`.nav-link[data-section="${entry.target.id}"]`);
        if (link) link.classList.add('active');
      }
    });
  }, { threshold: 0.3 });

  sections.forEach(s => observer.observe(s));
}

// ─── COUNTER ANIMATION ─────────────────────────────────────
function animateCounter(el, target, duration = 1500) {
  const start = performance.now();
  const from = 0;

  const tick = (now) => {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
    el.textContent = Math.floor(from + (target - from) * eased);
    if (progress < 1) requestAnimationFrame(tick);
    else el.textContent = target + (el.dataset.suffix || '');
  };
  requestAnimationFrame(tick);
}

function initCounters() {
  const counters = document.querySelectorAll('[data-count]');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        animateCounter(el, parseInt(el.dataset.count), 1800);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.5 });
  counters.forEach(el => observer.observe(el));
}

// ─── SCROLL REVEAL ANIMATIONS ──────────────────────────────
function initScrollReveal() {
  const elements = document.querySelectorAll('.animate-in');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, entry.target.dataset.delay || 0);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  elements.forEach((el, i) => {
    el.style.transitionDelay = (i * 60) + 'ms';
    observer.observe(el);
  });
}

// ─── FLOATING TECH ICONS POSITIONS ─────────────────────────
function initFloatingIcons() {
  const icons = [
    { emoji: '🤖', top: '20%', left: '8%',  duration: '6s', delay: '0s', rot: '-8deg' },
    { emoji: '🏥', top: '35%', left: '5%',  duration: '7s', delay: '1s', rot: '5deg' },
    { emoji: '🌱', top: '65%', left: '6%',  duration: '8s', delay: '0.5s', rot: '-4deg' },
    { emoji: '🔧', top: '80%', left: '10%', duration: '6.5s', delay: '1.5s', rot: '8deg' },
    { emoji: '🚗', top: '20%', right: '8%', duration: '7.5s', delay: '0.8s', rot: '4deg' },
    { emoji: '🥽', top: '45%', right: '5%', duration: '6s',   delay: '2s',   rot: '-6deg' },
    { emoji: '💻', top: '70%', right: '7%', duration: '8s',   delay: '0.3s', rot: '6deg' },
    { emoji: '📡', top: '12%', left: '28%', duration: '9s',   delay: '1.2s', rot: '-3deg' },
    { emoji: '⚡', top: '88%', right: '22%', duration: '7s',  delay: '0.7s', rot: '3deg' },
  ];

  const ring = document.querySelector('.tech-icons-ring');
  if (!ring) return;

  icons.forEach(icon => {
    const el = document.createElement('div');
    el.className = 'floating-icon';
    el.textContent = icon.emoji;
    el.style.cssText = `
      top: ${icon.top};
      left: ${icon.left || 'auto'};
      right: ${icon.right || 'auto'};
      --duration: ${icon.duration};
      --delay: ${icon.delay};
      --rot: ${icon.rot};
      animation-delay: ${icon.delay};
    `;
    ring.appendChild(el);
  });
}

// ─── SEARCH ────────────────────────────────────────────────
function initSearch() {
  const input   = document.getElementById('global-search');
  const results = document.getElementById('search-results');
  if (!input || !results) return;

  let debounceTimer = null;

  input.addEventListener('input', () => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      const q = input.value.trim();
      if (q.length < 2) {
        results.classList.remove('visible');
        results.innerHTML = '';
        return;
      }
      const found = searchProjects(q).slice(0, 10);
      renderSearchResults(found, results);
    }, 200);
  });

  input.addEventListener('focus', () => {
    if (input.value.trim().length >= 2) results.classList.add('visible');
  });

  document.addEventListener('click', (e) => {
    if (!e.target.closest('.search-wrapper')) {
      results.classList.remove('visible');
    }
  });

  // Keyboard navigation
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      results.classList.remove('visible');
      input.blur();
    }
  });
}

function renderSearchResults(projects, container) {
  if (projects.length === 0) {
    container.innerHTML = `
      <div style="padding:1.5rem;text-align:center;color:var(--text-muted);font-size:0.85rem;">
        No projects found 🔍
      </div>`;
    container.classList.add('visible');
    return;
  }

  container.innerHTML = projects.map(p => {
    const cat = getCategoryById(p.category);
    return `
      <div class="search-result-item" onclick="openProjectFromSearch('${p.id}', '${p.category}')">
        <div class="search-result-icon">${cat ? cat.icon : '📁'}</div>
        <div class="search-result-info">
          <div class="search-result-name">${p.name}</div>
          <div class="search-result-desc">${p.shortDesc}</div>
        </div>
        <div class="search-result-cat">${cat ? cat.name : ''}</div>
      </div>`;
  }).join('');

  container.classList.add('visible');
}

function openProjectFromSearch(projectId, categoryId) {
  // Navigate to game with that category and auto-open project
  window.location.href = `game.html?category=${categoryId}&open=${projectId}`;
}

// ─── CATEGORY CARDS ─────────────────────────────────────────
function renderCategoryCards() {
  const grid = document.getElementById('categories-grid');
  if (!grid) return;

  CATEGORIES.forEach((cat, i) => {
    const projects = getProjectsByCategory(cat.id);
    const card = document.createElement('a');
    card.href = `game.html?category=${cat.id}`;
    card.className = 'category-card animate-in';
    card.dataset.delay = i * 80;
    card.style.cssText = `--cat-color: ${cat.color}; --cat-gradient: ${cat.gradient};`;

    card.innerHTML = `
      <div class="category-card-body">
        <div class="category-icon-wrap" style="background:${cat.color}18;border-color:${cat.color}33;">
          ${cat.icon}
        </div>
        <div class="category-name">${cat.name}</div>
        <div class="category-desc">${cat.description}</div>
        <div class="category-footer">
          <div class="category-count">
            <strong>${projects.length}</strong> projects
          </div>
          <div class="category-arrow">→</div>
        </div>
      </div>`;

    grid.appendChild(card);
  });
}

// ─── FEATURED PROJECTS ─────────────────────────────────────
function renderFeaturedProjects() {
  const grid = document.getElementById('featured-grid');
  if (!grid) return;

  const featured = getFeaturedProjects().slice(0, 6);

  const cardConfigs = [
    { cls: 'span-2', accentIdx: 0 },
    { cls: '',       accentIdx: 1 },
    { cls: '',       accentIdx: 2 },
    { cls: '',       accentIdx: 3 },
    { cls: 'span-2', accentIdx: 4 },
    { cls: '',       accentIdx: 5 },
  ];

  const accents = [
    'linear-gradient(90deg,#7c5cfc,#f0c040)',
    'linear-gradient(90deg,#f43f5e,#7c5cfc)',
    'linear-gradient(90deg,#06b6d4,#10b981)',
    'linear-gradient(90deg,#f97316,#eab308)',
    'linear-gradient(90deg,#10b981,#06b6d4)',
    'linear-gradient(90deg,#eab308,#f43f5e)',
  ];

  featured.forEach((p, i) => {
    const cat = getCategoryById(p.category);
    const cfg = cardConfigs[i] || { cls: '', accentIdx: i };
    const card = document.createElement('div');
    card.className = `featured-card ${cfg.cls} animate-in`;
    card.dataset.delay = i * 100;
    card.style.setProperty('--card-accent', accents[cfg.accentIdx]);
    card.style.cursor = 'pointer';

    card.innerHTML = `
      <div class="featured-card-glow" style="background:radial-gradient(ellipse at 30% 30%,${cat?.color || '#7c5cfc'}12,transparent 70%)"></div>
      <div class="featured-card-top">
        <div class="featured-card-icon" style="background:${cat?.color || '#7c5cfc'}18;border:1px solid ${cat?.color || '#7c5cfc'}33;">
          ${cat?.icon || '📁'}
        </div>
        <div class="featured-arrow">↗</div>
      </div>
      <div class="featured-card-name">${p.name}</div>
      <div class="featured-card-desc">${p.shortDesc}</div>
      <div class="featured-card-tags">
        ${p.tags.slice(0,4).map(t => `<span class="tag">${t}</span>`).join('')}
      </div>`;

    card.addEventListener('click', () => {
      window.location.href = `game.html?category=${p.category}&open=${p.id}`;
    });

    grid.appendChild(card);
  });
}

// ─── LOADING SCREEN ─────────────────────────────────────────
function initLoadingScreen() {
  const screen = document.getElementById('loading-screen');
  if (!screen) return;

  setTimeout(() => {
    screen.classList.add('fade-out');
    setTimeout(() => screen.remove(), 600);
  }, 1800);
}

// ─── CURSOR GLOW ────────────────────────────────────────────
function initCursorGlow() {
  const glow = document.createElement('div');
  glow.style.cssText = `
    position:fixed;pointer-events:none;z-index:9999;
    width:300px;height:300px;border-radius:50%;
    background:radial-gradient(circle,rgba(124,92,252,0.06),transparent 70%);
    transform:translate(-50%,-50%);
    transition:opacity 0.3s ease;
  `;
  document.body.appendChild(glow);

  let mx = 0, my = 0;
  window.addEventListener('mousemove', (e) => {
    mx = e.clientX; my = e.clientY;
  });

  const updateGlow = () => {
    glow.style.left = mx + 'px';
    glow.style.top  = my + 'px';
    requestAnimationFrame(updateGlow);
  };
  updateGlow();
}

// ─── SKILL BARS ANIMATION ───────────────────────────────────
function initSkillBars() {
  const bars = document.querySelectorAll('.skill-bar-fill');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animated');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });
  bars.forEach(b => observer.observe(b));
}

// ─── INIT ALL ───────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initLoadingScreen();
  initNav();
  initCounters();
  initFloatingIcons();
  initSearch();
  renderCategoryCards();
  renderFeaturedProjects();
  initScrollReveal();
  initCursorGlow();
  initSkillBars();

  // Particle system (only on landing page)
  if (document.getElementById('particle-canvas')) {
    new ParticleSystem('particle-canvas');
  }

  // Check for search query from URL
  const params = new URLSearchParams(window.location.search);
  const searchQ = params.get('q');
  if (searchQ) {
    const searchInput = document.getElementById('global-search');
    if (searchInput) {
      searchInput.value = searchQ;
      searchInput.dispatchEvent(new Event('input'));
    }
  }
});
