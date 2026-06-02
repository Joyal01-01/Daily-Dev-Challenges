"""
Network Packet Sniffer with Scapy
Day 1 — Cybersecurity Challenge
Author: devashmit

ETHICS NOTICE: Only use on networks you own or have explicit permission to monitor.
Run with root/administrator privileges.
"""

from scapy.all import IP, TCP, UDP, ICMP, sniff, wrpcap

PCAP_FILE = "capture.pcap"
captured_packets = []

PROTOCOL_MAP = {
    6:   "TCP",
    17:  "UDP",
    1:   "ICMP",
}


def packet_callback(packet) -> None:
    """Called for each captured packet. Displays and stores it."""
    if not packet.haslayer(IP):
        return

    ip_layer = packet[IP]
    src_ip   = ip_layer.src
    dst_ip   = ip_layer.dst
    proto_num = ip_layer.proto
    protocol  = PROTOCOL_MAP.get(proto_num, f"OTHER({proto_num})")

    # Payload size = total IP length minus IP header length
    payload_size = len(ip_layer.payload)

    print(
        f"  [{protocol:<5}]  {src_ip:<18} → {dst_ip:<18}  "
        f"payload: {payload_size} bytes"
    )

    captured_packets.append(packet)


def main() -> None:
    print("\n🔐 Network Packet Sniffer")
    print("   Only use on networks you own or have permission to monitor.")
    print("   Requires root/administrator privileges.\n")

    try:
        count = int(input("How many packets to capture? (e.g. 20): ").strip())
        pfilter = input("BPF filter (e.g. 'tcp', 'udp', or leave blank for all): ").strip()
    except ValueError:
        print("Invalid input. Using defaults: 20 packets, no filter.")
        count = 20
        pfilter = ""

    print(f"\n  Capturing {count} packet(s)... (Ctrl+C to stop early)\n")

    try:
        sniff(
            filter=pfilter if pfilter else None,
            prn=packet_callback,
            count=count,
            store=False,
        )
    except KeyboardInterrupt:
        print("\n  Capture interrupted by user.")
    except PermissionError:
        print("\nError: Permission denied. Run with root/administrator privileges.")
        return

    if captured_packets:
        wrpcap(PCAP_FILE, captured_packets)
        print(f"\n✅ Captured {len(captured_packets)} packet(s).")
        print(f"   Saved to: {PCAP_FILE}  (open with Wireshark)")
    else:
        print("\nNo packets captured.")


if __name__ == "__main__":
    main()
