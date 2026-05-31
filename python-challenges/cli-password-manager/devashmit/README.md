# 🐍 CLI Password Manager — Day 3 Python Challenge

**Issue:** [#228](https://github.com/abhishek-goswami1/Daily-Dev-Challenges/issues/228) | Week 1 | Intermediate

## 📋 Description

A terminal password manager with add, get, list, and delete commands. Passwords are encrypted using Fernet symmetric encryption. The master key is derived from a passphrase using PBKDF2HMAC. All data stored in a local encrypted JSON file.

## ✨ Features

- `add` — add a new entry (site, username, password)
- `get` — retrieve a password by site name
- `list` — list all stored sites
- `delete` — remove an entry
- Fernet encryption for all stored passwords
- PBKDF2HMAC key derivation from master passphrase
- `getpass` for secure password input (no echo)

## 🧠 Concepts Practiced

`Fernet encryption` · `PBKDF2HMAC` · `getpass` · `JSON storage`

## 🚀 How to Run

```bash
pip install cryptography
python manager.py add
python manager.py get
python manager.py list
python manager.py delete
```

## 🗂 Project Structure

```
devashmit/
├── manager.py
├── vault.json      # created on first use (encrypted)
└── README.md
```
