"""
File Upload & Image Processing API — FastAPI
Day 3 — FastAPI Challenge
Author: devashmit
"""

import io
import secrets
from datetime import date
from pathlib import Path

from fastapi import BackgroundTasks, FastAPI, HTTPException, UploadFile, status
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
from PIL import Image
from pydantic import BaseModel

app = FastAPI(title="Image Upload & Processing API", version="1.0.0")

# ── Config ────────────────────────────────────────────────────────────────────
UPLOAD_ROOT   = Path("uploads")
MAX_SIZE_MB   = 5
MAX_SIZE_BYTES = MAX_SIZE_MB * 1024 * 1024
ALLOWED_TYPES = {"image/jpeg", "image/png", "image/webp"}
ALLOWED_EXTS  = {".jpg", ".jpeg", ".png", ".webp"}

SIZES = {
    "thumbnail": (150, 150),
    "medium":    (600, 600),
    "large":     (1200, 1200),
}

# Serve processed images as static files
UPLOAD_ROOT.mkdir(exist_ok=True)
app.mount("/images", StaticFiles(directory=str(UPLOAD_ROOT)), name="images")


# ── Schemas ───────────────────────────────────────────────────────────────────

class UploadResponse(BaseModel):
    original_name: str
    thumbnail_url: str
    medium_url:    str
    large_url:     str


# ── Helpers ───────────────────────────────────────────────────────────────────

def today_folder() -> Path:
    folder = UPLOAD_ROOT / str(date.today())
    folder.mkdir(parents=True, exist_ok=True)
    return folder


def process_image(data: bytes, base_name: str, folder: Path) -> dict[str, str]:
    """Resize image to all three sizes and save. Returns dict of size → file path."""
    img = Image.open(io.BytesIO(data))
    # Convert RGBA/P to RGB for JPEG compatibility
    if img.mode in ("RGBA", "P"):
        img = img.convert("RGB")

    paths = {}
    for size_name, dimensions in SIZES.items():
        resized = img.copy()
        resized.thumbnail(dimensions, Image.LANCZOS)
        filename = f"{base_name}_{size_name}.jpg"
        out_path = folder / filename
        resized.save(out_path, "JPEG", quality=85, optimize=True)
        paths[size_name] = str(out_path)

    return paths


# ── Routes ────────────────────────────────────────────────────────────────────

@app.post("/upload", response_model=UploadResponse, status_code=status.HTTP_201_CREATED)
async def upload_image(file: UploadFile, background_tasks: BackgroundTasks):
    """
    Upload an image. Returns URLs for thumbnail, medium, and large versions.
    Accepted: JPEG, PNG, WebP. Max size: 5MB.
    """
    # Validate content type
    if file.content_type not in ALLOWED_TYPES:
        raise HTTPException(
            status_code=status.HTTP_415_UNSUPPORTED_MEDIA_TYPE,
            detail=f"Unsupported file type '{file.content_type}'. Allowed: JPEG, PNG, WebP.",
        )

    # Validate extension
    suffix = Path(file.filename).suffix.lower()
    if suffix not in ALLOWED_EXTS:
        raise HTTPException(
            status_code=status.HTTP_415_UNSUPPORTED_MEDIA_TYPE,
            detail=f"Invalid file extension '{suffix}'.",
        )

    # Read and validate size
    data = await file.read()
    if len(data) > MAX_SIZE_BYTES:
        raise HTTPException(
            status_code=status.HTTP_413_REQUEST_ENTITY_TOO_LARGE,
            detail=f"File too large. Maximum size is {MAX_SIZE_MB}MB.",
        )

    # Generate unique base name
    base_name = secrets.token_hex(8)
    folder    = today_folder()

    # Process synchronously (could move to BackgroundTasks for large files)
    try:
        paths = process_image(data, base_name, folder)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Image processing failed: {e}")

    def build_url(path: str) -> str:
        # Convert local path to URL path
        rel = Path(path).relative_to(UPLOAD_ROOT)
        return f"/images/{rel.as_posix()}"

    return UploadResponse(
        original_name=file.filename,
        thumbnail_url=build_url(paths["thumbnail"]),
        medium_url=build_url(paths["medium"]),
        large_url=build_url(paths["large"]),
    )
