# Kế hoạch: Portfolio từ PDF (57 trang)

Nguồn: `design-source/CV (1).pdf` (47MB, 57 trang, 1 file duy nhất).

## 1. Cấu trúc trang
| Trang PDF | Nội dung | Hiển thị trên web |
|---|---|---|
| 1 | Hero | Section 1, full màn hình (100vh) |
| 2 | About me | Section 2, full màn hình (100vh) |
| 3–14 | Dự án 1 (12 trang) | Trang dự án `/project/1` |
| 15–22 | Dự án 2 (8 trang) | `/project/2` |
| 23–29 | Dự án 3 (7 trang) | `/project/3` |
| 30–39 | Dự án 4 (10 trang) | `/project/4` |
| 40–42 | Dự án 5 (3 trang) | `/project/5` |
| 43–57 | Dự án 6 (15 trang) | `/project/6` |

Luồng: Hero (full) → About (full) → Lưới 6 dự án → bấm vào → trang dự án.

## 2. Xử lý file PDF (script tự động)
1. Dùng Python + PyMuPDF: render mỗi trang thành ảnh.
2. Hero/About: rộng 2560px, WebP quality 85.
3. Trang dự án: rộng 1920px, WebP quality 80 (~150–300KB/ảnh). Tổng ước tính 25–40MB.
4. Xuất ra:
   - `public/assets/pages/hero.webp`, `about.webp`
   - `public/assets/projects/project-0X/page-01.webp ...`
   - `public/assets/projects/project-0X/cover.webp` (ảnh bìa lưới = trang đầu của dự án, bản nhỏ 900px)
   - Tạo luôn `projects.json` mới (6 dự án, danh sách trang).
5. `design-source/` thêm vào `.gitignore` (không đẩy PDF lên GitHub).

> Hero/About là ảnh nên chữ không chọn/copy được và SEO kém. Bù lại bằng `alt` text, thẻ `<h1>` ẩn (sr-only) và chữ thật trong meta. Nếu muốn chữ thật và có animation, bạn xuất riêng Hero/About thành layer/SVG sau (tuỳ chọn).

## 3. Thiết kế lưới 6 dự án
- Lưới 3×2 (desktop), 2×3 (tablet), 1 cột (mobile).
- Mỗi ô: ảnh bìa dự án **mờ + hơi nhạt màu** (blur ~6px, opacity 0.55, phủ tông vàng bơ).
- Hover:
  - ảnh nét lại (blur → 0), sáng lên, phóng to nhẹ (scale 1.06, ảnh nằm trong khung overflow hidden)
  - viền đỏ dâu vẽ chạy quanh ô (hiện nét)
  - hiện số thứ tự "01" và tên dự án trượt lên
- Mobile (không có hover): ảnh nét sẵn, hiện tên dự án.
- Khi cuộn tới: 6 ô hiện lần lượt (stagger) bằng GSAP ScrollTrigger.

## 4. Trang dự án
- Đường dẫn riêng `/project/N` (hash route hoặc Vite multi-page), tải riêng ảnh của dự án đó.
- Các trang PDF xếp **cuộn dọc**, mỗi trang là 1 ảnh full chiều rộng (tối đa ~1400px), lazy load, hiện dần khi cuộn (fade + trượt nhẹ).
- Nút **← Quay lại** cố định góc trái trên (sticky): quay về lưới dự án ở trang chủ, đúng vị trí lưới.
- Khi vào trang dự án luôn **cuộn lên đầu** (`scrollTo(0,0)`).
- Nút **↑ Lên đầu trang** nổi bên phải dưới, chỉ hiện sau khi cuộn quá 1 màn hình.
- Cuối trang: nút "Dự án tiếp theo →" và "← Quay lại".

## 5. Hiệu ứng
- Hero/About: fade-in khi vào, hiệu ứng parallax nhẹ khi cuộn (GSAP).
- Chuyển trang giữa trang chủ ↔ dự án: fade mượt.
- Tách lớp (tuỳ chọn, giai đoạn sau): với 3–5 trang tâm đắc, bạn xuất layer PNG/SVG riêng, mình thêm hiệu ứng vào lần lượt.
- **Remotion không dùng** (chỉ để render video).

## 6. Các bước thực hiện
1. Cài PyMuPDF, chạy script chuyển PDF → WebP, kiểm tra chất lượng.
2. Sinh `projects.json` mới + tên 6 dự án (bạn cho tên, nếu không mình tạm đặt "Dự án 01...06").
3. Làm Hero + About full màn hình.
4. Làm lưới 6 ô hover.
5. Làm trang dự án + nút quay lại + lên đầu + routing.
6. Tối ưu (lazy load, kích thước), test mobile.
7. Commit → PR → Vercel deploy.

## 7. Cần bạn xác nhận
- Tên 6 dự án (và 1 dòng mô tả ngắn mỗi dự án nếu có).
- Bản PDF hiện chỉ có 1 file (57 trang). File 60 trang còn lại có cần dùng không?
- Chữ trong trang About của PDF đang bị lỗi font (ký tự lạ). Mình sẽ không trích chữ từ PDF mà dùng nguyên ảnh, nên cần bạn xác nhận ảnh hiển thị đúng khi xuất.
