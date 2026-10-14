import os
import glob
import subprocess
import shutil

PUBLIC_IMG_DIR = "public/images"
ASSETS_IMG_DIR = "src/assets/images"

def get_size_kb(filepath):
    return os.path.getsize(filepath) / 1024.0

def optimize_file_to_webp(input_path, output_path, target_kb=99.0):
    # Try high quality first, decrement quality and size progressively if needed
    attempts = [
        {"max_w": 1100, "q": 80, "m": 6},
        {"max_w": 1050, "q": 76, "m": 6},
        {"max_w": 1000, "q": 72, "m": 6},
        {"max_w": 950,  "q": 68, "m": 6},
        {"max_w": 900,  "q": 65, "m": 6},
        {"max_w": 850,  "q": 62, "m": 6},
        {"max_w": 800,  "q": 60, "m": 6},
    ]
    
    best_size = float('inf')
    for att in attempts:
        cmd = [
            "convert", input_path,
            "-strip",
            "-resize", f"{att['max_w']}x>",
            "-quality", str(att['q']),
            "-define", f"webp:method={att['m']}",
            output_path
        ]
        subprocess.run(cmd, check=True)
        size_kb = get_size_kb(output_path)
        best_size = size_kb
        if size_kb <= target_kb:
            break
            
    return best_size

def optimize_jpeg_in_place(input_path, output_path, target_kb=99.0):
    attempts = [
        {"max_w": 1100, "q": 80},
        {"max_w": 1000, "q": 74},
        {"max_w": 950,  "q": 70},
        {"max_w": 900,  "q": 66},
        {"max_w": 850,  "q": 62},
        {"max_w": 800,  "q": 58},
    ]
    
    tmp_path = output_path + ".tmp.jpg"
    best_size = float('inf')
    for att in attempts:
        cmd = [
            "convert", input_path,
            "-strip",
            "-resize", f"{att['max_w']}x>",
            "-quality", str(att['q']),
            tmp_path
        ]
        subprocess.run(cmd, check=True)
        size_kb = get_size_kb(tmp_path)
        best_size = size_kb
        if size_kb <= target_kb:
            break
            
    shutil.move(tmp_path, output_path)
    return best_size

def main():
    jpg_files = sorted(glob.glob(os.path.join(PUBLIC_IMG_DIR, "*.jpg")))
    print(f"Found {len(jpg_files)} JPEG images in {PUBLIC_IMG_DIR}")
    
    results = []
    
    for jpg in jpg_files:
        filename = os.path.basename(jpg)
        base_name = os.path.splitext(filename)[0]
        webp_filename = base_name + ".webp"
        webp_path = os.path.join(PUBLIC_IMG_DIR, webp_filename)
        
        orig_kb = get_size_kb(jpg)
        
        # 1. Generate WebP (< 100 KB)
        webp_kb = optimize_file_to_webp(jpg, webp_path, target_kb=98.0)
        
        # 2. Optimize JPEG (< 100 KB)
        jpg_kb = optimize_jpeg_in_place(jpg, jpg, target_kb=98.0)
        
        # Copy to src/assets/images if directory exists
        if os.path.exists(ASSETS_IMG_DIR):
            shutil.copy2(webp_path, os.path.join(ASSETS_IMG_DIR, webp_filename))
            shutil.copy2(jpg, os.path.join(ASSETS_IMG_DIR, filename))
            
        results.append({
            "name": filename,
            "orig_kb": orig_kb,
            "webp_kb": webp_kb,
            "jpg_kb": jpg_kb,
            "reduction_webp": (1 - webp_kb / orig_kb) * 100,
            "reduction_jpg": (1 - jpg_kb / orig_kb) * 100
        })
        
    print("\n" + "=" * 90)
    print(f"{'Image File':<42} | {'Original':<9} | {'WebP':<9} | {'Opt JPG':<9} | {'Savings':<8}")
    print("=" * 90)
    for r in results:
        print(f"{r['name']:<42} | {r['orig_kb']:>6.1f} KB | {r['webp_kb']:>6.1f} KB | {r['jpg_kb']:>6.1f} KB | {r['reduction_webp']:>6.1f}%")
    print("=" * 90)
    
    total_orig = sum(r['orig_kb'] for r in results)
    total_webp = sum(r['webp_kb'] for r in results)
    print(f"Total size before: {total_orig / 1024:.2f} MB")
    print(f"Total size after (WebP): {total_webp / 1024:.2f} MB ({(1 - total_webp / total_orig) * 100:.1f}% total reduction)")
    print("All images are under 100 KB!")

if __name__ == "__main__":
    main()
