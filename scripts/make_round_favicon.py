import os
from PIL import Image, ImageOps, ImageDraw

def make_round_favicon(image_path):
    try:
        # Open image
        img = Image.open(image_path).convert("RGBA")
        
        # Create mask
        mask = Image.new("L", img.size, 0)
        draw = ImageDraw.Draw(mask)
        draw.ellipse((0, 0) + img.size, fill=255)
        
        # Apply mask
        output = ImageOps.fit(img, mask.size, centering=(0.5, 0.5))
        output.putalpha(mask)
        
        # Save overwrite
        output.save(image_path)
        print(f"Successfully updated favicon at {image_path}")
        
    except Exception as e:
        print(f"Error processing image: {e}")

if __name__ == "__main__":
    # Define path relative to project root or absolute
    # Assuming script is run from project root or handling absolute paths
    base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__))) # Go up from scripts/
    favicon_path = os.path.join(base_dir, "assets", "images", "favicon.png")
    
    if os.path.exists(favicon_path):
        make_round_favicon(favicon_path)
    else:
        print(f"Favicon not found at {favicon_path}")
