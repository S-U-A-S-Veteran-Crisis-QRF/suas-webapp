#!/usr/bin/env python3
"""
Simpler alternative: Create a relief/lithophane STL from a photo.
Uses brightness to determine depth without requiring heavy ML models.
"""

import sys
import numpy as np
from PIL import Image
import trimesh

def brightness_to_depth(image_path, max_height=20, scale=100):
    """
    Convert image brightness to a depth map.
    Brighter areas = higher elevation (simpler than ML depth estimation).
    """
    print(f"Loading image: {image_path}")
    img = Image.open(image_path).convert('RGB')

    # Resize for manageability (too large = long processing)
    max_dim = 256
    if img.width > max_dim or img.height > max_dim:
        img.thumbnail((max_dim, max_dim), Image.Resampling.LANCZOS)
        print(f"Resized image to {img.width}x{img.height}")

    # Convert to grayscale
    gray = np.array(img.convert('L')) / 255.0

    # Apply smoothing for better results
    from scipy import ndimage
    gray_smooth = ndimage.gaussian_filter(gray, sigma=1.5)

    # Invert so darker areas are lower (face contours as valleys)
    # You can toggle this if you want the opposite
    # depth_map = 1 - gray_smooth
    depth_map = gray_smooth  # Brighter = higher

    print(f"Depth map created: {depth_map.shape}")
    return depth_map, img.width, img.height

def create_mesh_from_depth(depth_map, width_mm=100, height_mm=150, max_height=20):
    """
    Create a 3D mesh from a depth map.
    """
    print("Creating 3D mesh from depth map...")

    height, width = depth_map.shape

    # Create XY grid
    x = np.linspace(0, width_mm, width)
    y = np.linspace(0, height_mm, height)
    xx, yy = np.meshgrid(x, y)

    # Scale depth to Z values
    zz = depth_map * max_height

    # Stack into vertex coordinates
    vertices = np.column_stack([xx.flatten(), yy.flatten(), zz.flatten()])

    # Create faces
    faces = []
    for i in range(height - 1):
        for j in range(width - 1):
            v0 = i * width + j
            v1 = i * width + (j + 1)
            v2 = (i + 1) * width + j
            v3 = (i + 1) * width + (j + 1)

            faces.append([v0, v1, v2])
            faces.append([v1, v3, v2])

    faces = np.array(faces)

    # Create mesh
    mesh = trimesh.Trimesh(vertices=vertices, faces=faces, process=False)

    print(f"Mesh: {len(vertices)} vertices, {len(faces)} faces")
    return mesh

def add_base(mesh, base_thickness=5, border_size=2):
    """Add a flat base for structural support."""
    print("Adding support base...")

    bounds = mesh.bounds
    min_z = bounds[0][2]
    max_z = bounds[1][2]
    min_xy = bounds[0][:2]
    max_xy = bounds[1][:2]

    # Create flat base
    base_height_center = min_z - (base_thickness / 2)
    base_extents = [
        max_xy[0] - min_xy[0] + border_size * 2,
        max_xy[1] - min_xy[1] + border_size * 2,
        base_thickness
    ]
    base_center = [
        (min_xy[0] + max_xy[0]) / 2,
        (min_xy[1] + max_xy[1]) / 2,
        base_height_center
    ]

    base = trimesh.creation.box(extents=base_extents, center=base_center)

    # Merge meshes
    mesh_final = trimesh.util.concatenate([mesh, base])
    return mesh_final

def export_stl(mesh, output_path):
    """Export to STL format."""
    print(f"Exporting STL: {output_path}")

    # Ensure mesh is valid
    mesh.remove_duplicate_faces()
    mesh.remove_degenerate_faces()

    mesh.export(output_path, file_type='stl_ascii')
    print(f"✓ STL created successfully!")
    print(f"  Model extents: {mesh.extents}")
    print(f"  File size: {__import__('os').path.getsize(output_path) / 1024:.1f} KB")

def main():
    if len(sys.argv) < 2:
        print("Usage: python photo_to_stl_simple.py <image_path> [output.stl]")
        print("Example: python photo_to_stl_simple.py photo.jpg model.stl")
        sys.exit(1)

    image_path = sys.argv[1]
    output_path = sys.argv[2] if len(sys.argv) > 2 else image_path.rsplit('.', 1)[0] + '.stl'

    try:
        # Convert brightness to depth
        depth_map, img_w, img_h = brightness_to_depth(image_path, max_height=20)

        # Create mesh
        mesh = create_mesh_from_depth(depth_map, width_mm=100, height_mm=100, max_height=20)

        # Add base
        mesh_with_base = add_base(mesh, base_thickness=5, border_size=3)

        # Export
        export_stl(mesh_with_base, output_path)

        print(f"\n✓ Ready for Bambu Studio!")
        print(f"  Tips:")
        print(f"  - Import into Bambu Studio")
        print(f"  - Adjust support density in Print Settings")
        print(f"  - Use Fine or Standard quality for best results")

    except ImportError as e:
        print(f"Missing dependency: {e}")
        print("Install with: pip install pillow scipy trimesh numpy")
        sys.exit(1)
    except Exception as e:
        print(f"Error: {e}")
        import traceback
        traceback.print_exc()
        sys.exit(1)

if __name__ == '__main__':
    main()
