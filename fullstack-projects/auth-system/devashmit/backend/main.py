"""
JWT Auth System — FastAPI Backend
Day 3 — Fullstack Challenge
Author: devashmit

Token stored in httpOnly cookie — immune to XSS attacks.
"""

from fastapi import Cookie, FastAPI, HTTPException, Response, status
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from auth import create_token, decode_token, hash_password, verify_password

app = FastAPI(title="Auth System API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,   # required for cookies
    allow_methods=["*"],
    allow_headers=["*"],
)

# In-memory user store { username: hashed_password }
users_db: dict[str, str] = {}

COOKIE_NAME = "access_token"


# ── Schemas ───────────────────────────────────────────────────────────────────

class RegisterRequest(BaseModel):
    username: str
    password: str


class LoginRequest(BaseModel):
    username: str
    password: str


class UserOut(BaseModel):
    username: str


# ── Helpers ───────────────────────────────────────────────────────────────────

def get_current_user(access_token: str | None = Cookie(default=None)) -> str:
    if not access_token:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Not authenticated")
    username = decode_token(access_token)
    if not username or username not in users_db:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid or expired token")
    return username


# ── Routes ────────────────────────────────────────────────────────────────────

@app.post("/auth/register", response_model=UserOut, status_code=201)
def register(body: RegisterRequest):
    if body.username in users_db:
        raise HTTPException(status_code=400, detail="Username already taken")
    if len(body.password) < 6:
        raise HTTPException(status_code=422, detail="Password must be at least 6 characters")
    users_db[body.username] = hash_password(body.password)
    return UserOut(username=body.username)


@app.post("/auth/login", response_model=UserOut)
def login(body: LoginRequest, response: Response):
    hashed = users_db.get(body.username)
    if not hashed or not verify_password(body.password, hashed):
        raise HTTPException(status_code=401, detail="Incorrect username or password")

    token = create_token({"sub": body.username})

    # Set httpOnly cookie — not accessible via JavaScript (XSS safe)
    response.set_cookie(
        key=COOKIE_NAME,
        value=token,
        httponly=True,
        samesite="lax",
        max_age=3600,
    )
    return UserOut(username=body.username)


@app.post("/auth/logout")
def logout(response: Response):
    response.delete_cookie(key=COOKIE_NAME)
    return {"message": "Logged out"}


@app.get("/auth/me", response_model=UserOut)
def me(access_token: str | None = Cookie(default=None)):
    username = get_current_user(access_token)
    return UserOut(username=username)
