import os
import pypdfium2 as pdfium
from PIL import Image

pdf_path = "design-source/CV (1).pdf"
pdf = pdfium.PdfDocument(pdf_path)
total_pages = len(pdf)
print(f"Loaded PDF: {total_pages} pages")

# Định nghĩa các khoảng trang (1-indexed theo lời bạn Diễm)
# Trang 1: Hero
# Trang 2: About
# Trang 3-14: Pj1 (12 trang)
# Trang 15-22: Pj2 (8 trang)
# Trang 23-29: Pj3 (7 trang)
# Trang 30-39: Pj4 (10 trang)
# Trang 40-42: Pj5 (3 trang)
# Trang 43-57: Pj6 (15 trang)

os.makedirs("public/assets/pages", exist_ok=True)
for i in range(1, 7):
    os.makedirs(f"public/assets/projects/project-0{i}", exist_ok=True)

def render_page(page_idx, scale=2.5):
    page = pdf[page_idx]
    # Render thành bitmap
    bitmap = page.render(scale=scale)
    pil_img = bitmap.to_pil()
    return pil_img

print("Đang render Trang 1 (Hero)...")
hero_img = render_page(0, scale=2.5)
hero_img.save("public/assets/pages/hero.webp", "WEBP", quality=88, method=6)
print("✓ Đã lưu hero.webp")

print("Đang render Trang 2 (About)...")
about_img = render_page(1, scale=2.5)
about_img.save("public/assets/pages/about.webp", "WEBP", quality=88, method=6)
print("✓ Đã lưu about.webp")

project_ranges = [
    (1, 3, 14),   # Pj 1: trang 3 đến 14
    (2, 15, 22),  # Pj 2: trang 15 đến 22
    (3, 23, 29),  # Pj 3: trang 23 đến 29
    (4, 30, 39),  # Pj 4: trang 30 đến 39
    (5, 40, 42),  # Pj 5: trang 40 đến 42
    (6, 43, 57),  # Pj 6: trang 43 đến 57
]

for pj_num, start_p, end_p in project_ranges:
    folder = f"public/assets/projects/project-0{pj_num}"
    count = end_p - start_p + 1
    print(f"\n--- Đang xuất Dự án {pj_num} ({count} trang: {start_p} -> {end_p}) ---")
    
    for idx, page_num in enumerate(range(start_p, end_p + 1)):
        p_idx = page_num - 1 # 0-indexed
        img = render_page(p_idx, scale=2.2)
        
        # Lưu page-XX.webp
        filename = f"{folder}/page-{idx+1:02d}.webp"
        img.save(filename, "WEBP", quality=82, method=4)
        
        # Nếu là trang đầu tiên của dự án, lưu thêm làm cover và thumbnail
        if idx == 0:
            cover_path = f"{folder}/cover.webp"
            img.save(cover_path, "WEBP", quality=85, method=4)
            
            # Thumbnail nhẹ cho lưới 6 ô trang chủ
            thumb = img.copy()
            thumb.thumbnail((900, 900), Image.Resampling.LANCZOS)
            thumb.save(f"{folder}/cover-thumb.webp", "WEBP", quality=80)
            
        print(f"  ✓ Trang {page_num} -> {filename}")

print("\n🎉 Hoàn thành xuất toàn bộ 57 trang thành công!")
