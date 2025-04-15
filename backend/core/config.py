from pydantic_settings import BaseSettings  # ✅ New location in Pydantic v2+
from typing import Optional
from datetime import timedelta
import secrets

class Settings(BaseSettings):
    # Database configuration
    DATABASE_URL: str = "postgresql://postgres:divvy@localhost:5432/divvy"
    
    # Authentication configuration
    SECRET_KEY: str = "ymQ3Y6fV8qJtRwXyZ2s5v8y_B1E3H5M7Q9TbWeUcRfTg"  # Generate a strong key in production
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 7  # 7 days
    
    # CORS configuration
    BACKEND_CORS_ORIGINS: list = ["*"]  # Adjust for production
    
    # Email configuration (if needed)
    SMTP_HOST: Optional[str] = None
    SMTP_PORT: Optional[int] = None
    SMTP_USER: Optional[str] = None
    SMTP_PASSWORD: Optional[str] = None
    EMAILS_FROM_EMAIL: Optional[str] = None
    
    class Config:
        case_sensitive = True
        env_file = ".env"  # For environment variable overrides

settings = Settings()