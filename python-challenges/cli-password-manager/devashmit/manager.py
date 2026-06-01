"""
CLI Password Manager
Day 3 — Python Challenge
Author: devashmit

Commands:
  python manager.py add     — add a new entry
  python manager.py get     — retrieve a password
  python manager.py list    — list all sites
  python manager.py delete  — delete an entry
"""

import argparse
import base64
import getpass
import json
import os
import sys
from pathlib import Path

from cryptography.fernet import Fernet, InvalidToken
from cryptography.hazmat.primitives.kdf.pbkdf2 import PBKDF2HMAC
from cryptography.hazmat.primitives import hashes

VAULT_FILE = Path("vault.json")
SALT_SIZE  = 16


# ── Key derivation ────────────────────────────────────────────────────────────

def derive_key(passphrase: str, salt: bytes) -> bytes:
    """Derive a Fernet key from a passphrase using PBKDF2HMAC."""
    kdf = PBKDF2HMAC(
        algorithm=hashes.SHA256(),
        length=32,
        salt=salt,
        iterations=480_000,
    )
    return base64.urlsafe_b64encode(kdf.derive(passphrase.encode()))


# ── Vault I/O ─────────────────────────────────────────────────────────────────

def load_vault() -> dict:
    if not VAULT_FILE.exists():
        return {"salt": None, "entries": {}}
    with open(VAULT_FILE) as f:
        return json.load(f)


def save_vault(vault: dict) -> None:
    with open(VAULT_FILE, "w") as f:
        json.dump(vault, f, indent=2)


def get_fernet(vault: dict, passphrase: str) -> Fernet:
    """Return a Fernet instance using the vault's salt + the given passphrase."""
    salt = bytes.fromhex(vault["salt"])
    key  = derive_key(passphrase, salt)
    return Fernet(key)


# ── Commands ──────────────────────────────────────────────────────────────────

def cmd_add(args) -> None:
    vault = load_vault()
    passphrase = getpass.getpass("Master passphrase: ")

    # First-time setup: generate and store a salt
    if vault["salt"] is None:
        salt = os.urandom(SALT_SIZE)
        vault["salt"] = salt.hex()
        save_vault(vault)
        print("  Vault created.")

    f = get_fernet(vault, passphrase)

    site     = input("Site/service name: ").strip()
    username = input("Username/email:    ").strip()
    password = getpass.getpass("Password:          ")

    if not site:
        print("Error: site name cannot be empty.")
        sys.exit(1)

    encrypted = f.encrypt(password.encode()).decode()
    vault["entries"][site] = {"username": username, "password": encrypted}
    save_vault(vault)
    print(f"  ✅ Entry saved for '{site}'.")


def cmd_get(args) -> None:
    vault = load_vault()
    if not vault["salt"]:
        print("Vault is empty. Use 'add' first.")
        sys.exit(1)

    site = input("Site/service name: ").strip()
    if site not in vault["entries"]:
        print(f"  No entry found for '{site}'.")
        sys.exit(1)

    passphrase = getpass.getpass("Master passphrase: ")
    f = get_fernet(vault, passphrase)

    try:
        entry     = vault["entries"][site]
        decrypted = f.decrypt(entry["password"].encode()).decode()
        print(f"\n  Site:     {site}")
        print(f"  Username: {entry['username']}")
        print(f"  Password: {decrypted}\n")
    except InvalidToken:
        print("  ❌ Wrong passphrase.")
        sys.exit(1)


def cmd_list(args) -> None:
    vault = load_vault()
    entries = vault.get("entries", {})
    if not entries:
        print("  Vault is empty.")
        return
    print(f"\n  Stored entries ({len(entries)}):\n")
    for i, site in enumerate(sorted(entries), 1):
        print(f"  {i:2}. {site}  ({entries[site]['username']})")
    print()


def cmd_delete(args) -> None:
    vault = load_vault()
    if not vault["salt"]:
        print("Vault is empty.")
        sys.exit(1)

    site = input("Site to delete: ").strip()
    if site not in vault["entries"]:
        print(f"  No entry found for '{site}'.")
        sys.exit(1)

    passphrase = getpass.getpass("Master passphrase (to confirm): ")
    f = get_fernet(vault, passphrase)

    # Verify passphrase by decrypting any entry
    try:
        f.decrypt(vault["entries"][site]["password"].encode())
    except InvalidToken:
        print("  ❌ Wrong passphrase.")
        sys.exit(1)

    del vault["entries"][site]
    save_vault(vault)
    print(f"  ✅ Entry for '{site}' deleted.")


# ── CLI ───────────────────────────────────────────────────────────────────────

def main() -> None:
    parser = argparse.ArgumentParser(
        description="CLI Password Manager — encrypted with Fernet + PBKDF2HMAC"
    )
    sub = parser.add_subparsers(dest="command", required=True)
    sub.add_parser("add",    help="Add a new entry")
    sub.add_parser("get",    help="Retrieve a password")
    sub.add_parser("list",   help="List all stored sites")
    sub.add_parser("delete", help="Delete an entry")

    args = parser.parse_args()
    dispatch = {"add": cmd_add, "get": cmd_get, "list": cmd_list, "delete": cmd_delete}
    dispatch[args.command](args)


if __name__ == "__main__":
    main()
