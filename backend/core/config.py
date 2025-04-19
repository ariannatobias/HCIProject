# Import BaseSettings from Pydantic v2 to create a configuration class
from pydantic_settings import BaseSettings  # ✅ New location in Pydantic v2+
from typing import Optional
from datetime import timedelta
import secrets  # Useful for generating secure random tokens

# Define a Settings class that loads environment variables or uses default values
class Settings(BaseSettings):
    # 🚀 DATABASE CONFIGURATION
    DATABASE_URL: str = "postgresql://postgres:divvy@localhost:5432/divvy"
    # Can be overridden by a .env file or OS-level environment variable

    # 🔐 AUTHENTICATION CONFIGURATION
    SECRET_KEY: str = "ymQ3Y6fV8qJtRwXyZ2s5v8y_B1E3H5M7Q9TbWeUcRfTg"
    # Used to sign JWT tokens. In production, this should be a securely generated secret.
    
    ALGORITHM: str = "HS256"
    # JWT signing algorithm

    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 7
    # Access token lifetime set to 7 days

    # 🌐 CORS CONFIGURATION
    BACKEND_CORS_ORIGINS: list = ["*"]
    # Allows all origins during development. In production, set this to specific frontend domains.

    # 📧 EMAIL CONFIGURATION (optional — only used if sending emails)
    SMTP_HOST: Optional[str] = None
    SMTP_PORT: Optional[int] = None
    SMTP_USER: Optional[str] = None
    SMTP_PASSWORD: Optional[str] = None
    EMAILS_FROM_EMAIL: Optional[str] = None

    # ⚙️ INNER CONFIGURATION FOR PYDANTIC
    class Config:
        case_sensitive = True  # Environment variables must match case
        env_file = ".env"      # Optional: load variables from a .env file at the project root

# Create a `settings` instance that can be imported and used across the project
settings = Settings()