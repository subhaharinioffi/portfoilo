/* ============================================================
   SUBHAHARINI — Portfolio Script v4
   Scroll progress · Side dots · Unique Page Active Reveals · Interactions
   ============================================================ */

/* ── Scroll progress bar ───────────────────────────────────── */
const progressBar = document.getElementById('scroll-progress');
function updateProgress() {
  const scrollTop  = window.scrollY;
  const docHeight  = document.documentElement.scrollHeight - window.innerHeight;
  const pct        = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  progressBar.style.width = pct + '%';
}
window.addEventListener('scroll', updateProgress, { passive: true });

/* ── Nav scroll effect ─────────────────────────────────────── */
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 50);
}, { passive: true });

/* ── Mobile nav ────────────────────────────────────────────── */
const hamburger      = document.getElementById('hamburger');
const navMobile      = document.getElementById('nav-mobile');
const navMobileClose = document.getElementById('nav-mobile-close');

hamburger.addEventListener('click', () => {
  navMobile.classList.add('open');
  hamburger.setAttribute('aria-expanded', 'true');
  document.body.style.overflow = 'hidden';
});

function closeNav() {
  navMobile.classList.remove('open');
  hamburger.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
}
navMobileClose.addEventListener('click', closeNav);
navMobile.querySelectorAll('.mobile-link').forEach(l => l.addEventListener('click', closeNav));

/* ── Unique Page-Active Reveal Observer ────────────────────── */
const revealSections = document.querySelectorAll('section[id]');
const pageActiveObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('page-active');
    } else {
      e.target.classList.remove('page-active');
    }
  });
}, { threshold: 0.18, rootMargin: '-8% 0px -8% 0px' });
revealSections.forEach(s => pageActiveObs.observe(s));

/* ── Side dot navigation active update ─────────────────────── */
const sideDots   = document.querySelectorAll('.side-dot');
const sectionIds = ['home', 'about', 'skills', 'projects', 'achievements', 'experience', 'contact'];

function updateActiveDot() {
  let current = 'home';
  sectionIds.forEach(id => {
    const sec = document.getElementById(id);
    if (sec) {
      const rect = sec.getBoundingClientRect();
      if (rect.top <= window.innerHeight * 0.45) current = id;
    }
  });
  sideDots.forEach(dot => {
    dot.classList.toggle('active', dot.dataset.section === current);
  });
}
window.addEventListener('scroll', updateActiveDot, { passive: true });
updateActiveDot();

/* ── Active nav link indicator ─────────────────────────────── */
const sectionObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    document.querySelectorAll('.nav-links a').forEach(link => {
      link.style.color = '';
      if (link.getAttribute('href') === `#${e.target.id}`) {
        link.style.color = 'var(--gold-deep)';
      }
    });
  });
}, { threshold: 0.35 });
revealSections.forEach(s => sectionObs.observe(s));

/* ── Button ripple effect ──────────────────────────────────── */
const rippleKF = document.createElement('style');
rippleKF.textContent = `@keyframes rippleAnim { to { transform:scale(1); opacity:0; } }`;
document.head.appendChild(rippleKF);

document.querySelectorAll('.btn').forEach(btn => {
  btn.addEventListener('click', function(e) {
    const ripple = document.createElement('span');
    const rect   = this.getBoundingClientRect();
    const size   = Math.max(rect.width, rect.height) * 2;
    ripple.style.cssText = `
      position:absolute; border-radius:50%; pointer-events:none;
      width:${size}px; height:${size}px;
      left:${e.clientX - rect.left - size/2}px;
      top:${e.clientY - rect.top  - size/2}px;
      background:rgba(255,255,255,0.22);
      transform:scale(0); animation:rippleAnim 0.55s ease-out forwards;
    `;
    this.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  });
});

/* ── Hero portrait subtle parallax ────────────────────────── */
const portraitSide = document.querySelector('.hero-photo-side');
if (portraitSide) {
  window.addEventListener('scroll', () => {
    if (window.scrollY < window.innerHeight) {
      portraitSide.style.transform = `translateY(${window.scrollY * 0.05}px)`;
    }
  }, { passive: true });
}

/* ── Mesh blobs subtle mouse-track parallax ────────────────── */
const heroSection = document.querySelector('.hero');
const meshBlobs   = document.querySelectorAll('.mesh-blob');

if (heroSection && meshBlobs.length) {
  heroSection.addEventListener('mousemove', e => {
    const { left, top, width, height } = heroSection.getBoundingClientRect();
    const xRatio = (e.clientX - left) / width  - 0.5;
    const yRatio = (e.clientY - top)  / height - 0.5;
    meshBlobs.forEach((blob, i) => {
      const depth = 22 + (i * 14);
      blob.style.transform = `translate(${xRatio * depth}px, ${yRatio * depth}px)`;
    });
  });
  heroSection.addEventListener('mouseleave', () => {
    meshBlobs.forEach(blob => blob.style.transform = '');
  });
}

/* ── Skill chip hover effects ──────────────────────────────── */
document.querySelectorAll('.skill-chip').forEach(chip => {
  chip.addEventListener('mouseenter', () => {
    chip.style.boxShadow = '0 4px 12px rgba(179,138,43,0.18)';
  });
  chip.addEventListener('mouseleave', () => {
    chip.style.boxShadow = '';
  });
});

/* ── Nav logo hover ────────────────────────────────────────── */
const navLogo = document.querySelector('.nav-logo');
if (navLogo) {
  navLogo.addEventListener('mouseenter', () => { navLogo.style.letterSpacing = '0.08em'; navLogo.style.transition = 'letter-spacing 0.3s ease'; });
  navLogo.addEventListener('mouseleave', () => { navLogo.style.letterSpacing = '0.02em'; });
}

/* ── Console branding ──────────────────────────────────────── */
console.log(
  '%c Subhaharini | Portfolio Booklet ',
  'background:linear-gradient(135deg,#b38a2b,#cda84b,#e3c56c);color:#1a150e;font-size:16px;font-weight:900;padding:8px 18px;border-radius:6px;'
);
console.log('%c ✦ Full Stack Developer — Open to Opportunities ✦', 'color:#75560c;font-size:13px;font-style:italic;');
