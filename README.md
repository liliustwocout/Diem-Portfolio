# ✿ Trần Phương Diễm — Portfolio Nghệ Thuật (HAU 2023 — 2027)

> **Portfolio Thiết kế Đồ họa** dành cho sinh viên ngành Thiết kế Đồ họa — Trường Đại học Kiến trúc Hà Nội (HAU).  
> Mang phong cách nhẹ nhàng, thơ mộng, kết hợp tone màu vàng bơ ấm áp và sắc đỏ dâu son tinh tế.

---

## 🎨 Điểm Nổi Bật & Tính Năng
- **Tone Màu Nghệ Thuật:** Sự phối hợp hài hòa giữa màu vàng bơ ấm (`#E5A93C`, `#FFFDF9`) và đỏ dâu ngọt ngào (`#E63946`).
- **Typography Chuẩn Dấu Tiếng Việt:** Kết hợp phông chữ có chân uốn lượn cổ điển (*Playfair Display*), chữ viết tay mềm mại (*Dancing Script*) và phông nội dung hiện đại (*Quicksand*).
- **Interactive Case Study Slider:** Khi bấm vào đồ án, cửa sổ chi tiết (drawer modal) trượt ra êm ái, cho phép chuyển đổi nhiều hình ảnh chất lượng cao mượt mà trực tiếp trên khung ảnh và qua dải thumbnails bên dưới.
- **Micro-interactions:** Hiệu ứng di chuột trôi ảnh (*floating magnetic preview*), nút bấm nam châm, chuyển động mượt mà với thư viện **Lenis** và **GSAP**.
- **Niên khóa chính xác:** Khóa 2023 — 2027 (HAU).
- **Liên hệ chính thức:** `trandiem1872005@gmail.com`.

---

## 📂 Cấu Trúc Thư Mục Hình Ảnh
Xem chi tiết hướng dẫn thay thế hình ảnh tại [`docs/IMAGE_SPEC_AND_DEPLOY_GUIDE.md`](./docs/IMAGE_SPEC_AND_DEPLOY_GUIDE.md).

```bash
public/
├── assets/
│   ├── avt.webp                         # Ảnh đại diện cá nhân của Diễm
│   └── projects/
│       ├── project-01/                  # Đồ án 01: The Crimson & Gold Monogram
│       │   ├── cover.svg / cover.webp   # Bìa đồ án
│       │   ├── mockup.svg               # Mockup sản phẩm 3D
│       │   ├── grid-typo.svg            # Hệ thống lưới & Typography
│       │   └── details.svg              # Chi tiết bao bì & in ấn
│       ├── project-02/                  # Đồ án 02: Ký Họa Phố Phường Hà Nội
│       ├── project-03/                  # Đồ án 03: Shan Tea Heritage
│       ├── project-04/                  # Đồ án 04: Chữ Động Đông Dương
│       ├── project-05/                  # Đồ án 05: Pavilion Triển Lãm HAU
│       ├── project-06/                  # Đồ án 06: Terra Botanica Luxury
│       └── project-07/                  # Đồ án 07: Đồ Án Tốt Nghiệp 2027
└── data/
    └── projects.json                    # Dữ liệu nội dung, mô tả, hình ảnh đồ án
```

---

## 🚀 Chạy Cục Bộ (Local Development)

```bash
# Cài đặt thư viện
npm install

# Khởi động máy chủ dev
npm run dev

# Đóng gói sản phẩm (Build Production)
npm run build
```

---

## 🌐 Triển Khai (Deploy Vercel)
Website đã được cấu hình tối ưu sẵn sàng deploy 1-click trên **Vercel** thông qua GitHub repo `liliustwocout/Diem-Portfolio`.
