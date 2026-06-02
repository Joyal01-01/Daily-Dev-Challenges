from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database import engine, Base
from routers.notes import router as notes_router

#database tables
Base.metadata.create_all(bind=engine)

# FastAPI app setup with CORS
app = FastAPI(title="Notes API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],   
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# this includes the subrouters
app.include_router(notes_router)
#to test wheather our backend is responding or not
@app.get("/")
def root():
    return {"message": "Notes API is running"}