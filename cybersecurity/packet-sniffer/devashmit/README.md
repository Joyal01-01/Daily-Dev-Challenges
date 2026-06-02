# 🔐 Network Packet Sniffer with Scapy — Day 1 Cybersecurity Challenge

**Issue:** [#210](https://github.com/abhishek-goswami1/Daily-Dev-Challenges/issues/210) | Week 1 | Beginner

## 📋 Description

A network packet sniffer using Scapy. Captures live packets and displays source IP, destination IP, protocol (TCP/UDP/ICMP), and payload size. Saves captures to a `.pcap` file viewable in Wireshark.

> ⚠️ **Ethics Notice:** Only use on networks you own or have explicit permission to monitor. Run with root/admin privileges.

## ✨ Features

- Captures TCP, UDP, and ICMP packets
- Displays: source IP, destination IP, protocol, payload size
- Saves to `capture.pcap` (Wireshark compatible)
- Configurable packet count and filter
- Clean formatted output

## 🧠 Concepts Practiced

`Scapy` · `TCP/IP layers` · `Packet filtering` · `PCAP format`

## 🚀 How to Run

```bash
pip install scapy
# Run with admin/root privileges
python sniffer.py
```

## 🗂 Project Structure

```
devashmit/
├── sniffer.py
├── capture.pcap    # generated on run
└── README.md
```
