"""
Automated File Organizer
Day 1 — Python Challenge
Author: devashmit
"""

import argparse
import logging
import os
import shutil
from pathlib import Path

# ── Extension → folder mapping ────────────────────────────────────────────────
CATEGORIES = {
    "images":    {".jpg", ".jpeg", ".png", ".gif", ".bmp", ".svg", ".webp", ".ico", ".tiff"},
    "documents": {".pdf", ".doc", ".docx", ".xls", ".xlsx", ".ppt", ".pptx", ".txt", ".md", ".csv"},
    "videos":    {".mp4", ".mov", ".avi", ".mkv", ".wmv", ".flv", ".webm"},
    "audio":     {".mp3", ".wav", ".flac", ".aac", ".ogg", ".m4a"},
    "archives":  {".zip", ".tar", ".gz", ".rar", ".7z"},
    "code":      {".py", ".js", ".ts", ".html", ".css", ".json", ".xml", ".yaml", ".yml", ".sh"},
}


def get_category(extension: str) -> str:
    """Return the category folder name for a given file extension."""
    ext = extension.lower()
    for category, extensions in CATEGORIES.items():
        if ext in extensions:
            return category
    return "others"


def setup_logging(source: Path, dry_run: bool) -> None:
    log_path = source / "organizer.log"
    mode = "DRY RUN" if dry_run else "LIVE"
    logging.basicConfig(
        filename=str(log_path),
        level=logging.INFO,
        format="%(asctime)s  %(levelname)s  %(message)s",
        datefmt="%Y-%m-%d %H:%M:%S",
    )
    logging.info(f"=== File Organizer started [{mode}] — source: {source} ===")


def organize(source: Path, dry_run: bool) -> None:
    """Scan source folder and move files into category subfolders."""
    if not source.exists():
        print(f"Error: '{source}' does not exist.")
        return

    moved = 0
    skipped = 0

    for item in source.iterdir():
        # Skip directories, the log file itself, and hidden files
        if item.is_dir() or item.name == "organizer.log" or item.name.startswith("."):
            continue

        category = get_category(item.suffix)
        dest_dir = source / category
        dest_file = dest_dir / item.name

        # Handle duplicate filenames
        counter = 1
        while dest_file.exists():
            stem = item.stem
            dest_file = dest_dir / f"{stem}_{counter}{item.suffix}"
            counter += 1

        if dry_run:
            print(f"  [DRY RUN] Would move: {item.name}  →  {category}/{dest_file.name}")
            logging.info(f"DRY RUN | {item.name} → {category}/{dest_file.name}")
        else:
            dest_dir.mkdir(exist_ok=True)
            shutil.move(str(item), str(dest_file))
            print(f"  Moved: {item.name}  →  {category}/{dest_file.name}")
            logging.info(f"MOVED   | {item.name} → {category}/{dest_file.name}")
            moved += 1

        skipped += 1 if dry_run else 0

    print(f"\n{'Preview complete' if dry_run else 'Done'}.")
    if not dry_run:
        print(f"  {moved} file(s) moved. Log saved to organizer.log")
    else:
        print(f"  {skipped} file(s) would be moved. No changes made.")


def main() -> None:
    parser = argparse.ArgumentParser(
        description="Automatically organize files in a folder by type."
    )
    parser.add_argument(
        "--source",
        type=str,
        default=".",
        help="Path to the folder to organize (default: current directory)",
    )
    parser.add_argument(
        "--dry-run",
        action="store_true",
        help="Preview changes without moving any files",
    )
    args = parser.parse_args()

    source = Path(args.source).resolve()
    setup_logging(source, args.dry_run)

    print(f"\n🐍 File Organizer")
    print(f"   Source : {source}")
    print(f"   Mode   : {'DRY RUN (no files will be moved)' if args.dry_run else 'LIVE'}\n")

    organize(source, args.dry_run)


if __name__ == "__main__":
    main()
