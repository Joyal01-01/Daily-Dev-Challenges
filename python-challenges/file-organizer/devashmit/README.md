# 🐍 Automated File Organizer — Day 1 Python Challenge

**Issue:** [#207](https://github.com/abhishek-goswami1/Daily-Dev-Challenges/issues/207) | Week 1 | Beginner

## 📋 Description

A CLI tool that scans a folder and automatically sorts files into subfolders by extension: `/images`, `/documents`, `/videos`, `/others`. Logs every move to a `.log` file. Supports a `--dry-run` flag to preview changes without moving anything.

## ✨ Features

- Sorts files into `images/`, `documents/`, `videos/`, `others/`
- Logs every move to `organizer.log`
- `--dry-run` flag previews changes without touching files
- `--source` flag to specify target folder (defaults to current dir)
- Handles duplicate filenames safely

## 🧠 Concepts Practiced

`os module` · `shutil` · `argparse` · `logging`

## 🚀 How to Run

```bash
# Dry run — preview only
python organizer.py --source /path/to/folder --dry-run

# Actually move files
python organizer.py --source /path/to/folder
```

## 🗂 Project Structure

```
devashmit/
├── organizer.py
├── organizer.log    # generated on run
└── README.md
```
