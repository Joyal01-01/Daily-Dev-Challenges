"""
Multi-threaded Port Scanner
Day 2 — Cybersecurity Challenge
Author: devashmit

ETHICS NOTICE: Only scan systems you own or have explicit written permission to scan.
"""

import socket
import threading
from datetime import datetime

# Common port → service name mapping
COMMON_SERVICES = {
    21: "FTP",
    22: "SSH",
    23: "Telnet",
    25: "SMTP",
    53: "DNS",
    80: "HTTP",
    110: "POP3",
    143: "IMAP",
    443: "HTTPS",
    445: "SMB",
    3306: "MySQL",
    3389: "RDP",
    5432: "PostgreSQL",
    6379: "Redis",
    8080: "HTTP-Alt",
    8443: "HTTPS-Alt",
    27017: "MongoDB",
}

open_ports = []
lock = threading.Lock()


def scan_port(target: str, port: int) -> None:
    """Attempt a TCP connection to target:port. Record if open."""
    try:
        sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        sock.settimeout(0.5)
        result = sock.connect_ex((target, port))
        if result == 0:
            service = COMMON_SERVICES.get(port, "Unknown")
            with lock:
                open_ports.append((port, service))
                print(f"  [OPEN]  Port {port:5d}  →  {service}")
        sock.close()
    except socket.error:
        pass


def run_scan(target: str, start_port: int, end_port: int, max_threads: int = 100) -> None:
    """Scan a range of ports using a thread pool."""
    print(f"\n{'='*55}")
    print(f"  Target  : {target}")
    print(f"  Range   : {start_port} – {end_port}")
    print(f"  Threads : {max_threads}")
    print(f"  Started : {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    print(f"{'='*55}\n")

    threads = []
    for port in range(start_port, end_port + 1):
        t = threading.Thread(target=scan_port, args=(target, port), daemon=True)
        threads.append(t)
        t.start()

        # Throttle: wait for a batch before spawning more
        if len(threads) >= max_threads:
            for t in threads:
                t.join()
            threads = []

    # Wait for remaining threads
    for t in threads:
        t.join()


def export_report(target: str, start_port: int, end_port: int) -> None:
    """Write scan results to scan_report.txt."""
    report_path = "scan_report.txt"
    with open(report_path, "w") as f:
        f.write(f"Port Scan Report\n")
        f.write(f"{'='*40}\n")
        f.write(f"Target  : {target}\n")
        f.write(f"Range   : {start_port} – {end_port}\n")
        f.write(f"Date    : {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}\n")
        f.write(f"{'='*40}\n\n")

        if open_ports:
            f.write(f"Open Ports ({len(open_ports)} found):\n\n")
            for port, service in sorted(open_ports):
                f.write(f"  Port {port:5d}  →  {service}\n")
        else:
            f.write("No open ports found.\n")

    print(f"\nReport saved to: {report_path}")


def main() -> None:
    print("\n🔐 Multi-threaded Port Scanner")
    print("   Only scan systems you have permission to scan.\n")

    target = input("Enter target IP or hostname (e.g. 127.0.0.1): ").strip()

    # Resolve hostname to IP
    try:
        ip = socket.gethostbyname(target)
        if ip != target:
            print(f"   Resolved {target} → {ip}")
        target = ip
    except socket.gaierror:
        print(f"Error: Cannot resolve '{target}'. Check the address and try again.")
        return

    try:
        start_port = int(input("Start port (e.g. 1): ").strip())
        end_port = int(input("End port   (e.g. 1024): ").strip())
    except ValueError:
        print("Error: Ports must be integers.")
        return

    if not (1 <= start_port <= 65535 and 1 <= end_port <= 65535):
        print("Error: Ports must be between 1 and 65535.")
        return

    if start_port > end_port:
        start_port, end_port = end_port, start_port

    run_scan(target, start_port, end_port)

    print(f"\n{'='*55}")
    print(f"  Scan complete. {len(open_ports)} open port(s) found.")
    print(f"{'='*55}")

    export_report(target, start_port, end_port)


if __name__ == "__main__":
    main()
