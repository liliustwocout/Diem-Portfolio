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
// 4. FLOATING PREVIEW (Ảnh trôi nhẹ bên cạnh chuột khi xem danh sách)
// ==========================================================================
const floatingPreview = document.getElementById('floating-preview');
const floatingPreviewImg = document.getElementById('floating-preview-img');

let quickPreviewX = floatingPreview ? gsap.quickTo(floatingPreview, 'x', { duration: 0.3, ease: 'power3.out' }) : null;
let quickPreviewY = floatingPreview ? gsap.quickTo(floatingPreview, 'y', { duration: 0.3, ease: 'power3.out' }) : null;

window.addEventListener('mousemove', (e) => {
  if (floatingPreview && floatingPreview.classList.contains('active') && quickPreviewX && quickPreviewY) {
    // Đặt ảnh preview lệch hẳn sang bên phải con trỏ chuột để không che chữ và không che chuột
    quickPreviewX(e.clientX + 28);
    quickPreviewY(e.clientY - 60);
  }
});

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
  const modalBody = modal.querySelector('.modal-body');
  if (modalBody) modalBody.scrollTop = 0;
  document.body.style.overflow = 'hidden';
  lenis.stop();
  if (floatingPreview) floatingPreview.classList.remove('active');
}

function closeProjectModal() {
  modal.classList.remove('active');
  document.body.style.overflow = '';
  lenis.start();
}

// Bắt sự kiện lăn chuột (mouse wheel) trực tiếp trên modal
// Giúp lăn chuột bất cứ vị trí nào trong modal cũng cuộn mượt mà mà không bị Lenis chặn
const modalBodyElement = modal?.querySelector('.modal-body');
modal?.addEventListener('wheel', (e) => {
  if (modal.classList.contains('active') && modalBodyElement) {
    e.stopPropagation();
    modalBodyElement.scrollTop += e.deltaY;
  }
}, { passive: true });

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

// Phím tắt điều hướng: ESC đóng modal, Mũi tên Trái/Phải chuyển ảnh, Lên/Xuống cuộn nội dung
window.addEventListener('keydown', (e) => {
  if (!modal.classList.contains('active')) return;

  if (e.key === 'Escape') {
    closeProjectModal();
  } else if (e.key === 'ArrowLeft') {
    updateSliderImage(currentImageIndex - 1, true);
  } else if (e.key === 'ArrowRight') {
    updateSliderImage(currentImageIndex + 1, true);
  } else if (e.key === 'ArrowDown') {
    if (modalBodyElement) modalBodyElement.scrollTop += 80;
  } else if (e.key === 'ArrowUp') {
    if (modalBodyElement) modalBodyElement.scrollTop -= 80;
  }
});

// ==========================================================================
// 7. PRELOADER & HERO ENTRANCE TIMELINE (Animation chào sân nghệ thuật - Phóng to đầu vào)
// ==========================================================================
function initPreloaderAndHero() {
  const preloader = document.getElementById('preloader');
  const counterVal = document.getElementById('counter-val');
  const bar = document.getElementById('preloader-bar');

  // 1. ANIMATION ĐẦU VÀO CỦA TRANG LOADING: Mọi thứ phóng to dần lên (Scale-up entrance)
  const preloaderInTl = gsap.timeline();
  preloaderInTl
    .fromTo('.preloader-inner', 
      { scale: 0.52, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.85, ease: 'back.out(1.5)' }
    )
    .fromTo('.preloader-avatar', 
      { scale: 0, rotation: -20, opacity: 0 },
      { scale: 1, rotation: 0, opacity: 1, duration: 0.75, ease: 'back.out(1.8)' },
      '-=0.6'
    )
    .fromTo('.preloader-meta', 
      { y: -20, opacity: 0, scale: 0.85 },
      { y: 0, opacity: 1, scale: 1, duration: 0.6, ease: 'power3.out' },
      '-=0.5'
    )
    .fromTo('.preloader-counter', 
      { scale: 0.6, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.85, ease: 'back.out(1.6)' },
      '-=0.45'
    )
    .fromTo('.preloader-bar-wrap', 
      { scaleX: 0, opacity: 0 },
      { scaleX: 1, opacity: 1, duration: 0.65, ease: 'power3.out' },
      '-=0.35'
    )
    .fromTo('.preloader-footer', 
      { y: 20, opacity: 0, scale: 0.88 },
      { y: 0, opacity: 1, scale: 1, duration: 0.65, ease: 'power3.out' },
      '-=0.4'
    );

  // 2. COUNTER ĐẾM % TỪ 00 -> 100
  let count = { val: 0 };

  gsap.to(count, {
    val: 100,
    duration: 1.8,
    delay: 0.15,
    ease: 'power2.inOut',
    onUpdate: () => {
      const cur = Math.floor(count.val);
      if (counterVal) counterVal.textContent = cur < 10 ? `0${cur}` : `${cur}`;
      if (bar) bar.style.width = `${cur}%`;
    },
    onComplete: () => {
      // 3. ĐẠT 100%: PHÓNG TO BỪNG SÁNG (Scale-up crescendo) TRƯỚC KHI MỞ MÀN
      gsap.to('.preloader-inner', {
        scale: 1.15,
        opacity: 0,
        duration: 0.5,
        ease: 'power2.in',
        onComplete: () => {
          preloader?.classList.add('is-loaded');

          // 4. KÍCH HOẠT TIMELINE MỞ MÀN HERO: Toàn bộ website phóng to chào đón người xem
          const heroTl = gsap.timeline({ delay: 0.1 });
          heroTl
            .fromTo('#hero .hero-container',
              { scale: 0.88, opacity: 0, transformOrigin: 'center center' },
              { scale: 1, opacity: 1, duration: 1.2, ease: 'power3.out' }
            )
            .from('.hero-meta-top', { y: 25, scale: 0.9, opacity: 0, duration: 0.8, ease: 'back.out(1.5)' }, '-=0.9')
            .from('.hero-title-wrap', { y: 50, scale: 0.88, opacity: 0, duration: 1.0, ease: 'power4.out' }, '-=0.7')
            .from('.hero-desc', { y: 25, opacity: 0, duration: 0.8, ease: 'power3.out' }, '-=0.6')
            .from('.hero-tags', { y: 20, scale: 0.92, opacity: 0, duration: 0.7, ease: 'power3.out' }, '-=0.5')
            .from('.hero-avatar-card', { scale: 0.75, opacity: 0, rotation: -3, duration: 1.0, ease: 'back.out(1.5)' }, '-=0.7')
            .from('.hero-bottom-bar', { y: 20, opacity: 0, duration: 0.8, ease: 'power2.out' }, '-=0.5');
        }
      });
    }
  });
}

// Khởi chạy toàn bộ hệ thống
document.addEventListener('DOMContentLoaded', () => {
  initPreloaderAndHero();
  loadProjects();
});
