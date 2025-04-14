from fastapi import FastAPI

from api import users, login, group # This assumes your api/users.py file is structured as a module
from fastapi.middleware.cors import CORSMiddleware

import sys
import os

# sys.path.append(os.path.dirname(os.path.abspath(__file__)))
# sys.path.append(os.path.join(os.path.dirname(os.path.abspath(__file__)), ".."))



from core.database import Base, engine
from models import users as user_model  # Ensure this import initializes the models
# from models import group  # 👈 This must be BEFORE create_all


# Create database tables (runs once at startup)
print("🚀 Using DB:", engine.url)

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Divvy User API",
    description="Handles user registration and management",
    version="1.0.0"
)


# app = FastAPI(...)

# Allow React Native access
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Or limit to mobile device IPs
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Include the user routes
app.include_router(users.router)
app.include_router(login.router)
app.include_router(group.router)