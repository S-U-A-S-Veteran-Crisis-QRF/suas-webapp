#!/usr/bin/env python3
"""
Convert a 2D photo to a 3D STL file for 3D printing.
Uses depth estimation and creates a relief model.
"""

import sys
import numpy as np
from PIL import Image
import cv2
import trimesh

def install_dependencies():
    """Install required packages if not present."""
    import subprocess
    packages = [
        'torch',
        'torchvision',
        'opencv-python',
        'trimesh',
        'numpy',
        'pillow'
    ]
    for package in packages:
        try:
            __import__(package.replace('-', '_'))
        except ImportError:
            print(f"Installing {package}...")
            subprocess.check_call([sys.executable, '-m', 'pip', 'install', package])

def estimate_depth(image_path, model_type='dpt_large'):
    """
    Estimate depth from a single image using MiDaS.
    model_type options: 'dpt_large', 'dpt_hybrid', 'midas_v21', 'midas_v21_small'
    """
    print(f"Loading image from {image_path}")
    image = cv2.imread(image_path)
    if image is None:
        raise FileNotFoundError(f"Could not load image: {image_path}")

    print(f"Estimating depth using {model_type}...")

    # Load MiDaS model
    torch = __import__('torch')

    # Use MiDaS via torch.hub
    midas = torch.hub.load("intel-isl/MiDaS", model_type)
    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
    midas.to(device)
    midas.eval()

    # Load transforms
    midas_transforms = torch.hub.load("intel-isl/MiDaS", "transforms")
    transform = midas_transforms.dpt_transform if 'dpt' in model_type else midas_transforms.small_transform

    # Prepare image
    img_rgb = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
    input_batch = transform(img_rgb).to(device)

    # Inference
    with torch.no_grad():
        prediction = midas(input_batch)
        prediction = torch.nn.functional.interpolate(
            prediction.unsqueeze(1),
            size=img_rgb.shape[:2],
            mode="bicubic",
            align_corners=False,
        ).squeeze()

    # Normalize depth
    depth = prediction.cpu().numpy()
    depth = (depth - depth.min()) / (depth.max() - depth.min())

    return depth, img_rgb

def create_mesh_from_depth(depth_map, image_rgb=None, scale=100, max_height=50):
    """
    Create a 3D mesh from a depth map.

    Args:
        depth_map: Normalized depth map (0-1)
        image_rgb: Optional RGB image to use as texture coordinates
        scale: XY scale of the model
        max_height: Maximum Z height in mm
    """
    print("Creating 3D mesh from depth map...")

    height, width = depth_map.shape

    # Create vertex grid
    x = np.linspace(0, scale, width)
    y = np.linspace(0, scale, height)
    xx, yy = np.meshgrid(x, y)

    # Scale depth to Z values
    zz = depth_map * max_height

    # Flatten for vertices
    vertices = np.column_stack([xx.flatten(), yy.flatten(), zz.flatten()])

    # Create faces (triangles) by connecting adjacent vertices
    faces = []
    for i in range(height - 1):
        for j in range(width - 1):
            # Current quad vertices
            v0 = i * width + j
            v1 = i * width + (j + 1)
            v2 = (i + 1) * width + j
            v3 = (i + 1) * width + (j + 1)

            # Two triangles per quad
            faces.append([v0, v1, v2])
            faces.append([v1, v3, v2])

    faces = np.array(faces)

    # Create mesh
    mesh = trimesh.Trimesh(vertices=vertices, faces=faces)

    # Clean up mesh
    mesh.remove_duplicate_faces()
    mesh.remove_degenerate_faces()
    mesh.remove_infinite_values()

    print(f"Mesh created: {len(vertices)} vertices, {len(faces)} faces")

    return mesh

def add_base_and_border(mesh, thickness=5, height=5):
    """Add a base to the mesh for structural integrity."""
    print("Adding base for structural support...")

    # Get mesh bounds
    bounds = mesh.bounds
    min_pt = bounds[0]
    max_pt = bounds[1]

    # Create base box
    base_height = min_pt[2] - height
    base_z = (min_pt[2] + base_height) / 2

    base_size = [max_pt[0] - min_pt[0] + thickness * 2,
                 max_pt[1] - min_pt[1] + thickness * 2,
                 height]
    base_center = [
        (min_pt[0] + max_pt[0]) / 2,
        (min_pt[1] + max_pt[1]) / 2,
        base_z
    ]

    base = trimesh.creation.box(extents=base_size, center=base_center)

    # Combine meshes
    mesh_combined = trimesh.util.concatenate([mesh, base])

    return mesh_combined

def export_stl(mesh, output_path):
    """Export mesh to STL file."""
    print(f"Exporting to {output_path}...")
    mesh.export(output_path)
    print(f"STL file created successfully: {output_path}")

def main():
    if len(sys.argv) < 2:
        print("Usage: python photo_to_stl.py <image_path> [output_path]")
        print("Example: python photo_to_stl.py photo.jpg photo_model.stl")
        sys.exit(1)

    image_path = sys.argv[1]
    output_path = sys.argv[2] if len(sys.argv) > 2 else image_path.rsplit('.', 1)[0] + '.stl'

    try:
        # Estimate depth
        depth_map, img_rgb = estimate_depth(image_path, model_type='dpt_hybrid')

        # Create mesh
        mesh = create_mesh_from_depth(
            depth_map,
            image_rgb=img_rgb,
            scale=100,  # 100mm width
            max_height=20  # 20mm max height
        )

        # Add base for printing
        mesh_with_base = add_base_and_border(mesh, thickness=3, height=5)

        # Fix any mesh issues
        mesh_with_base.remove_duplicate_faces()
        mesh_with_base.remove_degenerate_faces()
        mesh_with_base.fill_holes()

        # Export
        export_stl(mesh_with_base, output_path)

        print(f"\n✓ Done! File ready for Bambu Studio: {output_path}")
        print(f"  Model size: {mesh_with_base.extents}")

    except Exception as e:
        print(f"Error: {e}", file=sys.stderr)
        import traceback
        traceback.print_exc()
        sys.exit(1)

if __name__ == '__main__':
    main()
