# Import FastAPI framework to build the web API
from fastapi import FastAPI

# Import routers for different API modules
from api import users, groups, expenses, transactions, settlements

# Import SQLAlchemy base class and engine for database setup
from core.database import Base, engine

# Import SQLAlchemy models to ensure tables are created during app startup
from models import users as user_model
from models import groups as group_model
from models import expenses as expense_model

# Import login router separately
from api import login

# Import middleware to enable Cross-Origin Resource Sharing (CORS)
from fastapi.middleware.cors import CORSMiddleware

# Create all database tables defined in the SQLAlchemy models
Base.metadata.create_all(bind=engine)

# Initialize the FastAPI app instance
app = FastAPI()

# Enable CORS for all origins and HTTP methods to allow frontend to communicate with backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],             
    allow_credentials=True,         
    allow_methods=["*"],            
    allow_headers=["*"],            
)

# Register the routers from each API module to modularize endpoints
app.include_router(users.router)
app.include_router(groups.router)
app.include_router(expenses.router)
app.include_router(transactions.router)
app.include_router(login.router)
app.include_router(settlements.router)