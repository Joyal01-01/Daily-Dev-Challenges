#!/usr/bin/env bash
# =============================================================================
# Bash System Monitoring Tool
# Day 3 — Cybersecurity Challenge
# Author: devashmit
#
# Usage:  ./monitor.sh
# Cron:   */5 * * * * /path/to/monitor.sh
# =============================================================================

# ── Thresholds ────────────────────────────────────────────────────────────────
CPU_WARN=70
CPU_CRIT=90
RAM_WARN=75
RAM_CRIT=90
DISK_WARN=80
DISK_CRIT=95
NET_WARN=100
NET_CRIT=500

# ── Log file ──────────────────────────────────────────────────────────────────
LOG_FILE="/var/log/sysmonitor.log"
TIMESTAMP=$(date '+%Y-%m-%d %H:%M:%S')

# ── ANSI colors ───────────────────────────────────────────────────────────────
RED='\033[0;31m'
YELLOW='\033[0;33m'
GREEN='\033[0;32m'
BOLD='\033[1m'
RESET='\033[0m'

# ── Helper: color-code a value against warn/crit thresholds ──────────────────
colorize() {
  local val=$1 warn=$2 crit=$3
  if   (( $(echo "$val >= $crit" | bc -l) )); then echo -e "${RED}${val}%${RESET}"
  elif (( $(echo "$val >= $warn" | bc -l) )); then echo -e "${YELLOW}${val}%${RESET}"
  else echo -e "${GREEN}${val}%${RESET}"
  fi
}

# ── Helper: log a line (strip ANSI for log file) ─────────────────────────────
log() {
  local msg="$1"
  echo -e "$msg"
  echo "[$TIMESTAMP] $(echo "$msg" | sed 's/\x1b\[[0-9;]*m//g')" >> "$LOG_FILE" 2>/dev/null || true
}

# ── CPU usage ─────────────────────────────────────────────────────────────────
get_cpu() {
  # Use top in batch mode, grab the idle %, subtract from 100
  local idle
  idle=$(top -bn1 | grep "Cpu(s)" | awk '{print $8}' | tr -d '%,')
  # Fallback for different top formats
  if [[ -z "$idle" ]]; then
    idle=$(top -bn1 | grep -i "cpu" | head -1 | grep -oP '\d+\.\d+\s*id' | grep -oP '\d+\.\d+')
  fi
  if [[ -z "$idle" ]]; then idle=0; fi
  local used
  used=$(echo "100 - $idle" | bc -l)
  printf "%.1f" "$used"
}

# ── RAM usage ─────────────────────────────────────────────────────────────────
get_ram() {
  free | awk '/^Mem:/ {printf "%.1f", ($3/$2)*100}'
}

# ── Disk usage ────────────────────────────────────────────────────────────────
get_disk() {
  df -h --output=target,pcent | tail -n +2 | grep -v "tmpfs\|udev\|loop"
}

# ── Network connections ───────────────────────────────────────────────────────
get_net_connections() {
  ss -tn state established 2>/dev/null | tail -n +2 | wc -l
}

# ── Main ──────────────────────────────────────────────────────────────────────
main() {
  echo ""
  log "${BOLD}╔══════════════════════════════════════╗${RESET}"
  log "${BOLD}║      System Monitor — $TIMESTAMP  ║${RESET}"
  log "${BOLD}╚══════════════════════════════════════╝${RESET}"
  echo ""

  # CPU
  local cpu
  cpu=$(get_cpu)
  log "  ${BOLD}CPU Usage:${RESET}   $(colorize "$cpu" $CPU_WARN $CPU_CRIT)"

  # RAM
  local ram
  ram=$(get_ram)
  log "  ${BOLD}RAM Usage:${RESET}   $(colorize "$ram" $RAM_WARN $RAM_CRIT)"

  # Disk
  echo ""
  log "  ${BOLD}Disk Usage:${RESET}"
  while IFS= read -r line; do
    local mount pct
    mount=$(echo "$line" | awk '{print $1}')
    pct=$(echo "$line" | awk '{print $2}' | tr -d '%')
    if [[ -n "$pct" ]]; then
      log "    $mount  $(colorize "$pct" $DISK_WARN $DISK_CRIT)"
    fi
  done <<< "$(get_disk)"

  # Network
  echo ""
  local conns
  conns=$(get_net_connections)
  local net_color
  if   (( conns >= NET_CRIT )); then net_color="${RED}"
  elif (( conns >= NET_WARN )); then net_color="${YELLOW}"
  else net_color="${GREEN}"
  fi
  log "  ${BOLD}Active Connections:${RESET}  ${net_color}${conns}${RESET}"

  echo ""
  log "${BOLD}══════════════════════════════════════════${RESET}"
  echo ""
}

main
