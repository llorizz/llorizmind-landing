
import os
from PIL import Image

def process_favicon(input_path, output_path, size=(128, 128)):
    print(f"Processing: {input_path}")
    
    if not os.path.exists(input_path):
        print(f"Error: Input file not found at {input_path}")
        return

    try:
        img = Image.open(input_path).convert("RGBA")
        old_w, old_h = img.size
        
        # Calculate new square size
        new_size = max(old_w, old_h)
        
        # Create new transparent image
        new_img = Image.new("RGBA", (new_size, new_size), (0, 0, 0, 0))
        
        # Paste original centered
        paste_x = (new_size - old_w) // 2
        paste_y = (new_size - old_h) // 2
        
        new_img.paste(img, (paste_x, paste_y), img)
        
        # Resize to target size (High quality)
        final_img = new_img.resize(size, Image.Resampling.LANCZOS)
        
        # Ensure output directory exists
        os.makedirs(os.path.dirname(output_path), exist_ok=True)
        
        final_img.save(output_path, format="PNG")
        print(f"Success: Saved to {output_path} ({size[0]}x{size[1]})")
        
    except Exception as e:
        print(f"Error processing image: {e}")

if __name__ == "__main__":
    # CONFIGURATION
    BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    SOURCE_IMAGE = os.path.join(BASE_DIR, "assets", "images", "llorizmind_logo.png")
    DEST_IMAGE = os.path.join(BASE_DIR, "assets", "images", "favicon.png")
    
    process_favicon(SOURCE_IMAGE, DEST_IMAGE)
