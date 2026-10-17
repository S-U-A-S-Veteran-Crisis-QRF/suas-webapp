# Photo to STL Converter for Bambu 3D Printer

Convert 2D photos into 3D-printable models with depth for your Bambu Lab printer.

## Quick Start

### Option 1: Simple (Recommended for first-time)
Uses brightness/contrast for depth estimation - no ML required:

```bash
# Install dependencies
pip install pillow scipy trimesh numpy

# Convert photo to STL
python scripts/photo_to_stl_simple.py your_photo.jpg output_model.stl

# Import output_model.stl into Bambu Studio
```

### Option 2: Advanced
Uses AI depth estimation (MiDaS) for more accurate results - requires PyTorch:

```bash
# Install dependencies (large download ~2GB)
pip install torch torchvision opencv-python trimesh numpy pillow scipy

# Convert photo to STL
python scripts/photo_to_stl.py your_photo.jpg output_model.stl
```

## How It Works

### Simple Method
- Converts image to grayscale
- Uses brightness as elevation data
- Brighter areas = higher points
- Adds flat support base

**Best for:** Portraits, people, artistic effects

### Advanced Method
- Uses Intel's MiDaS depth estimation model
- AI predicts 3D structure from single photo
- More accurate spatial relationships
- Better for complex scenes

**Best for:** Better geometric accuracy, scenes with depth

## Output Details

Your STL will have:
- **Model size:** ~100mm width (adjustable in script)
- **Max height:** 20mm (adjustable)
- **Support base:** 5mm thick with border for stability
- **Format:** ASCII STL (can import into any 3D software)

## Importing into Bambu Studio

1. Open Bambu Studio
2. **File → Import Model**
3. Select your `.stl` file
4. Adjust in plate:
   - **Rotation:** Rotate to best orientation
   - **Scale:** Resize if needed (Settings → Model → Scale)
5. **Supports:**
   - Bambu's auto-support usually works well
   - Use **Support Density: Standard** or **High** for detailed areas
   - For faces: consider **Tree supports** for cleaner finish
6. **Material:**
   - PLA works great for these
   - TPU can give nice flexible details
   - PETG for strength
7. **Print Settings:**
   - Quality: **Fine** (0.12mm) or **Standard** (0.16mm) for detail
   - Infill: 15-20% (enough for strength)
   - Speed: Standard or slow for detail

## Customization

Edit the scripts to adjust:

```python
# Model dimensions
scale=100,              # Width in mm
max_height=20,          # Max elevation in mm

# Depth processing
base_thickness=5,       # Support base thickness
border_size=3,          # Extra border around model

# Image processing
sigma=1.5,              # Smoothing (higher = smoother, less detail)
```

## Tips for Best Results

1. **Photo quality matters:**
   - Use high-resolution, well-lit photos
   - Good contrast = better depth
   - Avoid harsh shadows unless intentional

2. **Orientation:**
   - Portrait orientation works well
   - Profile/side view can give interesting results

3. **Post-processing:**
   - Clean up supports in Bambu Studio's preview
   - Adjust support interface spacing if needed

4. **Print settings:**
   - First time? Use Standard quality
   - Faces work great at 0.12mm layers

## Troubleshooting

**STL file is too large/complex:**
- Edit script: reduce image size before processing
- Increase `sigma` value for more smoothing
- Reduce max_height for flatter model

**Not enough detail:**
- Reduce `sigma` value (more detail but noisier)
- Use Advanced method (MiDaS) instead
- Try high-contrast source image

**Model unstable during printing:**
- Increase `base_thickness` in script
- Increase `border_size` for wider base
- Check support placement in Bambu Studio

**Dependencies won't install:**
- Ensure Python 3.8+: `python --version`
- For PyTorch issues, visit pytorch.org for platform-specific installer
- Try: `pip install --upgrade pip`

## Next Steps

1. Save your photo as `photo.jpg` in this directory
2. Run: `python scripts/photo_to_stl_simple.py photo.jpg output.stl`
3. Import `output.stl` into Bambu Studio
4. Set up supports and print!

Questions? Check the scripts' source code - they're well-commented.
