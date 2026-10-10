import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// ==========================================================================
// 1. INITIALIZE LENIS SMOOTH SCROLL (Chuẩn mực quán tính mượt mà)
// ==========================================================================
const lenis = new Lenis({
  duration: 1.25,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  orientation: 'vertical',
  gestureOrientation: 'vertical',
  smoothWheel: true,
  touchMultiplier: 1.5,
});

// Đồng bộ Lenis với GSAP ScrollTrigger
lenis.on('scroll', ScrollTrigger.update);

gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});
gsap.ticker.lagSmoothing(0);

// Nút cuộn mượt xuống phần dự án
document.getElementById('scroll-to-works')?.addEventListener('click', () => {
  lenis.scrollTo('#works', { offset: -60, duration: 1.5 });
});

// ==========================================================================
// 2. FILM GRAIN NOISE CANVAS (Tạo chất liệu hạt giấy mỹ thuật UAH)
// ==========================================================================
function initNoiseCanvas() {
  const canvas = document.getElementById('noise-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    generateNoise();
  }

  function generateNoise() {
    const w = canvas.width;
    const h = canvas.height;
    if (w === 0 || h === 0) return;
    const imgData = ctx.createImageData(w, h);
    const buffer32 = new Uint32Array(imgData.data.buffer);
    const len = buffer32.length;

    for (let i = 0; i < len; i++) {
      if (Math.random() < 0.15) {
        // Hạt bụi xám và ánh đỏ rất tinh tế
        const val = Math.floor(Math.random() * 255);
        buffer32[i] = (25 << 24) | (val << 16) | (val << 8) | val;
      }
    }
    ctx.putImageData(imgData, 0, 0);
  }

  window.addEventListener('resize', resize);
  resize();
}
initNoiseCanvas();

// ==========================================================================
// 3. REAL-TIME ARCHITECTURAL CLOCK (Giờ địa phương Sài Gòn GMT+7)
// ==========================================================================
function startLiveClock() {
  const timeEl = document.getElementById('live-time');
  if (!timeEl) return;
  function update() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    timeEl.textContent = `${hours}:${minutes}:${seconds}`;
  }
  update();
  setInterval(update, 1000);
}
startLiveClock();

// ==========================================================================
// 4. CUSTOM MAGNETIC CURSOR & FLOATING PREVIEW (Dennis Snellenberg Style)
// ==========================================================================
const cursorFollower = document.querySelector('.cursor-follower');
const cursorDot = document.querySelector('.cursor-dot');
const cursorText = document.querySelector('.cursor-text');
const floatingPreview = document.getElementById('floating-preview');
const floatingPreviewImg = document.getElementById('floating-preview-img');

let quickFollowerX = gsap.quickTo(cursorFollower, 'x', { duration: 0.35, ease: 'power3.out' });
let quickFollowerY = gsap.quickTo(cursorFollower, 'y', { duration: 0.35, ease: 'power3.out' });
let quickDotX = gsap.quickTo(cursorDot, 'x', { duration: 0.1, ease: 'power2.out' });
let quickDotY = gsap.quickTo(cursorDot, 'y', { duration: 0.1, ease: 'power2.out' });

// Floating image lag interpolation
let quickPreviewX = gsap.quickTo(floatingPreview, 'x', { duration: 0.5, ease: 'power3.out' });
let quickPreviewY = gsap.quickTo(floatingPreview, 'y', { duration: 0.5, ease: 'power3.out' });

window.addEventListener('mousemove', (e) => {
  const { clientX, clientY } = e;
  quickFollowerX(clientX);
  quickFollowerY(clientY);
  quickDotX(clientX);
  quickDotY(clientY);

  if (floatingPreview && floatingPreview.classList.contains('active')) {
    quickPreviewX(clientX + 20);
    quickPreviewY(clientY);
  }
});

function bindHoverTargets() {
  document.querySelectorAll('.hover-target').forEach((el) => {
    el.addEventListener('mouseenter', () => {
      document.body.classList.add('is-hovering-target');
      const text = el.getAttribute('data-cursor');
      if (text) {
        cursorText.textContent = text;
        cursorText.style.opacity = '1';
      }
    });
    el.addEventListener('mouseleave', () => {
      document.body.classList.remove('is-hovering-target');
      cursorText.textContent = 'xem ✿';
      cursorText.style.opacity = '0';
    });
  });
}
bindHoverTargets();

// ==========================================================================
// 5. PROJECTS DATA MANAGEMENT & RENDERING (7 Đồ án kiến trúc & đồ họa)
// ==========================================================================
let allProjects = [];
let currentFilter = 'all';
let currentProjectIndex = 0;

async function loadProjects() {
  try {
    const res = await fetch('/data/projects.json');
    allProjects = await res.json();
    renderProjects();
    setupFilters();
    setupViewToggle();
  } catch (err) {
    console.error('Lỗi khi tải dữ liệu dự án:', err);
  }
}

function renderProjects() {
  const filtered = currentFilter === 'all' 
    ? allProjects 
    : allProjects.filter(p => p.category.toLowerCase().includes(currentFilter.toLowerCase()) || 
                              p.tags?.some(t => t.toLowerCase().includes(currentFilter.toLowerCase())));

  renderListView(filtered);
  renderGridView(filtered);
  bindProjectInteractions();
  bindHoverTargets();
}

// Render List View (Kiểu Dennis Snellenberg)
function renderListView(projects) {
  const container = document.getElementById('projects-list-container');
  if (!container) return;

  container.innerHTML = projects.map((p, idx) => `
    <div class="project-list-row hover-target" data-index="${allProjects.indexOf(p)}" data-cover="${p.coverImage}" data-cursor="xem nè ✿">
      <span class="row-index font-cursive">✿ 0${idx + 1}</span>
      <h3 class="row-title">${p.title}</h3>
      <span class="row-category">${p.category}</span>
      <span class="row-year font-bold">${p.year}</span>
      <span class="row-arrow">&rarr;</span>
    </div>
  `).join('');
}

// Render Grid View (Gallery Cards)
function renderGridView(projects) {
  const container = document.getElementById('projects-grid-container');
  if (!container) return;

  container.innerHTML = projects.map((p, idx) => `
    <div class="project-card hover-target" data-index="${allProjects.indexOf(p)}" data-cursor="khám phá ✧">
      <div class="card-image-wrap">
        <img src="${p.coverImage}" alt="${p.title}" loading="lazy" />
      </div>
      <div class="card-content">
        <div class="card-meta">
          <span>✿ Đồ án 0${idx + 1}</span>
          <span>${p.year}</span>
        </div>
        <h3 class="card-title font-serif-italic">${p.title}</h3>
        <p class="card-summary">${p.summary}</p>
        <div class="card-footer">
          <div class="card-tags">
            ${(p.tags || [p.category]).map(t => `<span class="card-tag">${t}</span>`).join('')}
          </div>
          <span class="card-btn">Xem chi tiết ✿ &rarr;</span>
        </div>
      </div>
    </div>
  `).join('');
}

// Gắn các sự kiện tương tác hover và click mở modal
function bindProjectInteractions() {
  // List Hover: trôi ảnh preview theo chuột
  document.querySelectorAll('.project-list-row').forEach((row) => {
    row.addEventListener('mouseenter', (e) => {
      document.body.classList.add('is-hovering-project');
      const cover = row.getAttribute('data-cover');
      if (floatingPreviewImg && cover) {
        floatingPreviewImg.src = cover;
        floatingPreview.classList.add('active');
        quickPreviewX(e.clientX + 20);
        quickPreviewY(e.clientY);
      }
    });

    row.addEventListener('mouseleave', () => {
      document.body.classList.remove('is-hovering-project');
      if (floatingPreview) {
        floatingPreview.classList.remove('active');
      }
    });

    row.addEventListener('click', () => {
      const idx = parseInt(row.getAttribute('data-index'), 10);
      openProjectModal(idx);
    });
  });

  // Grid Card Click
  document.querySelectorAll('.project-card').forEach((card) => {
    card.addEventListener('mouseenter', () => {
      document.body.classList.add('is-hovering-project');
    });
    card.addEventListener('mouseleave', () => {
      document.body.classList.remove('is-hovering-project');
    });
    card.addEventListener('click', () => {
      const idx = parseInt(card.getAttribute('data-index'), 10);
      openProjectModal(idx);
    });
  });
}

// Bộ lọc chuyên mục (Filter Buttons)
function setupFilters() {
  const btns = document.querySelectorAll('.filter-btn');
  btns.forEach((btn) => {
    btn.addEventListener('click', () => {
      btns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentFilter = btn.getAttribute('data-filter');
      renderProjects();
    });
  });
}

// Chuyển đổi giữa chế độ List View và Grid View
function setupViewToggle() {
  const listBtn = document.getElementById('view-list-btn');
  const gridBtn = document.getElementById('view-grid-btn');
  const listContainer = document.getElementById('projects-list-container');
  const gridContainer = document.getElementById('projects-grid-container');

  if (!listBtn || !gridBtn) return;

  listBtn.addEventListener('click', () => {
    listBtn.classList.add('active');
    gridBtn.classList.remove('active');
    listContainer.classList.remove('hidden');
    gridContainer.classList.add('hidden');
  });

  gridBtn.addEventListener('click', () => {
    gridBtn.classList.add('active');
    listBtn.classList.remove('active');
    gridContainer.classList.remove('hidden');
    listContainer.classList.add('hidden');
  });
}

// ==========================================================================
// 6. CASE STUDY MODAL DRAWER (Xem chi tiết đồ án & Interactive Image Slider)
// ==========================================================================
const modal = document.getElementById('project-modal');
const modalCloseBtn = document.getElementById('modal-close-btn');
const modalPrevBtn = document.getElementById('modal-prev-btn');
const modalNextBtn = document.getElementById('modal-next-btn');
const sliderPrevBtn = document.getElementById('slider-prev-btn');
const sliderNextBtn = document.getElementById('slider-next-btn');

let currentGallery = [];
let currentImageIndex = 0;
let isImageTransitioning = false;

// Chuyển ảnh mượt mà trong đồ án (bằng GSAP animation)
function updateSliderImage(newIndex, animate = true) {
  if (!currentGallery.length) return;
  if (isImageTransitioning && animate) return;

  const total = currentGallery.length;
  currentImageIndex = (newIndex + total) % total;
  const targetSrc = currentGallery[currentImageIndex];

  const modalCoverImg = document.getElementById('modal-cover-img');
  const counterEl = document.getElementById('slider-counter');

  // Cập nhật bộ đếm ảnh: 01 / 04
  if (counterEl) {
    const curStr = String(currentImageIndex + 1).padStart(2, '0');
    const totStr = String(total).padStart(2, '0');
    counterEl.textContent = `${curStr} / ${totStr}`;
  }

  // Cập nhật class active cho thumbnails
  document.querySelectorAll('.thumbnail-item').forEach((item, idx) => {
    item.classList.toggle('active', idx === currentImageIndex);
  });

  if (!modalCoverImg) return;

  if (animate) {
    isImageTransitioning = true;
    gsap.to(modalCoverImg, {
      opacity: 0.25,
      scale: 0.97,
      duration: 0.18,
      ease: 'power2.in',
      onComplete: () => {
        modalCoverImg.src = targetSrc;
        modalCoverImg.onload = () => {
          gsap.to(modalCoverImg, {
            opacity: 1,
            scale: 1,
            duration: 0.35,
            ease: 'power2.out',
            onComplete: () => {
              isImageTransitioning = false;
            }
          });
        };
        // Phòng trường hợp ảnh cache không kích hoạt onload ngay
        setTimeout(() => {
          if (isImageTransitioning) {
            gsap.to(modalCoverImg, { opacity: 1, scale: 1, duration: 0.35 });
            isImageTransitioning = false;
          }
        }, 300);
      }
    });
  } else {
    modalCoverImg.src = targetSrc;
    gsap.set(modalCoverImg, { opacity: 1, scale: 1 });
  }
}

function openProjectModal(index) {
  if (index < 0 || index >= allProjects.length) return;
  currentProjectIndex = index;
  const project = allProjects[index];

  // Niên khóa 2023 — 2027
  document.getElementById('modal-code').textContent = `✿ HAU // Đồ án số 0${index + 1} // Khóa 2023 — 2027`;
  document.getElementById('modal-title').textContent = project.title;
  document.getElementById('modal-category').textContent = project.category;
  document.getElementById('modal-year').textContent = project.year;
  document.getElementById('modal-role').textContent = project.role;
  document.getElementById('modal-summary').textContent = project.summary;
  document.getElementById('modal-concept').textContent = project.concept || project.summary;

  // Deliverables
  const delivList = document.getElementById('modal-deliverables');
  if (delivList) {
    delivList.innerHTML = (project.deliverables || ['Hệ thống nhận diện', 'Ấn phẩm in ấn']).map(d => `<li>${d}</li>`).join('');
  }

  // Khởi tạo Gallery & Thumbnails
  currentGallery = (project.gallery && project.gallery.length > 0)
    ? project.gallery
    : [project.coverImage];
  currentImageIndex = 0;

  const thumbnailsContainer = document.getElementById('modal-thumbnails');
  if (thumbnailsContainer) {
    thumbnailsContainer.innerHTML = currentGallery.map((imgSrc, imgIdx) => `
      <div class="thumbnail-item hover-target ${imgIdx === 0 ? 'active' : ''}" data-img-index="${imgIdx}" data-cursor="ảnh 0${imgIdx + 1}">
        <img src="${imgSrc}" alt="Ảnh ${imgIdx + 1}" loading="lazy" />
      </div>
    `).join('');

    thumbnailsContainer.querySelectorAll('.thumbnail-item').forEach(item => {
      item.addEventListener('click', () => {
        const targetIdx = parseInt(item.getAttribute('data-img-index'), 10);
        if (targetIdx !== currentImageIndex) {
          updateSliderImage(targetIdx, true);
        }
      });
    });
  }

  // Hiển thị ảnh đầu tiên
  updateSliderImage(0, false);

  modal.classList.add('active');
  lenis.stop(); // Tạm dừng cuộn mượt nền khi mở modal
  if (floatingPreview) floatingPreview.classList.remove('active');
  bindHoverTargets();
}

function closeProjectModal() {
  modal.classList.remove('active');
  lenis.start(); // Tiếp tục cuộn
}

// Gắn sự kiện đóng modal
modalCloseBtn?.addEventListener('click', closeProjectModal);
modal?.querySelector('.modal-backdrop')?.addEventListener('click', closeProjectModal);

// Nút chuyển ảnh trực tiếp trên ảnh (Prev / Next Slider)
sliderPrevBtn?.addEventListener('click', (e) => {
  e.stopPropagation();
  updateSliderImage(currentImageIndex - 1, true);
});

sliderNextBtn?.addEventListener('click', (e) => {
  e.stopPropagation();
  updateSliderImage(currentImageIndex + 1, true);
});

// Điều hướng tới/lui giữa các đồ án khác trong modal
modalPrevBtn?.addEventListener('click', () => {
  const newIdx = (currentProjectIndex - 1 + allProjects.length) % allProjects.length;
  openProjectModal(newIdx);
});

modalNextBtn?.addEventListener('click', () => {
  const newIdx = (currentProjectIndex + 1) % allProjects.length;
  openProjectModal(newIdx);
});

// Phím tắt điều hướng: ESC đóng modal, Mũi tên Trái/Phải chuyển ảnh
window.addEventListener('keydown', (e) => {
  if (!modal.classList.contains('active')) return;

  if (e.key === 'Escape') {
    closeProjectModal();
  } else if (e.key === 'ArrowLeft') {
    updateSliderImage(currentImageIndex - 1, true);
  } else if (e.key === 'ArrowRight') {
    updateSliderImage(currentImageIndex + 1, true);
  }
});

// ==========================================================================
// 7. PRELOADER & HERO ENTRANCE TIMELINE (Animation chào sân nghệ thuật)
// ==========================================================================
function initPreloaderAndHero() {
  const preloader = document.getElementById('preloader');
  const counterVal = document.getElementById('counter-val');
  const bar = document.getElementById('preloader-bar');

  let count = { val: 0 };

  gsap.to(count, {
    val: 100,
    duration: 1.8,
    ease: 'power2.inOut',
    onUpdate: () => {
      const cur = Math.floor(count.val);
      if (counterVal) counterVal.textContent = cur < 10 ? `0${cur}` : `${cur}`;
      if (bar) bar.style.width = `${cur}%`;
    },
    onComplete: () => {
      // Kết thúc đếm %, kéo màn đỏ cuộn lên trên
      preloader?.classList.add('is-loaded');

      // Kích hoạt timeline mở màn Hero Section
      const heroTl = gsap.timeline({ delay: 0.2 });
      heroTl
        .from('.hero-meta-top', { y: 25, opacity: 0, duration: 0.8, ease: 'power3.out' })
        .from('.hero-title', { y: 120, opacity: 0, stagger: 0.15, duration: 1.1, ease: 'power4.out' }, '-=0.5')
        .from('.hero-sub-block', { y: 30, opacity: 0, duration: 0.8, ease: 'power3.out' }, '-=0.6')
        .from('.hero-bottom-bar', { opacity: 0, duration: 0.8, ease: 'power2.out' }, '-=0.4');
    }
  });
}

// Khởi chạy toàn bộ hệ thống
document.addEventListener('DOMContentLoaded', () => {
  initPreloaderAndHero();
  loadProjects();
});
