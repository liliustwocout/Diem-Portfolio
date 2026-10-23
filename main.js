let projects = [];

// Lấy màu pixel mép ảnh làm màu nền khung (tránh viền trắng 2 bên)
function tintPage(img) {
  const apply = () => {
    try {
      const c = document.createElement('canvas');
      c.width = c.height = 1;
      const ctx = c.getContext('2d');
      ctx.drawImage(img, 0, 0, 4, 4, 0, 0, 1, 1);
      const [r, g, b] = ctx.getImageData(0, 0, 1, 1).data;
      img.parentElement.style.background = `rgb(${r},${g},${b})`;
      if (img.closest('#about')) document.getElementById('works').style.background = `rgb(${r},${g},${b})`;
    } catch (e) { /* bỏ qua */ }
  };
  img.complete ? apply() : img.addEventListener('load', apply);
}
document.querySelectorAll('.page img').forEach(tintPage);
const homeView = document.getElementById('home-view');
const projectView = document.getElementById('project-view');
const grid = document.getElementById('projects-grid');
const list = document.getElementById('pj-pages-list');
const topBtn = document.getElementById('back-to-top-btn');

// Hiện dần khi cuộn
const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
const io = new IntersectionObserver(entries => entries.forEach(en => {
  if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
}), { threshold: 0.12 });
function reveal(els) {
  els.forEach((el, i) => {
    if (reduceMotion) return;
    el.classList.add('reveal');
    el.style.setProperty('--d', `${(i % 3) * 90}ms`);
    io.observe(el);
  });
}
reveal(document.querySelectorAll('.works-head, .works-footer'));


function renderGrid() {
  grid.innerHTML = projects.map((p, i) => `
    <a class="project-card" href="/project-${i + 1}" data-route="/project-${i + 1}">
      <div class="project-thumb"><img src="${p.coverThumb || p.coverImage}" alt="${p.title}" loading="lazy" /></div>
      <div class="project-meta">
        <span class="project-num">DỰ ÁN ${String(i + 1).padStart(2, '0')}</span>
        <span class="project-name">${p.title}</span>
      </div>
    </a>`).join('');
  reveal(grid.querySelectorAll('.project-card'));
  grid.querySelectorAll('a').forEach(a => a.addEventListener('click', e => {
    e.preventDefault();
    document.querySelectorAll('[style*="view-transition-name"]').forEach(x => x.style.viewTransitionName = '');
    a.querySelector('img').style.viewTransitionName = 'cover';
    navigateTo(a.dataset.route);
  }));
}

function navigateTo(url, push = true) {
  const go = () => { if (push) history.pushState(null, '', url); handleRoute(); };
  if (document.startViewTransition && !reduceMotion) document.startViewTransition(go);
  else go();
}

function handleRoute() {
  const m = location.pathname.match(/^\/project-(\d+)\/?$/);
  const p = m && projects[parseInt(m[1], 10) - 1];
  if (p) {
    homeView.classList.add('hidden');
    projectView.classList.remove('hidden');
    list.innerHTML = p.pages.map((src, i) =>
      `<div class="page"><img src="${src}" alt="${p.title} - trang ${i + 1}" loading="${i < 2 ? 'eager' : 'lazy'}" /></div>`).join('');
    list.querySelectorAll('img').forEach(tintPage);
    const imgs = list.querySelectorAll('img');
    if (imgs[0] && document.querySelector('.project-thumb img[style*="cover"]')) imgs[0].style.viewTransitionName = 'cover';
    reveal([...imgs].slice(1));
    document.title = `${p.title} — Trần Phương Diễm`;
    window.scrollTo(0, 0);
  } else {
    const fromProject = !projectView.classList.contains('hidden');
    projectView.classList.add('hidden');
    homeView.classList.remove('hidden');
    if (fromProject) document.getElementById('works').scrollIntoView({ behavior: 'instant' });
    document.title = 'Trần Phương Diễm — Portfolio Thiết kế Đồ hoạ (HAU 2023 - 2027)';
  }
}

document.getElementById('project-back-btn').addEventListener('click', () => navigateTo('/'));
topBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
window.addEventListener('scroll', () => topBtn.classList.toggle('visible', window.scrollY > 400), { passive: true });
// Tilt 3D + ánh sáng loé cho thẻ dự án (chỉ khi có chuột)
if (matchMedia('(hover: hover) and (pointer: fine)').matches && !reduceMotion) {
  grid.addEventListener('pointermove', e => {
    const t = e.target.closest('.project-thumb');
    if (!t) return;
    const r = t.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
    t.classList.add('tilting');
    t.style.transform = `perspective(900px) rotateX(${(0.5 - y) * 9}deg) rotateY(${(x - 0.5) * 11}deg) translateY(-4px) scale(1.02)`;
    t.style.setProperty('--gx', `${x * 100}%`);
    t.style.setProperty('--gy', `${y * 100}%`);
  });
  grid.addEventListener('pointerout', e => {
    const t = e.target.closest('.project-thumb');
    if (!t || t.contains(e.relatedTarget)) return;
    t.classList.remove('tilting');
    t.style.transform = '';
  });
}

// Trang trí hai bên trang chủ
const sideDeco = document.querySelector('.side-deco');
const phrase = 'TRẦN PHƯƠNG DIỄM • GRAPHIC DESIGNER • ';
document.querySelectorAll('.sd-track').forEach(t => { t.textContent = phrase.repeat(8); });
const petals = document.querySelector('.sd-petals');
for (let i = 0; i < 14; i++) {
  const s = document.createElement('span');
  const left = i % 2 === 0;
  const pos = `calc(var(--g) * ${(0.15 + Math.random() * 0.7).toFixed(2)})`;
  s.style[left ? 'left' : 'right'] = pos;
  s.style.cssText += `;--s:${8 + Math.random() * 10}px;--t:${14 + Math.random() * 12}s;--dl:${-Math.random() * 20}s;--dx:${(Math.random() - 0.5) * 80}px;--r:${(Math.random() > 0.5 ? 1 : -1) * (180 + Math.random() * 360)}deg`;
  petals.appendChild(s);
}
// Ẩn phần trang trí khi cuộn tới khu chọn dự án (không còn khoảng trống hai bên)
new IntersectionObserver(([en]) => sideDeco.classList.toggle('off', en.intersectionRatio > 0.4), { threshold: [0, 0.4, 0.6] })
  .observe(document.getElementById('works'));

window.addEventListener('popstate', handleRoute);

// Ruy băng tự vẽ theo tiến độ cuộn (làm mượt bằng nội suy)
const ribbons = document.querySelector('.ribbons');
let rbCur = 0;
(function tick() {
  const max = document.documentElement.scrollHeight - innerHeight;
  const target = max > 0 ? Math.min(1, scrollY / max) : 0;
  rbCur += (target - rbCur) * 0.08;
  ribbons.style.setProperty('--p', (0.06 + rbCur * 0.94).toFixed(4));
  requestAnimationFrame(tick);
})();

fetch('/data/projects.json').then(r => r.json()).then(data => {
  projects = data;
  renderGrid();
  handleRoute();
});
