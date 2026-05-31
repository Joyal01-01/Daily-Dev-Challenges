"""
SQLite database helpers for the URL shortener.
"""

import sqlite3
from contextlib import contextmanager

DB_PATH = "urls.db"


def init_db() -> None:
    """Create the urls table if it doesn't exist."""
    with get_conn() as conn:
        conn.execute(
            """
            CREATE TABLE IF NOT EXISTS urls (
                code        TEXT PRIMARY KEY,
                original    TEXT NOT NULL,
                clicks      INTEGER NOT NULL DEFAULT 0,
                created_at  TEXT NOT NULL DEFAULT (datetime('now'))
            )
            """
        )


@contextmanager
def get_conn():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    try:
        yield conn
        conn.commit()
    finally:
        conn.close()


def insert_url(code: str, original: str) -> None:
    with get_conn() as conn:
        conn.execute(
            "INSERT INTO urls (code, original) VALUES (?, ?)",
            (code, original),
        )


def get_url(code: str) -> sqlite3.Row | None:
    with get_conn() as conn:
        return conn.execute(
            "SELECT * FROM urls WHERE code = ?", (code,)
        ).fetchone()


def increment_clicks(code: str) -> None:
    with get_conn() as conn:
        conn.execute(
            "UPDATE urls SET clicks = clicks + 1 WHERE code = ?", (code,)
        )


def get_all_urls() -> list[sqlite3.Row]:
    with get_conn() as conn:
        return conn.execute(
            "SELECT * FROM urls ORDER BY created_at DESC"
        ).fetchall()
