# 🔐 Bash System Monitoring Tool — Day 3 Cybersecurity Challenge

**Issue:** [#231](https://github.com/abhishek-goswami1/Daily-Dev-Challenges/issues/231) | Week 1 | Intermediate

## 📋 Description

A Bash script that monitors CPU usage, RAM usage, disk space, and active network connections. Color-coded alerts when any metric exceeds a threshold. Designed to run as a cron job every 5 minutes. Logs to `/var/log/sysmonitor.log`.

## ✨ Features

- CPU usage monitoring with % threshold alert
- RAM usage monitoring
- Disk space monitoring per mount point
- Active network connections count
- ANSI color codes: 🟢 green = healthy, 🟡 yellow = warning, 🔴 red = danger
- Logs every run to `/var/log/sysmonitor.log`
- Cron job setup instructions included

## 🧠 Concepts Practiced

`Bash scripting` · `top/free/df/ss` · `Cron jobs` · `ANSI colors`

## 🚀 How to Run

```bash
chmod +x monitor.sh
./monitor.sh

# Add to cron (every 5 minutes):
# */5 * * * * /path/to/monitor.sh
```

## 🗂 Project Structure

```
devashmit/
├── monitor.sh
└── README.md
```
