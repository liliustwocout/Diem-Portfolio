# PHÂN TÍCH TECH STACK: HTML/CSS/JS vs REACT vs NEXT.JS vs ASTRO
> **Câu hỏi:** *HTML, CSS, JS có làm được các hiệu ứng mượt mà như vậy không? Có nên dùng React, Next.js hay công nghệ gì khác không?*

---

## 1. HTML, CSS, JS THUẦN CÓ ĐỦ LÀM ĐƯỢC CÁC HIỆU ỨNG ĐÓ KHÔNG?

👉 **CÂU TRẢ LỜI NGẮN GỌN: 100% ĐƯỢC, VÀ THẬM CHÍ CÒN MƯỢT HƠN CẢ DÙNG REACT/NEXT.JS!**

### Tại sao lại như vậy?
1. **Bản chất của Trình duyệt:**
   - Trình duyệt web (Chrome, Safari, Edge) chỉ hiểu **HTML** (cấu trúc DOM), **CSS** (giao diện, GPU transform) và **JavaScript** (logic).
   - Mọi framework như React, Vue, Next.js cuối cùng cũng phải dịch (compile) thành HTML, CSS và JavaScript để trình duyệt chạy.
2. **Các trang web đoạt giải Awwwards Site of the Year dùng gì?**
   - Hầu hết các website portfolio đỉnh cao nhất thế giới (như của *Dennis Snellenberg*, *Aristide Benoist*, *Active Theory*, *Locomotive*) đều viết bằng **Vanilla JavaScript + WebGL (Three.js/Canvas) + GSAP + Lenis**.
   - Khi làm animation can thiệp trực tiếp vào tọa độ pixel, chuột, GPU: **Vanilla JS tương tác trực tiếp với DOM thật và Canvas**, không phải thông qua lớp Virtual DOM của React, nên **đạt tốc độ 60fps - 120fps mượt như bơ mà không bị giật lag (frame drop)**.

---

## 2. BẢNG SO SÁNH CHI TIẾT CÁC CÔNG NGHỆ

| Tiêu chí | HTML + CSS + JS (Vite Bundler) | React (Vite + React) | Next.js (App Router) | Astro (Hiện đại) |
| :--- | :--- | :--- | :--- | :--- |
| **Độ mượt mà Animation** | ⭐⭐⭐⭐⭐ (Tối đa, tương tác trực tiếp GPU) | ⭐⭐⭐⭐ (Rất mượt nếu quản lý cleanup tốt) | ⭐⭐⭐ (Dễ bị xung đột với cơ chế SSR) | ⭐⭐⭐⭐⭐ (HTML tĩnh, 0 runtime JS thừa) |
| **Khả năng làm hiệu ứng GSAP/Lenis** | Cực kỳ dễ, trực quan, không lo lỗi vòng đời | Cần dùng `useRef`, `useLayoutEffect`, `@gsap/react` | Khá phiền, phải dùng `'use client'`, dễ lỗi `window is undefined` | Rất dễ, viết script trực tiếp |
| **Độ nặng trang web (Bundle Size)** | Siêu nhẹ (~50KB - 200KB) | Trung bình (~150KB - 400KB) | Rất nặng (~500KB - 2MB) | Siêu nhẹ (0KB JS framework mặc định) |
| **Tốc độ tải trang ban đầu (First Load)** | < 1 giây | ~ 1.5 - 2 giây | ~ 2 - 3 giây | < 1 giây |
| **Quản lý Component (Tái sử dụng code)** | Thấp (phải copy code nếu nhiều trang) | Rất cao (`<ProjectCard />`) | Rất cao | Rất cao (Có cú pháp Component như React) |
| **Phù hợp cho dự án này** | **CỰC KỲ KHUYÊN DÙNG** (Nhanh, đẹp, kiểm soát tốt) | **TỐT** (Nếu đã thạo React) | **KHÔNG NÊN DÙNG** (Quá thừa thãi và cồng kềnh) | **RẤT TỐT** (Nếu muốn chia Component) |

---

## 3. CÓ NÊN DÙNG REACT HOẶC NEXT.JS KHÔNG?

### Khi nào NÊN dùng React?
- Khi bạn đã **rất thành thạo React** và muốn chia website thành các file tái sử dụng như:
  - `Header.jsx`, `Cursor.jsx`, `ProjectCard.jsx`, `NoiseOverlay.jsx`.
- **Lưu ý quan trọng khi dùng React với GSAP:**
  - React thường xuyên re-render các component. Nếu không biết cách dùng `gsap.context()` hoặc hook `useGSAP()`, các animation sẽ bị tạo lại liên tục, gây rò rỉ bộ nhớ (memory leak) và giật khung hình.

### Tại sao KHÔNG NÊN dùng Next.js cho Portfolio này?
1. **Next.js được sinh ra cho ứng dụng lớn:** Hệ thống thương mại điện tử, mạng xã hội, SaaS, Blog tin tức hàng nghìn bài viết cần Server-Side Rendering (SSR) và Database.
2. **Xung đột lớn với thư viện chuyển động:**
   - GSAP, Lenis, WebGL, SplitType hay con trỏ chuột đều cần truy cập `window`, `document`, `navigator` của trình duyệt.
   - Khi chạy Next.js (mặc định render trên server nơi không hề có màn hình hay chuột), bạn sẽ liên tục gặp lỗi đỏ lòm:
     ```text
     ReferenceError: window is not defined
     Hydration failed because the initial UI does not match
     ```
   - Bạn sẽ phải gõ `'use client'` trên hầu hết các file và dùng dynamic import tắt SSR (`ssr: false`), làm mất đi toàn bộ ý nghĩa cốt lõi của Next.js.
3. **Deploy cồng kềnh hơn:** Tốn tài nguyên server hơn trong khi đây chỉ là trang portfolio giới thiệu tác phẩm.

---

## 4. KHUYẾN NGHỊ CUỐI CÙNG CHO BẠN

Để có một portfolio **đẹp nhất, chuyển động mượt nhất, làm nhanh nhất và ít lỗi vặt nhất**:

### ⭐ Lựa chọn số 1 (Đề xuất tối ưu nhất): **Vite + Vanilla HTML/CSS/JS**
- **Tại sao dùng Vite?**
  - Không cần cài React phức tạp, chỉ là HTML, CSS và JS thuần.
  - Nhưng có công cụ Vite giúp bạn import module cực nhanh (`import Lenis from 'lenis'`), tự động reload ngay lập tức khi sửa code (Hot Module Reload), và nén code thành bản xuất bản siêu nhẹ chỉ bằng 1 câu lệnh `npm run build`.
  - Toàn bộ các hiệu ứng: **Lenis Smooth Scroll**, **GSAP ScrollTrigger**, **Magnetic Cursor**, **Liquid Image Hover**, **Grain Noise Canvas** hoạt động trơn tru 100% với tốc độ tối đa của phần cứng.

### ⭐ Lựa chọn số 2 (Nếu bạn thích chia Component): **Vite + React** hoặc **Astro**
- Nếu bạn có kế hoạch phát triển 20-30 trang đồ án riêng biệt và muốn dùng hệ thống Component để quản lý dữ liệu JSON danh sách đồ án.
