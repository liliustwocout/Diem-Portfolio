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

function renderGrid() {
  grid.innerHTML = projects.map((p, i) => `
    <a class="project-card" href="/project-${i + 1}" data-route="/project-${i + 1}">
      <div class="project-thumb"><img src="${p.coverThumb || p.coverImage}" alt="${p.title}" loading="lazy" /></div>
      <div class="project-meta">
        <span class="project-num">DỰ ÁN ${String(i + 1).padStart(2, '0')}</span>
        <span class="project-name">${p.title}</span>
      </div>
    </a>`).join('');
  grid.querySelectorAll('a').forEach(a => a.addEventListener('click', e => {
    e.preventDefault();
    navigateTo(a.dataset.route);
  }));
}

function navigateTo(url, push = true) {
  if (push) history.pushState(null, '', url);
  handleRoute();
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
    document.title = `${p.title} — Trần Phương Diễm`;
    window.scrollTo(0, 0);
  } else {
    projectView.classList.add('hidden');
    homeView.classList.remove('hidden');
    document.title = 'Trần Phương Diễm — Portfolio Thiết kế Đồ hoạ (HAU 2023 - 2027)';
  }
}

document.getElementById('project-back-btn').addEventListener('click', () => {
  navigateTo('/');
  document.getElementById('works').scrollIntoView();
});
topBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
window.addEventListener('scroll', () => topBtn.classList.toggle('visible', window.scrollY > 400), { passive: true });
window.addEventListener('popstate', handleRoute);

fetch('/data/projects.json').then(r => r.json()).then(data => {
  projects = data;
  renderGrid();
  handleRoute();
});
