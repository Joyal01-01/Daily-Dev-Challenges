"""
JWT Authentication System — FastAPI
Day 2 — FastAPI Challenge
Author: devashmit

Endpoints:
  POST /register  — create a new user
  POST /login     — returns a JWT access token
  GET  /me        — protected, returns current user info
"""

from fastapi import Depends, FastAPI, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm

from auth import create_access_token, decode_access_token, hash_password, verify_password
from models import Token, UserOut, UserRegister

app = FastAPI(title="JWT Auth API", version="1.0.0")

# In-memory user store: { username: hashed_password }
# In a real app, replace this with a database
fake_users_db: dict[str, str] = {}

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/login")


# ---------------------------------------------------------------------------
# Dependency: get the current authenticated user from the Bearer token
# ---------------------------------------------------------------------------

def get_current_user(token: str = Depends(oauth2_scheme)) -> str:
    username = decode_access_token(token)
    if username is None or username not in fake_users_db:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired token",
            headers={"WWW-Authenticate": "Bearer"},
        )
    return username


# ---------------------------------------------------------------------------
# Routes
# ---------------------------------------------------------------------------

@app.post("/register", status_code=status.HTTP_201_CREATED, response_model=UserOut)
def register(user: UserRegister) -> UserOut:
    """Register a new user. Passwords are hashed with bcrypt."""
    if user.username in fake_users_db:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Username already taken",
        )
    if len(user.password) < 6:
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail="Password must be at least 6 characters",
        )
    fake_users_db[user.username] = hash_password(user.password)
    return UserOut(username=user.username)


@app.post("/login", response_model=Token)
def login(form_data: OAuth2PasswordRequestForm = Depends()) -> Token:
    """
    Authenticate a user and return a JWT access token.
    Uses OAuth2PasswordRequestForm so it works with Swagger UI's Authorize button.
    """
    hashed = fake_users_db.get(form_data.username)
    if not hashed or not verify_password(form_data.password, hashed):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    token = create_access_token(data={"sub": form_data.username})
    return Token(access_token=token, token_type="bearer")


@app.get("/me", response_model=UserOut)
def read_me(current_user: str = Depends(get_current_user)) -> UserOut:
    """Protected endpoint — returns the currently authenticated user."""
    return UserOut(username=current_user)
