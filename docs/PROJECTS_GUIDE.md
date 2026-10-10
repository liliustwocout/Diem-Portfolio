# HƯỚNG DẪN CHUẨN BỊ & TỔ CHỨC 7 DỰ ÁN CHO PORTFOLIO
> **Dành cho:** Sinh viên năm 4 Ngành Thiết kế Đồ họa – ĐH Kiến trúc  
> **Mục tiêu:** Tối ưu hóa hình ảnh, chuẩn hóa thư mục, sẵn sàng đưa vào website với tốc độ tải siêu nhanh.

---

## 1. LƯU ẢNH VÀO ĐÂU? (CẤU TRÚC THƯ MỤC CHUẨN)

Trong dự án web, toàn bộ hình ảnh và tài nguyên tĩnh sẽ được đặt trong thư mục `public/assets/projects/`.

Bạn hãy tạo cấu trúc thư mục như sau:

```
Diem-Portfolio/
├── public/
│   └── assets/
│       └── projects/
│           ├── project-01-ten-du-an/
│           │   ├── cover.webp         <-- [QUAN TRỌNG NHẤT] Ảnh đại diện ngoài trang chủ & hover
│           │   ├── hero.webp          <-- Ảnh banner lớn đầu trang chi tiết
│           │   ├── 01-mockup.webp     <-- Ảnh thành phẩm thực tế / render 3D
│           │   ├── 02-grid-typo.webp  <-- Ảnh lưới thiết kế, bảng màu, font chữ
│           │   └── 03-details.webp    <-- Ảnh cận cảnh chi tiết gia công in / bao bì
│           ├── project-02-ten-du-an/
│           │   ├── cover.webp
│           │   └── ...
│           ├── ... (cho đến project-07)
```

> **Quy tắc đặt tên:** 
> - Viết thường, không dấu, dùng dấu gạch ngang (`-`), ví dụ: `red-bloom-identity`, `saigon-retro-packaging`. 
> - Tránh đặt tên có dấu cách hoặc tiếng Việt có dấu (`Đồ án tốt nghiệp 1.jpg` ❌ -> `capstone-thesis-2026.webp` ✔️).

---

## 2. MỖI DỰ ÁN CẦN TÁCH MẤY ẢNH & TỈ LỆ NÀO?

Để portfolio vừa gọn gàng vừa thể hiện đúng "chất dân Kiến trúc" (coi trọng quy trình tư duy thiết kế), mỗi dự án bạn nên chuẩn bị từ **3 đến 5 tấm ảnh** tuyển chọn nhất:

| Loại ảnh | Tên file | Tỉ lệ khung hình (Aspect Ratio) | Kích thước đề xuất (px) | Mục đích sử dụng |
| :--- | :--- | :--- | :--- | :--- |
| **Ảnh bìa đại diện** | `cover.webp` | **16:9** hoặc **4:3** | 1600 × 900 hoặc 1600 × 1200 | Hiển thị ngoài trang chủ, dùng cho hiệu ứng hover trượt theo chuột (Dennis Snellenberg vibe). |
| **Ảnh Hero Showcase** | `hero.webp` | **16:9** hoặc **21:9** (Panorama) | 1920 × 1080 | Ảnh banner toàn cảnh khi bấm mở xem chi tiết đồ án (Case study). |
| **Ảnh Cận cảnh Mockup** | `01-mockup.webp` | Tự do (dọc 3:4 hoặc vuông 1:1) | 1400 × 1050 | Phô diễn kỹ thuật phối cảnh, mock-up in ấn thực tế hoặc render bao bì 3D. |
| **Ảnh Lưới & Typography** | `02-grid-typo.webp` | **16:9** | 1600 × 900 | **Điểm ăn tiền của dân Kiến trúc:** Bảng phân tích tỷ lệ vàng, hệ thống cột lưới (grid system), font chữ, palette màu. |
| **Ảnh Chi tiết / Bối cảnh**| `03-details.webp` | Vuông hoặc ngang | 1400 × 1400 | Chất liệu giấy, ép kim, bao bì mở hộp, poster dán thực địa,... |

---

## 3. CÁCH XUẤT ẢNH & TỐI ƯU DUNG LƯỢNG (CỰC KỲ QUAN TRỌNG)

Trang web portfolio nghệ thuật nhiều ảnh rất dễ bị nặng và tải chậm nếu dùng ảnh gốc vài chục MB từ Photoshop/Illustrator.

### Quy chuẩn tối ưu cho Web:
1. **Định dạng:** Ưu tiên xuất file **`.webp`** (hoặc `.jpg` chất lượng cao). WebP nhẹ hơn JPG tới 40% mà độ nét gần như giữ nguyên 100%.
2. **Dung lượng:** 
   - Ảnh `cover.webp` ngoài trang chủ: **Dưới 350 KB**.
   - Ảnh chi tiết bên trong: **Dưới 500 KB - 800 KB**.
3. **Cách đổi ảnh sang WebP nhanh:**
   - Trong Photoshop: `File -> Export -> Save for Web` chọn chất lượng 80-85%, hoặc dùng `Export As` chọn WebP.
   - Hoặc dùng công cụ nén ảnh miễn phí online siêu nhanh: [Squoosh.app](https://squoosh.app/) (của Google) hoặc [TinyPNG](https://tinypng.com/).

---

## 4. BẢNG MẪU THÔNG TIN CẦN SOẠN CHO 7 DỰ ÁN

Với mỗi dự án, bạn chỉ cần soạn sẵn 1 đoạn text ngắn (tiếng Việt hoặc tiếng Anh) theo mẫu sau:

```json
{
  "id": "01",
  "title": "Tên Đồ Án (Ví dụ: The Crimson Bloom)",
  "category": "Brand Identity / Packaging / Editorial / Capstone",
  "year": "2026",
  "role": "Art Direction, Visual Identity, Packaging",
  "client_context": "Đồ án Tốt nghiệp / Dự án thực tế cho khách hàng X",
  "concept": "Tóm tắt ý tưởng cốt lõi trong 2 - 3 câu: Đề tài giải quyết vấn đề gì? Cảm hứng thị giác đến từ đâu? Điểm đặc biệt nhất của thiết kế.",
  "deliverables": ["Logo & Brand Guidelines", "Bao bì hộp cứng", "Bộ ấn phẩm sự kiện"]
}
```

---

## 5. TÓM TẮT CHECKLIST CÔNG VIỆC BẠN CẦN LÀM NGAY:

1. [ ] Đặt tên và phân loại 7 đồ án (Ví dụ: 3 bài Nhận diện thương hiệu, 2 bài Bao bì, 1 bài Tạp chí/Editorial, 1 Đồ án tốt nghiệp).
2. [ ] Chọn ra tấm ảnh đẹp nhất của từng dự án để làm `cover.webp`.
3. [ ] Tạo sẵn các thư mục con trong `public/assets/projects/` và thả ảnh vào.
4. [ ] Viết sẵn 1 đoạn mô tả ý tưởng ngắn gọn cho từng bài.
