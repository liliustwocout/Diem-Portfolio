# KẾ HOẠCH THIẾT KẾ & PHÁT TRIỂN PORTFOLIO NGHỆ THUẬT
> **Designer:** **Trần Phương Diễm**  
> **Chuyên ngành:** Thiết kế Đồ họa (Graphic Design) — **Đại học Kiến trúc Hà Nội (HAU)**  
> **Phong cách nghệ thuật:** Nhẹ nhàng, Dễ thương, Nghệ thuật Uốn lượn (Cute & Poetic Gentle Art)  
> **Nhân xưng:** Thân thiện, gần gũi với **"mình"** thay vì "tôi"  
> **Typography:** **Playfair Display (Italic uốn lượn)** + **Dancing Script** + **Quicksand** (Hỗ trợ 100% tiếng Việt chuẩn, không lỗi dấu)  
> **Chủ đề màu sắc:** Nền Kem Sữa Ấm Áp (Milk Paper) kết hợp Vàng Bơ (Warm Butter & Honey) & Đỏ Dâu Tươi Sáng (Sweet Strawberry Red)

---

## 1. ĐỊNH VỊ NGHỆ THUẬT & GU THẨM MỸ (DESIGN IDENTITY)

### 1.1. Tinh thần cốt lõi: "Nghệ thuật Dịu Dàng & Dễ Thương của Phương Diễm"
- **Không khô cứng hay gai góc:** Từng đường nét, góc bo tròn mềm mại (`border-radius: 20px - 999px`), các biểu tượng hoa sao nhỏ xinh xắn (`✿`, `✦`, `✧`, `♥`).
- **Nét chữ uốn lượn & Thơ mộng:** 
  - Tiêu đề dùng phông nghệ thuật **Playfair Display Italic** kết hợp bút tích thảo **Dancing Script** mềm mại, uyển chuyển.
  - Nội dung dùng **Quicksand** tròn trịa, trong trẻo, hỗ trợ hoàn hảo bộ gõ tiếng Việt.
- **Giọng văn ấm áp:** Sử dụng nhân xưng **"mình"**, tạo cảm giác như một cuốn sổ tay nghệ thuật chân thành gửi đến bạn đọc và người tuyển dụng.

### 1.2. Bảng màu chủ đạo: Vàng Bơ Ấm & Đỏ Dâu Xinh Xắn (Warm Butter & Strawberry Palette)

| Phân loại | Tên màu / Ý nghĩa | Mã Hex | Ứng dụng |
| :--- | :--- | :--- | :--- |
| **Nền Canvas** | Warm Milk Paper (Kem sữa ấm dịu mắt) | `#FFFDF9` / `#FFF9ED` | Nền toàn trang, êm dịu, không chói mắt |
| **Thẻ & Khung** | Soft White Paper (Giấy mỹ thuật trắng ấm) | `#FFFFFF` / `#FFF6E5` | Nền thẻ đồ án, modal case study |
| **Điểm nhấn chính** | Sweet Strawberry Red (Đỏ dâu tươi tắn) | `#E63946` | Nút bấm, con trỏ hoa chuột, tiêu đề nghệ thuật, icon ✿ |
| **Màu phụ ấm áp** | Warm Butter & Honey (Vàng bơ mật ong) | `#E5A93C` / `#FFA502` | Viền bo mềm, số thứ tự, badge phân loại đồ án |
| **Mực in nội dung** | Soft Espresso (Nâu cà phê đậm êm ái) | `#2C2623` | Nội dung đọc rõ ràng, mềm mại hơn màu đen thuần |
| **Màu chữ phụ** | Warm Umber (Màu gỗ ấm nhẹ) | `#6B625B` | Mô tả đồ án, chú thích năm thực hiện |



---

## 2. KIẾN TRÚC NỘI DUNG & USER FLOW

```
[ PRELOADER ] -> Bộ đếm % phong cách typographic lớn + Màn đỏ cuộn mở
     │
[ HERO SECTION ] -> Typography hoành tráng + Tagline cá nhân + Tọa độ đồ họa
     │
[ SELECTED WORKS ] -> Trưng bày 4-6 đồ án xuất sắc (Horizontal / Interactive List)
     │
[ CREATIVE ARCHIVE ] -> Lưới Masonry các thử nghiệm Poster, Typo, 3D Render
     │
[ ABOUT & ETHOS ] -> Triết lý thiết kế + Kỹ năng chuyên môn + ĐH Kiến trúc
     │
[ FOOTER & CONTACT ] -> Magnetic Button đỏ lớn + Kêu gọi cộng tác & Liên hệ
```

### Các nhóm đồ án trọng tâm của sinh viên đồ họa năm 4:
1. **Brand Identity (Nhận diện thương hiệu):** Logo system, guideline, màu sắc, font chữ thương hiệu.
2. **Packaging & Print (Bao bì & In ấn):** Đồ án bao bì sản phẩm, kỹ thuật gia công in (dập nổi, foil, khuôn bế).
3. **Editorial & Publication (Sách & Tạp chí):** Dàn trang tạp chí nghệ thuật, poster kiến trúc, typography thử nghiệm.
4. **Graduation Project / Capstone (Đồ án tốt nghiệp):** Dự án quy mô lớn nhất, giải quyết bài toán văn hóa, xã hội hoặc thương mại hoàn chỉnh.

---

## 3. BỘ CÔNG CỤ CHUYỂN ĐỘNG (MOTION KIT & GITHUB LIBRARIES)

| Thư viện | Link GitHub | Vai trò trong Portfolio |
| :--- | :--- | :--- |
| **Lenis** | `darkroomengineering/lenis` | Cuộn trang quán tính mượt như lụa (Smooth inertia scroll), khử giật lag cuộn chuột. |
| **GSAP 3** | `greensock/gsap` | Điều khiển toàn bộ dòng thời gian chuyển động (Timeline, easing, spring physics). |
| **ScrollTrigger** | `greensock/gsap` (Plugin) | Kích hoạt hiệu ứng theo thanh cuộn (Parallax ảnh, ghim section, cuộn ngang). |
| **SplitType** | `lunsant/split-type` | Tách chữ thành từng từ/dòng để làm kinetic typography (chữ trượt từ dưới lên). |
| **Three.js / WebGL**| `mrdoob/three.js` hoặc `codrops` | Biến dạng ảnh chất lỏng (Liquid ripple / wave distortion) khi hover vào poster. |
| **Anime.js** | `juliangarnier/anime` | Hoạt họa các nét vẽ vector kiến trúc (SVG path stroke-drawing). |

---

## 4. CÁC HIỆU ỨNG TƯƠNG TÁC ĐẶC TRƯNG CẦN CÓ

1. **Custom Magnetic Cursor (Con trỏ chuột nam châm):**
   - Vòng tròn đỏ chuyển động theo chuột với độ trễ tự nhiên (`gsap.quickTo`).
   - Phóng to thành chữ `VIEW PROJECT` hoặc `EXPLORE` khi rê vào ảnh tác phẩm.
   - Hút dính vào các nút bấm (magnetic attraction).
2. **Floating Image Preview on List Hover (Kiểu Dennis Snellenberg):**
   - Danh sách tên đồ án dạng chữ lớn.
   - Khi hover vào dòng nào, ảnh bìa đồ án đó xuất hiện và lướt mượt mà theo tọa độ con trỏ.
3. **Horizontal Gallery Walk (Triển lãm cuộn ngang):**
   - Người dùng cuộn chuột theo chiều dọc, nhưng khu vực đồ án trượt ngang như đang bước đi trong phòng trưng bày nghệ thuật.
4. **Liquid Shader Hover Effect:**
   - Khi chuột lướt qua ảnh mockup đồ án, bề mặt ảnh gợn sóng nước phản chiếu ánh đỏ WebGL.

---

## 5. LỘ TRÌNH THỰC HIỆN DỰ ÁN (ROADMAP)

- [x] **Giai đoạn 1:** Soạn lọc 7 đồ án tiêu biểu & chuẩn bị ảnh (Xem hướng dẫn chi tiết tại [PROJECTS_GUIDE.md](file:///g:/Project/Diem-Portfolio/docs/PROJECTS_GUIDE.md)).
- [x] **Giai đoạn 2:** Dựng khung sườn HTML/CSS với hệ thống Grid Kiến trúc và bảng màu Đỏ - Đen ([index.html](file:///g:/Project/Diem-Portfolio/index.html), [style.css](file:///g:/Project/Diem-Portfolio/style.css)).
- [x] **Giai đoạn 3:** Tích hợp bộ chuyển động: Lenis (Smooth scroll) + GSAP (ScrollTrigger, Magnetic Cursor, Floating Preview) ([main.js](file:///g:/Project/Diem-Portfolio/main.js)).
- [x] **Giai đoạn 4:** Xây dựng tính năng xem chi tiết đồ án (Case study modal / drawer đa chiều).
- [ ] **Giai đoạn 5:** Thay ảnh đồ án thật của bạn vào các thư mục `public/assets/projects/` và tinh chỉnh text thực tế.
- [ ] **Giai đoạn 6:** Triển khai (Deploy lên Vercel / GitHub Pages với tên miền riêng).


