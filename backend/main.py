from fastapi import FastAPI
from api import users  # This assumes your api/users.py file is structured as a module

from backend.core.database import Base, engine
from models import users as user_model  # Ensure this import initializes the models

# Create database tables (runs once at startup)
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Divvy User API",
    description="Handles user registration and management",
    version="1.0.0"
)

# Include the user routes
app.include_router(users.router)