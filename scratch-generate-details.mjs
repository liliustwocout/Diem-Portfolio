import fs from 'fs';
import path from 'path';

const projectIds = ['project-01', 'project-02', 'project-03', 'project-04', 'project-05', 'project-06', 'project-07'];

projectIds.forEach((pid, idx) => {
  const dir = path.join('public', 'assets', 'projects', pid);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

  const num = `0${idx + 1}`;

  // 1. Mockup image
  const mockupSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 1000" width="100%" height="100%">
    <defs>
      <linearGradient id="m-bg-${num}" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#FFFDF9" />
        <stop offset="100%" stop-color="#FFF3DC" />
      </linearGradient>
    </defs>
    <rect width="1600" height="1000" fill="url(#m-bg-${num})" />
    <rect x="60" y="60" width="1480" height="880" rx="24" fill="none" stroke="#E5A93C" stroke-opacity="0.3" stroke-width="2" />
    <text x="120" y="140" font-family="'Quicksand', sans-serif" font-size="20" fill="#E63946" font-weight="bold">✿ CHI TIẾT THÀNH PHẨM // MOCKUP 01 // ĐỒ ÁN ${num}</text>
    <text x="1480" y="140" font-family="'Quicksand', sans-serif" font-size="16" fill="#D48B16" text-anchor="end">HAU 2023 — 2027</text>
    
    <!-- Realistic 3D Mockup Box Composition in soft cream, gold & strawberry red -->
    <g transform="translate(800, 520)">
      <!-- Box shadow -->
      <ellipse cx="0" cy="240" rx="420" ry="60" fill="#E5A93C" fill-opacity="0.2" />
      
      <!-- Central Book / Packaging Box -->
      <polygon points="-320,-80 0,-240 320,-80 0,80" fill="#FFFFFF" stroke="#E5A93C" stroke-width="2" />
      <polygon points="-320,-80 0,80 0,220 -320,60" fill="#FFF9EC" stroke="#E5A93C" stroke-width="2" />
      <polygon points="0,80 320,-80 320,60 0,220" fill="#F8E8C8" stroke="#E5A93C" stroke-width="2" />
      
      <!-- Foil Stamp & Embellishment on Mockup -->
      <circle cx="0" cy="-80" r="50" fill="#E63946" />
      <text x="0" y="-72" font-family="'Dancing Script', cursive" font-size="34" fill="#FFFFFF" text-anchor="middle" font-weight="bold">Diễm</text>
      <text x="0" y="160" font-family="'Quicksand', sans-serif" font-size="18" fill="#E63946" text-anchor="middle" font-weight="bold">KỸ THUẬT ÉP NHŨ VÀNG &amp; DẬP NỔI</text>
    </g>
    <text x="800" y="880" font-family="'Playfair Display', serif" font-style="italic" font-size="28" fill="#2C2623" text-anchor="middle">Hình ảnh mockup phối cảnh thực tế ấn phẩm</text>
  </svg>`;

  // 2. Grid & Typography image
  const gridSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 1000" width="100%" height="100%">
    <defs>
      <linearGradient id="g-bg-${num}" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#FFFDF9" />
        <stop offset="100%" stop-color="#FFF8E8" />
      </linearGradient>
    </defs>
    <rect width="1600" height="1000" fill="url(#g-bg-${num})" />
    <rect x="60" y="60" width="1480" height="880" rx="24" fill="none" stroke="#E5A93C" stroke-opacity="0.3" stroke-width="2" />
    <text x="120" y="140" font-family="'Quicksand', sans-serif" font-size="20" fill="#E63946" font-weight="bold">✿ HỆ THỐNG LƯỚI &amp; BẢNG MÀU // ĐỒ ÁN ${num}</text>
    
    <!-- 12-Column Architectural Grid lines -->
    <g transform="translate(100, 220)">
      ${[0, 110, 220, 330, 440, 550, 660, 770, 880, 990, 1100, 1210, 1320].map(x => 
        `<line x1="${x}" y1="0" x2="${x}" y2="520" stroke="#E63946" stroke-opacity="0.18" stroke-width="1.5" stroke-dasharray="4 6" />`
      ).join('')}
      
      <!-- Palette Swatches -->
      <rect x="80" y="40" width="180" height="180" rx="20" fill="#E63946" />
      <text x="170" y="140" font-family="'Quicksand', sans-serif" font-size="16" fill="#FFF" text-anchor="middle" font-weight="bold">#E63946</text>
      
      <rect x="300" y="40" width="180" height="180" rx="20" fill="#E5A93C" />
      <text x="390" y="140" font-family="'Quicksand', sans-serif" font-size="16" fill="#FFF" text-anchor="middle" font-weight="bold">#E5A93C</text>

      <rect x="520" y="40" width="180" height="180" rx="20" fill="#FFF9ED" stroke="#E5A93C" stroke-width="2" />
      <text x="610" y="140" font-family="'Quicksand', sans-serif" font-size="16" fill="#2C2623" text-anchor="middle" font-weight="bold">#FFF9ED</text>

      <rect x="740" y="40" width="180" height="180" rx="20" fill="#2C2623" />
      <text x="830" y="140" font-family="'Quicksand', sans-serif" font-size="16" fill="#FFF" text-anchor="middle" font-weight="bold">#2C2623</text>

      <!-- Typography Specimen -->
      <text x="80" y="320" font-family="'Playfair Display', serif" font-style="italic" font-size="44" fill="#E63946" font-weight="bold">Aa Bb Cc Dd Ee — Playfair Display</text>
      <text x="80" y="390" font-family="'Dancing Script', cursive" font-size="46" fill="#E5A93C">Nét chữ uốn lượn nghệ thuật — Dancing Script</text>
      <text x="80" y="460" font-family="'Quicksand', sans-serif" font-size="28" fill="#2C2623" font-weight="600">Kiểu chữ nội dung tròn trịa &amp; trong trẻo — Quicksand</text>
    </g>
    <text x="800" y="880" font-family="'Playfair Display', serif" font-style="italic" font-size="28" fill="#2C2623" text-anchor="middle">Quy chuẩn tỷ lệ vàng và hệ thống nhận diện thị giác</text>
  </svg>`;

  // 3. Details & Process image
  const detailsSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 1000" width="100%" height="100%">
    <defs>
      <linearGradient id="d-bg-${num}" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#FFFDF9" />
        <stop offset="100%" stop-color="#FFF2D8" />
      </linearGradient>
    </defs>
    <rect width="1600" height="1000" fill="url(#d-bg-${num})" />
    <rect x="60" y="60" width="1480" height="880" rx="24" fill="none" stroke="#E5A93C" stroke-opacity="0.3" stroke-width="2" />
    <text x="120" y="140" font-family="'Quicksand', sans-serif" font-size="20" fill="#E63946" font-weight="bold">✿ CẬN CẢNH CHẤT LIỆU IN ẤN // ĐỒ ÁN ${num}</text>
    
    <!-- Close-up tactile elements -->
    <g transform="translate(800, 500)">
      <circle cx="-320" cy="0" r="180" fill="#FFF9ED" stroke="#E5A93C" stroke-width="3" />
      <circle cx="-320" cy="0" r="130" fill="none" stroke="#E63946" stroke-width="2" stroke-dasharray="6 6" />
      <text x="-320" y="10" font-family="'Dancing Script', cursive" font-size="38" fill="#E63946" text-anchor="middle">Giấy ngả vàng</text>

      <circle cx="0" cy="0" r="200" fill="#FFF3D4" stroke="#E63946" stroke-width="3" />
      <circle cx="0" cy="0" r="150" fill="#E63946" fill-opacity="0.1" />
      <text x="0" y="-20" font-family="'Playfair Display', serif" font-style="italic" font-size="34" fill="#2C2623" text-anchor="middle">Khuôn bế dập nổi</text>
      <text x="0" y="30" font-family="'Quicksand', sans-serif" font-size="20" fill="#E63946" text-anchor="middle" font-weight="bold">ĐỘ NỔI 1.5MM</text>

      <circle cx="320" cy="0" r="180" fill="#FFF9ED" stroke="#E5A93C" stroke-width="3" />
      <circle cx="320" cy="0" r="130" fill="none" stroke="#E5A93C" stroke-width="2" stroke-dasharray="6 6" />
      <text x="320" y="10" font-family="'Dancing Script', cursive" font-size="38" fill="#E5A93C" text-anchor="middle">Ép kim nhũ vàng</text>
    </g>
    <text x="800" y="880" font-family="'Playfair Display', serif" font-style="italic" font-size="28" fill="#2C2623" text-anchor="middle">Nghiên cứu chất liệu in ấn xúc giác và gia công thủ công</text>
  </svg>`;

  fs.writeFileSync(path.join(dir, 'mockup.svg'), mockupSvg, 'utf-8');
  fs.writeFileSync(path.join(dir, 'grid-typo.svg'), gridSvg, 'utf-8');
  fs.writeFileSync(path.join(dir, 'details.svg'), detailsSvg, 'utf-8');
});

console.log('All gallery detail images generated successfully for all 7 projects!');
