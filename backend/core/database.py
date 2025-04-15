from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

from core.config import settings  # Import settings from config

# Use database URL from config
DATABASE_URL = settings.DATABASE_URL

Base = declarative_base()

engine = create_engine(
    DATABASE_URL,
    pool_pre_ping=True,  # Optional: checks connection health
    pool_size=20,        # Optional: connection pool size
    max_overflow=30      # Optional: max overflow connections
)

SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine
)

def get_db():
    """
    Dependency function that yields db sessions
    """
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()