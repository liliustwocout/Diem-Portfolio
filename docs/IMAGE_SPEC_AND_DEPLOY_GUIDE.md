# ✿ HƯỚNG DẪN QUY CHUẨN XUẤT ẢNH & THAY THẾ CHO PORTFOLIO DIỄM

Tài liệu này hướng dẫn chi tiết cách chuẩn bị hình ảnh thực tế của bạn, quy chuẩn định dạng, kích thước và cách đặt tên file để đưa vào Portfolio.

---

## 1. 🖼️ Định dạng ảnh khuyên dùng

| Định dạng | Đánh giá | Trường hợp sử dụng |
| :--- | :--- | :--- |
| **`.webp`** *(Khuyên dùng số 1)* | ⭐⭐⭐⭐⭐ | Nhẹ hơn JPG/PNG từ 30% - 50%, nét căng, hỗ trợ cả nền trong suốt. Trình duyệt hiện đại tải siêu nhanh. |
| **`.jpg` / `.jpeg`** | ⭐⭐⭐⭐ | Dành cho ảnh chụp render 3D, ảnh mockup có nhiều chi tiết gradient và màu sắc phức tạp. |
| **`.png`** | ⭐⭐⭐⭐ | Dành cho các ảnh vector, logo, bảng palette màu hoặc ảnh cần trong suốt nền. |
| **`.svg`** | ⭐⭐⭐⭐⭐ | Dành cho logo, hoa văn vector, icon (sắc nét tuyệt đối trên mọi độ phân giải màn hình). |

> **Mẹo xuất ảnh:** 
> - Trong Photoshop / Illustrator: chọn **File > Export > Save for Web (Legacy)** hoặc **Export As...** > Chọn định dạng **WebP** (Quality: 80 - 85%) hoặc **JPEG** (Quality: High / Very High).
> - Dung lượng lý tưởng cho mỗi ảnh: **150 KB – 500 KB** (tránh để ảnh nặng trên 2MB vì sẽ làm người xem chờ tải).

---

## 2. 📏 Kích thước & Tỷ lệ khung hình chuẩn

1. **Ảnh đại diện cá nhân (Avatar):**
   - **Tỷ lệ:** `4:5` hoặc `1:1`
   - **Kích thước khuyên dùng:** `800 x 1000 px` hoặc `1000 x 1000 px`
   - **Vị trí lưu:** `public/assets/avt.webp`

2. **Ảnh đồ án (Project Showcase & Slider):**
   - **Tỷ lệ khung hình:** `16:9` (chuẩn màn hình máy tính) hoặc `16:10`
   - **Kích thước khuyên dùng:** `1600 x 900 px` hoặc `1920 x 1080 px`

---

## 3. 📂 Cần chuẩn bị những ảnh gì & Đặt tên như thế nào?

Mỗi đồ án trong số 7 đồ án sẽ được lưu trong một thư mục riêng biệt tại:  
`public/assets/projects/project-01/` đến `public/assets/projects/project-07/`

Trong mỗi thư mục đồ án, bạn chuẩn bị **4 bức ảnh** với quy ước đặt tên như sau:

```
public/assets/projects/project-01/
├── cover.webp       (hoặc cover.jpg / cover.png)
│   ↳ Ảnh 1: Ảnh bìa tổng quan ấn tượng nhất của đồ án
│
├── mockup.webp      (hoặc mockup.jpg / mockup.png)
│   ↳ Ảnh 2: Ảnh phối cảnh thực tế (Mockup hộp quà, bao bì, sách, poster treo tường...)
│
├── grid-typo.webp   (hoặc grid-typo.jpg / grid-typo.png)
│   ↳ Ảnh 3: Bản vẽ cấu trúc lưới (Grid System), bảng màu (Palette), quy chuẩn phông chữ
│
└── details.webp     (hoặc details.jpg / details.png)
    ↳ Ảnh 4: Chi tiết chất liệu (chất giấy, hiệu ứng ép nhũ vàng, dập nổi, góc chụp cận cảnh)
```

> **Ghi chú danh sách 7 đồ án tương ứng:**
> - `project-01`: Đồ án Brand Identity (The Crimson & Gold Monogram)
> - `project-02`: Đồ án Xuất bản & Sách nghệ thuật (Ký Họa Phố Phường Hà Nội)
> - `project-03`: Đồ án Thiết kế Bao bì Thủ công (Shan Tea Heritage)
> - `project-04`: Đồ án Typography & Poster Thể nghiệm (Chữ Động Đông Dương)
> - `project-05`: Đồ án Đồ họa Không gian & Triển lãm (Pavilion HAU)
> - `project-06`: Đồ án Bao bì Mỹ phẩm Sinh thái (Terra Botanica Luxury)
> - `project-07`: Đồ án Tốt nghiệp 2027 (Hồi Sinh Di Sản Kiến Trúc Hà Nội)

---

## 4. 🔄 Cách thay đổi dữ liệu khi bạn thêm ảnh mới

Sau khi copy các file ảnh mới vào các thư mục tương ứng:
Nếu bạn dùng định dạng `.webp` hoặc `.jpg` thay cho `.svg` hiện tại, bạn chỉ cần mở file:  
👉 [`public/data/projects.json`](../public/data/projects.json)  
Và cập nhật đuôi file ảnh trong mục `gallery` và `coverImage`, ví dụ:

```json
"coverImage": "/assets/projects/project-01/cover.webp",
"gallery": [
  "/assets/projects/project-01/cover.webp",
  "/assets/projects/project-01/mockup.webp",
  "/assets/projects/project-01/grid-typo.webp",
  "/assets/projects/project-01/details.webp"
]
```

Website sẽ tự động nhận diện và cập nhật ngay lập tức mà không cần chỉnh sửa code!
