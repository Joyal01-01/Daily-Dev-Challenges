"""
URL Shortener with Click Analytics — FastAPI Backend
Day 2 — Fullstack Challenge
Author: devashmit
"""

import secrets

from fastapi import FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import RedirectResponse
from pydantic import BaseModel, HttpUrl

import database

app = FastAPI(title="URL Shortener API", version="1.0.0")

# Allow the React dev server to call this API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
def startup():
    database.init_db()


# ── Schemas ──────────────────────────────────────────────────────────────────

class ShortenRequest(BaseModel):
    url: HttpUrl


class ShortenResponse(BaseModel):
    code: str
    short_url: str
    original: str


class AnalyticsItem(BaseModel):
    code: str
    original: str
    clicks: int
    created_at: str


# ── Routes ───────────────────────────────────────────────────────────────────

@app.post("/shorten", response_model=ShortenResponse, status_code=status.HTTP_201_CREATED)
def shorten_url(body: ShortenRequest):
    """Generate a 6-char short code and store the URL."""
    original = str(body.url)

    # Generate a unique code
    for _ in range(10):
        code = secrets.token_urlsafe(6)[:6]
        if not database.get_url(code):
            break
    else:
        raise HTTPException(status_code=500, detail="Could not generate unique code")

    database.insert_url(code, original)
    return ShortenResponse(
        code=code,
        short_url=f"http://localhost:8000/{code}",
        original=original,
    )


@app.get("/analytics", response_model=list[AnalyticsItem])
def get_analytics():
    """Return all shortened URLs with their click counts."""
    rows = database.get_all_urls()
    return [
        AnalyticsItem(
            code=row["code"],
            original=row["original"],
            clicks=row["clicks"],
            created_at=row["created_at"],
        )
        for row in rows
    ]


@app.get("/analytics/{code}", response_model=AnalyticsItem)
def get_analytics_for_code(code: str):
    """Return analytics for a single short code."""
    row = database.get_url(code)
    if not row:
        raise HTTPException(status_code=404, detail="Short code not found")
    return AnalyticsItem(
        code=row["code"],
        original=row["original"],
        clicks=row["clicks"],
        created_at=row["created_at"],
    )


@app.get("/{code}")
def redirect(code: str):
    """Redirect to the original URL and increment the click counter."""
    row = database.get_url(code)
    if not row:
        raise HTTPException(status_code=404, detail="Short URL not found")
    database.increment_clicks(code)
    return RedirectResponse(url=row["original"], status_code=302)
