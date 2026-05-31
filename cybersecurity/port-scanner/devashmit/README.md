# 🔐 Multi-threaded Port Scanner — Day 2 Cybersecurity Challenge

**Issue:** [#219](https://github.com/abhishek-goswami1/Daily-Dev-Challenges/issues/219) | Week 1 | Beginner

## 📋 Description

A multi-threaded port scanner built in Python using `socket` and `threading`. Scans a given IP for open ports in a specified range, displays service names for common ports, and exports a scan report.

> ⚠️ **Ethics Notice:** Only scan systems you own or have explicit written permission to scan. Unauthorized port scanning may be illegal.

## ✨ Features

- Multi-threaded scanning for speed (configurable thread count)
- 0.5s timeout per port to prevent hanging
- Service name lookup for common ports (HTTP, HTTPS, SSH, FTP, etc.)
- Exports scan report to `scan_report.txt`
- Clean CLI output with open/closed status

## 🧠 Concepts Practiced

- `socket` for TCP connection attempts
- `threading` for concurrent scanning
- TCP handshake basics
- Service enumeration

## 🚀 How to Run

```bash
python port_scanner.py
```

You will be prompted for a target IP and port range. Example: scan `127.0.0.1` ports `1-1024`.

## 🗂 Project Structure

```
devashmit/
├── port_scanner.py
├── scan_report.txt    # generated on run
└── README.md
```
