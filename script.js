(function () {
  'use strict';

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isTouch = window.matchMedia('(hover: none), (pointer: coarse)').matches;
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => Array.from(c.querySelectorAll(s));

  
  const icon = {
    hack:   '<path d="M8 3H4a1 1 0 0 0-1 1v4M16 3h4a1 1 0 0 1 1 1v4M8 21H4a1 1 0 0 1-1-1v-4M16 21h4a1 1 0 0 0 1-1v-4M9 9l3 3-3 3M13 15h2" stroke="currentColor" stroke-width="1.6" fill="none" stroke-linecap="round" stroke-linejoin="round"/>',
    net:    '<circle cx="6" cy="6" r="2.4" stroke="currentColor" stroke-width="1.6" fill="none"/><circle cx="18" cy="6" r="2.4" stroke="currentColor" stroke-width="1.6" fill="none"/><circle cx="12" cy="18" r="2.4" stroke="currentColor" stroke-width="1.6" fill="none"/><path d="M7.6 7.6 11 15M16.4 7.6 13 15M8 6h8" stroke="currentColor" stroke-width="1.6"/>',
    forensic:'<circle cx="10" cy="10" r="6" stroke="currentColor" stroke-width="1.6" fill="none"/><path d="m20 20-5.6-5.6M10 7v6M7 10h6" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>',
    ai:     '<rect x="6" y="6" width="12" height="12" rx="2.5" stroke="currentColor" stroke-width="1.6" fill="none"/><path d="M9 2v3M15 2v3M9 19v3M15 19v3M2 9h3M2 15h3M19 9h3M19 15h3M10 10h4v4h-4z" stroke="currentColor" stroke-width="1.4"/>',
    web:    '<circle cx="12" cy="12" r="8.5" stroke="currentColor" stroke-width="1.6" fill="none"/><path d="M3.5 12h17M12 3.5c2.5 2.5 2.5 14 0 17M12 3.5c-2.5 2.5-2.5 14 0 17" stroke="currentColor" stroke-width="1.4" fill="none"/>',
    crypto: '<rect x="5" y="10" width="14" height="10" rx="2" stroke="currentColor" stroke-width="1.6" fill="none"/><path d="M8 10V7a4 4 0 0 1 8 0v3M12 14v2.5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>',
    ctf:    '<path d="M5 4v16M5 5h11l-2 3 2 3H5" stroke="currentColor" stroke-width="1.6" fill="none" stroke-linejoin="round"/>',
    cloud:  '<path d="M7 18a4 4 0 0 1-.3-8A5 5 0 0 1 16 8.5a3.5 3.5 0 0 1 1 6.9" stroke="currentColor" stroke-width="1.6" fill="none" stroke-linecap="round"/><path d="M12 13v6M9.5 16.5 12 19l2.5-2.5" stroke="currentColor" stroke-width="1.6" fill="none" stroke-linecap="round" stroke-linejoin="round"/>',
    github: '<path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.9-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.9 1.53 2.34 1.09 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02a9.5 9.5 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0 0 12 2Z" fill="currentColor"/>',
    linkedin:'<path d="M4.98 3.5a2 2 0 1 1 0 4 2 2 0 0 1 0-4ZM3 9h4v12H3zM10 9h3.8v1.7h.05c.53-1 1.83-2.05 3.77-2.05C21.4 8.65 22 11 22 14.3V21h-4v-5.9c0-1.4 0-3.2-2-3.2s-2.3 1.5-2.3 3.1V21h-4z" fill="currentColor"/>'
  };
  const svg = (p, s = 24) => `<svg viewBox="0 0 24 24" width="${s}" height="${s}" fill="none" aria-hidden="true">${p}</svg>`;

  
  const DOMAINS = [
    { id: '01', name: 'Ethical Hacking',   short: 'Offensive Security',  ic: icon.hack },
    { id: '02', name: 'Network Security',  short: 'Protocols & Defense', ic: icon.net },
    { id: '03', name: 'Digital Forensics', short: 'Incident Response',   ic: icon.forensic },
    { id: '04', name: 'AI Security',       short: 'Intelligent Defense', ic: icon.ai },
    { id: '05', name: 'Web Security',      short: 'App & Auth',          ic: icon.web },
    { id: '06', name: 'Cryptography',      short: 'Encryption & Hashing',ic: icon.crypto },
    { id: '07', name: 'CTF & Competitive', short: 'Capture The Flag',    ic: icon.ctf },
    { id: '08', name: 'Cloud Security',    short: 'Infra & Identity',    ic: icon.cloud }
  ];

  const LAB = [
    { key: 'NETWORK LAB',       desc: 'Packet capture, protocol analysis, intrusion detection and traffic monitoring in a sandboxed range.', bars: [['UPTIME', 96], ['COVERAGE', 88], ['ALERTS TUNED', 74]], skills: ['WIRESHARK', 'NMAP', 'IDS/IPS', 'ROUTING', 'FIREWALLS'] },
    { key: 'FORENSICS LAB',     desc: 'Disk and memory imaging, timeline reconstruction and evidence handling for incident response.', bars: [['ARTIFACTS', 82], ['CHAIN OF CUSTODY', 100], ['CASES CLOSED', 67]], skills: ['MEMORY', 'DISK IMAGING', 'LOG ANALYSIS', 'TIMELINE'] },
    { key: 'WEB SECURITY LAB',  desc: 'Deliberately vulnerable apps for practicing OWASP Top 10 in a fully isolated environment.', bars: [['OWASP COVERED', 90], ['PAYLOAD LIBRARY', 78], ['AUTH HARDENING', 85]], skills: ['XSS', 'SQLi', 'CSRF', 'JWT', 'SSRF'] },
    { key: 'AI SECURITY LAB',   desc: 'Adversarial ML, prompt-injection research and model hardening on curated datasets.', bars: [['MODELS TESTED', 71], ['ROBUSTNESS', 63], ['DETECTION', 80]], skills: ['ADVERSARIAL', 'PROMPT INJ', 'ML PIPELINES', 'RED TEAM'] },
    { key: 'CTF ARENA',         desc: 'A rotating set of challenges spanning every category to sharpen practical instincts.', bars: [['CHALLENGES', 82], ['ACTIVE PLAYERS', 94], ['FLAGS CAPTURED', 76]], skills: ['WEB', 'CRYPTO', 'FORENSICS', 'REVERSE ENG', 'NETWORKING'] }
  ];

  const CTF = [
    { cat: 'WEB',            name: 'CHALLENGE_01', diff: 'medium', locked: true },
    { cat: 'CRYPTO',         name: 'CHALLENGE_02', diff: 'hard',   locked: true },
    { cat: 'FORENSICS',      name: 'CHALLENGE_03', diff: 'easy',   locked: false },
    { cat: 'OSINT',          name: 'CHALLENGE_04', diff: 'medium', locked: true },
    { cat: 'REVERSE ENG',    name: 'CHALLENGE_05', diff: 'hard',   locked: true },
    { cat: 'NETWORKING',     name: 'CHALLENGE_06', diff: 'easy',   locked: false }
  ];

  const LEADERBOARD = [
    ['01', 'NOVA', 980], ['02', 'CODE_BREAKERS', 860],
    ['03', 'ROOT_ACCESS', 790], ['04', 'NULL_POINTER', 720],
    ['05', 'ERROR_404', 655]
  ];

  const PROJECTS = [
    { title: 'CYBER AI',  cat: 'AI / SECURITY',       img: 'assets/images/project-sentinel.png',  desc: 'AI-assisted security monitoring concept that flags anomalies across a simulated network in real time.', tags: ['AI', 'Security', 'Python'] },
    { title: 'PHISHGUARD',   cat: 'CYBERSECURITY / WEB',  img: 'assets/images/project-phishguard.png', desc: 'Phishing awareness and detection platform with interactive training and a URL reputation demo.', tags: ['Cybersecurity', 'Web'] },
    { title: 'NETWATCH',     cat: 'NETWORKING / SECURITY',img: 'assets/images/project-netwatch.png',   desc: 'Network monitoring dashboard visualising live traffic, active hosts and threat indicators.', tags: ['Networking', 'Security'] },
    { title: 'FORENSIX',     cat: 'FORENSICS / SECURITY', img: 'assets/images/project-forensix.png',   desc: 'Digital forensic analysis toolkit concept for evidence triage and timeline reconstruction.', tags: ['Forensics', 'Security'] }
  ];

  const ACHIEVEMENTS = [
    { year: '2026', title: 'CyberNova CTF',            desc: 'Our flagship internal capture-the-flag with challenges spanning web, crypto, forensics and reversing.' },
    { year: '2026', title: 'Cybersecurity Workshop',   desc: 'Hands-on sessions on ethical hacking, network defense and secure development fundamentals.' },
    { year: '2025', title: 'Hackathon Participation',  desc: 'Teams represented CyberNova at regional and national hackathons with security-focused builds.' },
    { year: '2025', title: 'Security Awareness Campaign', desc: 'A campus-wide initiative on phishing, password hygiene and safe digital practices.' }
  ];

  const TEAM = [
    { name: 'Sam',    role: 'President',          in: 'AM' },
    { name: 'Hari',     role: 'Vice President',     in: 'PN' },
    { name: 'Olivia',   role: 'Security Lead',      in: 'KI' },
    { name: 'Gokul',    role: 'CTF Lead',           in: 'RV' },
    { name: 'Manikandan',     role: 'AI Security Lead',   in: 'IR' },
    { name: 'Valliyammai',   role: 'Web Security Lead',  in: 'SP' },
    { name: 'Indra',  role: 'Research Lead',      in: 'AS' },
    { name: 'Krishnan', role: 'Events Lead',        in: 'MK' }
  ];

  function renderDomains() {
    const grid = $('#domainGrid'); if (!grid) return;
    grid.innerHTML = DOMAINS.map(d => `
      <article class="domain-card hoverable" data-reveal>
        <span class="dc-id">[${d.id}]</span>
        <span class="dc-icon">${svg(d.ic, 30)}</span>
        <h3 class="dc-name">${d.name}</h3>
        <span class="dc-short">${d.short}</span>
        <span class="dc-status">STATUS: <b>ACTIVE</b></span>
        <span class="dc-access">ACCESS MODULE &rarr;</span>
      </article>`).join('');
  }

  function renderLab() {
    const tabs = $('#labTabs'), view = $('#labView'); if (!tabs) return;
    tabs.innerHTML = LAB.map((m, i) => `
      <button class="lab-tab hoverable${i === 0 ? ' active' : ''}" role="tab" data-i="${i}" aria-selected="${i === 0}">
        <span>${m.key}</span><span class="tstat">● LIVE</span>
      </button>`).join('');

    function paint(i) {
      const m = LAB[i];
      view.innerHTML = `
        <h3>MODULE: ${m.key}</h3>
        <p class="lv-desc">${m.desc}</p>
        <div class="lab-bars">
          ${m.bars.map(b => `
            <div class="lab-bar"><span>${b[0]}<em>${b[1]}%</em></span>
            <div class="track"><div class="fill" data-w="${b[1]}"></div></div></div>`).join('')}
        </div>
        <div class="lab-skills">${m.skills.map(s => `<span>${s}</span>`).join('')}</div>`;
      requestAnimationFrame(() => $$('.fill', view).forEach(f => { f.style.width = f.dataset.w + '%'; }));
    }
    paint(0);
    tabs.addEventListener('click', e => {
      const btn = e.target.closest('.lab-tab'); if (!btn) return;
      $$('.lab-tab', tabs).forEach(t => { t.classList.remove('active'); t.setAttribute('aria-selected', 'false'); });
      btn.classList.add('active'); btn.setAttribute('aria-selected', 'true');
      paint(+btn.dataset.i);
    });
  }

  function renderCTF() {
    const grid = $('#ctfGrid'); if (grid) {
      grid.innerHTML = CTF.map(c => `
        <article class="ctf-card hoverable">
          <div class="ctf-cat">${c.cat}</div>
          <div class="ctf-name">${c.name}</div>
          <div class="ctf-meta">
            <span class="ctf-diff ${c.diff}">DIFFICULTY: ${c.diff.toUpperCase()}</span>
            <span class="ctf-lock">${c.locked ? '🔒 LOCKED' : '● OPEN'}</span>
          </div>
          <button class="ctf-view hoverable">[ VIEW CHALLENGE ]</button>
        </article>`).join('');
      grid.addEventListener('click', e => {
        const b = e.target.closest('.ctf-view'); if (!b) return;
        b.textContent = '[ ACCESS RESTRICTED — DEMO ]';
        setTimeout(() => { b.textContent = '[ VIEW CHALLENGE ]'; }, 1600);
      });
    }
    const lb = $('#lbList'); if (lb) {
      lb.innerHTML = LEADERBOARD.map(r => `
        <li><span class="lb-rank">${r[0]}</span><span class="lb-team">${r[1]}</span><span class="lb-score">${r[2]}</span></li>`).join('');
    }
  }

  function renderProjects() {
    const grid = $('#projectGrid'); if (!grid) return;
    grid.innerHTML = PROJECTS.map(p => `
      <article class="project-card hoverable" data-reveal>
        <div class="pc-media"><span class="pc-scan"></span>
          <img src="${p.img}" alt="${p.title} — ${p.cat} project visual" loading="lazy" />
        </div>
        <div class="pc-body">
          <span class="pc-cat">${p.cat}</span>
          <h3 class="pc-title">${p.title}</h3>
          <p class="pc-desc">${p.desc}</p>
          <div class="pc-tags">${p.tags.map(t => `<span>${t}</span>`).join('')}</div>
          <span class="pc-link">VIEW PROJECT <span class="arr">&rarr;</span></span>
        </div>
      </article>`).join('');
  }

  function renderTimeline() {
    const tl = $('#timeline'); if (!tl) return;
    tl.innerHTML = ACHIEVEMENTS.map((a, i) => `
      <li class="tl-item" data-reveal style="--reveal-delay:${i * 80}ms">
        <span class="tl-node"></span>
        <span class="tl-year">${a.year}</span>
        <h3 class="tl-title">${a.title}</h3>
        <p class="tl-desc">${a.desc}</p>
      </li>`).join('');
  }

  function renderTeam() {
    const grid = $('#teamGrid'); if (!grid) return;
    grid.innerHTML = TEAM.map((m, i) => `
      <article class="team-card hoverable" data-reveal style="--reveal-delay:${(i % 4) * 70}ms">
        <div class="tc-top">
          <span class="tc-corner">ID_${String(i + 1).padStart(2, '0')}</span>
          <span class="tc-corner r">● CLEARED</span>
          <span class="tc-avatar" aria-hidden="true">${m.in}</span>
        </div>
        <div class="tc-body">
          <div class="tc-name">${m.name}</div>
          <div class="tc-role">${m.role}</div>
          <div class="tc-social">
            <a href="#" aria-label="${m.name} GitHub">${svg(icon.github, 18)}</a>
            <a href="#" aria-label="${m.name} LinkedIn">${svg(icon.linkedin, 18)}</a>
          </div>
        </div>
      </article>`).join('');
  }

  function renderMapPings() {
    const c = $('#mapPings'); if (!c) return;
    const pts = [[22, 32], [38, 55], [54, 28], [68, 60], [80, 40], [46, 72], [30, 62], [72, 24]];
    c.innerHTML = pts.map((p, i) => {
      const warn = i % 4 === 0 ? ' warn' : '';
      return `<span class="ping${warn}" style="left:${p[0]}%;top:${p[1]}%;animation-delay:${(i * 0.35).toFixed(2)}s"></span>`;
    }).join('');
    $$('.ping', c).forEach(p => {
      const a = p.querySelector; // noop
    });
    // stagger the ::after via inline delay isn't possible; use nth animationDelay through style
    $$('.ping', c).forEach((p, i) => { p.style.setProperty('--pd', (i * 0.35) + 's'); });
  }

  /* =====================================================
     NAV
     ===================================================== */
  function initNav() {
    const nav = $('#nav'), ham = $('#hamburger'), menu = $('#mobileMenu');
    const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 30);
    onScroll(); window.addEventListener('scroll', onScroll, { passive: true });

    const close = () => { menu.classList.remove('open'); ham.classList.remove('open'); ham.setAttribute('aria-expanded', 'false'); menu.setAttribute('aria-hidden', 'true'); };
    ham.addEventListener('click', () => {
      const open = menu.classList.toggle('open');
      ham.classList.toggle('open', open);
      ham.setAttribute('aria-expanded', String(open));
      menu.setAttribute('aria-hidden', String(!open));
    });
    $$('a', menu).forEach(a => a.addEventListener('click', close));

    // Scroll-spy
    const links = $$('.nav-links a');
    const map = {};
    links.forEach(l => { const id = l.getAttribute('href').slice(1); map[id] = l; });
    const spy = new IntersectionObserver(ents => {
      ents.forEach(e => {
        if (e.isIntersecting) {
          links.forEach(l => l.classList.remove('active'));
          const l = map[e.target.id]; if (l) l.classList.add('active');
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    ['home', 'about', 'domains', 'lab', 'projects', 'team', 'contact'].forEach(id => {
      const el = document.getElementById(id); if (el) spy.observe(el);
    });
  }

  
  function initReveal() {
    const items = $$('[data-reveal]');
    if (reduceMotion) { items.forEach(i => i.classList.add('visible')); return; }
    const io = new IntersectionObserver(ents => {
      ents.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); } });
    }, { threshold: 0.12 });
    // Re-query because grids render after; observe now:
    $$('[data-reveal]').forEach(i => io.observe(i));
  }

  function animateCount(el, target, suffix) {
    if (reduceMotion) { el.textContent = target + (suffix || ''); return; }
    const dur = 1600, t0 = performance.now();
    const step = now => {
      const p = Math.min((now - t0) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(target * eased) + (suffix || '');
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }
  function initCounters() {
    const io = new IntersectionObserver(ents => {
      ents.forEach(e => {
        if (!e.isIntersecting) return;
        const el = e.target;
        if (el.classList.contains('counter')) animateCount(el, +el.dataset.target, el.dataset.suffix);
        if (el.classList.contains('tick')) animateCount(el, +el.dataset.to, '');
        io.unobserve(el);
      });
    }, { threshold: 0.5 });
    $$('.counter, .tick').forEach(el => io.observe(el));
  }

  
  function initTyping() {
    const el = $('#typeTerminal'); if (!el) return;
    const lines = [
      { t: '> Establishing secure connection...', ok: false },
      { t: '> Authenticating CyberNova node...', ok: false },
      { t: '> Handshake complete.', ok: true },
      { t: '> Access granted.', ok: true }
    ];
    if (reduceMotion) {
      el.innerHTML = lines.map(l => `<span class="${l.ok ? 'ok' : ''}">${l.t}</span>`).join('\n');
      return;
    }
    let li = 0, ci = 0;
    const caret = '<span class="caret">▋</span>';
    function type() {
      if (li >= lines.length) { el.innerHTML = el.innerHTML.replace(caret, '') + '\n' + caret; return; }
      const line = lines[li];
      const done = el.dataset.done || '';
      const partial = line.t.slice(0, ci);
      el.innerHTML = done + `<span class="${line.ok ? 'ok' : ''}">${partial}</span>` + caret;
      ci++;
      if (ci > line.t.length) {
        el.dataset.done = done + `<span class="${line.ok ? 'ok' : ''}">${line.t}</span>\n`;
        li++; ci = 0;
        setTimeout(type, 420);
      } else {
        setTimeout(type, 26);
      }
    }
    setTimeout(type, 600);
  }

  function initBootLine() {
    const el = $('#bootLine'); if (!el || reduceMotion) return;
    const msgs = [
      '> INITIALIZING CYBERNOVA NETWORK...',
      '> LOADING SECURITY MODULES...',
      '> NODE ONLINE // MONITORING ACTIVE'
    ];
    let i = 0;
    setInterval(() => { i = (i + 1) % msgs.length; el.textContent = msgs[i]; }, 3200);
  }

  function initSOC() {
    const line = $('#socLine'), rate = $('#socRate'),
          fill = $('#threatFill'), tlab = $('#threatLabel');
    if (!line) return;
    const N = 40, W = 300, H = 90;
    let data = Array.from({ length: N }, () => 30 + Math.random() * 30);
    function draw() {
      const pts = data.map((v, i) => `${(i / (N - 1) * W).toFixed(1)},${(H - v).toFixed(1)}`).join(' ');
      line.setAttribute('points', pts);
      if (rate) rate.textContent = Math.round(data[N - 1] * 12) + ' kb/s';
    }
    draw();
    if (reduceMotion) return;
    setInterval(() => {
      data.push(20 + Math.random() * 55); data.shift(); draw();
    }, 900);

    // subtle threat level fluctuation
    const levels = [[18, 'LOW', 'ok'], [30, 'LOW', 'ok'], [46, 'GUARDED', 'warn'], [24, 'LOW', 'ok']];
    let li = 0;
    setInterval(() => {
      li = (li + 1) % levels.length; const [w, lab, cls] = levels[li];
      fill.style.width = w + '%';
      fill.style.background = cls === 'warn'
        ? 'linear-gradient(90deg,var(--warn),var(--cyan))'
        : 'linear-gradient(90deg,var(--ok),var(--cyan))';
      tlab.textContent = lab; tlab.className = cls;
    }, 4200);
  }

  
  function initAccess() {
    const form = $('#accessForm'), input = $('#accessInput'), msg = $('#accessMsg');
    if (!form) return;
    // clue: base of all binary (2), doubled -> "22", then "nova" => "22nova"
    const CODE = '22nova';
    form.addEventListener('submit', e => {
      e.preventDefault();
      const val = input.value.trim().toLowerCase();
      if (!val) { msg.textContent = 'SYSTEM: no input detected.'; msg.className = 'access-msg err'; return; }
      if (val === CODE) {
        msg.className = 'access-msg ok';
        msg.innerHTML = '';
        const box = $('.access-body');
        const ok = document.createElement('div');
        ok.className = 'access-granted';
        ok.innerHTML = '<b>ACCESS GRANTED</b><span>Welcome to the CyberNova Network, operator.</span>';
        box.appendChild(ok);
        form.reset();
      } else {
        msg.textContent = 'SYSTEM: access denied — try again...';
        msg.className = 'access-msg err';
        input.style.borderColor = 'var(--danger)';
        setTimeout(() => { input.style.borderColor = ''; }, 700);
      }
    });
  }

  
  function initContact() {
    const form = $('#contactForm'); if (!form) return;
    const success = $('#contactSuccess');
    const setErr = (id, text) => { const s = form.querySelector(`.err[data-for="${id}"]`); if (s) s.textContent = text || ''; };
    form.addEventListener('submit', e => {
      e.preventDefault();
      const name = $('#cName').value.trim();
      const email = $('#cEmail').value.trim();
      const message = $('#cMsg').value.trim();
      let ok = true;
      setErr('cName'); setErr('cEmail'); setErr('cMsg');
      if (name.length < 2) { setErr('cName', 'Identify yourself.'); ok = false; }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setErr('cEmail', 'Valid email required.'); ok = false; }
      if (message.length < 5) { setErr('cMsg', 'Message too short.'); ok = false; }
      if (!ok) return;
      form.querySelectorAll('.field, button[type="submit"]').forEach(el => el.style.display = 'none');
      success.hidden = false;
    });
  }

 
  function initCursor() {
    if (isTouch) return;
    const dot = $('#cursorDot'), ring = $('#cursorRing');
    let rx = 0, ry = 0, x = 0, y = 0;
    document.addEventListener('mousemove', e => {
      x = e.clientX; y = e.clientY;
      dot.style.transform = `translate(${x}px, ${y}px) translate(-50%,-50%)`;
    });
    (function loop() {
      rx += (x - rx) * 0.18; ry += (y - ry) * 0.18;
      ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%,-50%)`;
      requestAnimationFrame(loop);
    })();
    const hoverSel = 'a, button, .hoverable, input, textarea';
    document.addEventListener('mouseover', e => { if (e.target.closest(hoverSel)) ring.classList.add('grow'); });
    document.addEventListener('mouseout', e => { if (e.target.closest(hoverSel)) ring.classList.remove('grow'); });
  }

  
  function initNetwork() {
    const canvas = $('#networkCanvas'); if (!canvas || reduceMotion) return;
    const ctx = canvas.getContext('2d');
    let w, h, nodes = [], dpr = Math.min(window.devicePixelRatio || 1, 2);
    const mouse = { x: -9999, y: -9999 };

    function resize() {
      w = canvas.clientWidth = window.innerWidth;
      h = canvas.clientHeight = window.innerHeight;
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = w < 600 ? 26 : w < 1100 ? 46 : 70;
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * w, y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.28, vy: (Math.random() - 0.5) * 0.28,
        r: Math.random() * 1.6 + 0.6
      }));
    }
    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', e => { mouse.x = e.clientX; mouse.y = e.clientY; });
    window.addEventListener('mouseout', () => { mouse.x = -9999; mouse.y = -9999; });

    const LINK = 130;
    function frame() {
      ctx.clearRect(0, 0, w, h);
      for (const n of nodes) {
        n.x += n.vx; n.y += n.vy;
        if (n.x < 0 || n.x > w) n.vx *= -1;
        if (n.y < 0 || n.y > h) n.vy *= -1;
        // cursor attraction
        const dxm = mouse.x - n.x, dym = mouse.y - n.y;
        const dm = Math.hypot(dxm, dym);
        if (dm < 160) { n.x += dxm / dm * 0.4; n.y += dym / dm * 0.4; }
      }
      // links
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i], b = nodes[j];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < LINK) {
            const o = (1 - d / LINK) * 0.32;
            ctx.strokeStyle = `rgba(53,224,255,${o.toFixed(3)})`;
            ctx.lineWidth = 0.6;
            ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
          }
        }
      }
      // nodes
      for (const n of nodes) {
        ctx.beginPath(); ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(120,200,255,0.7)'; ctx.fill();
      }
      requestAnimationFrame(frame);
    }
    frame();
  }

  function init() {
    renderDomains();
    renderLab();
    renderCTF();
    renderProjects();
    renderTimeline();
    renderTeam();
    renderMapPings();

    initNav();
    initReveal();
    initCounters();
    initTyping();
    initBootLine();
    initSOC();
    initAccess();
    initContact();
    initCursor();
    initNetwork();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
