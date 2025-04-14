from fastapi import APIRouter, Depends, HTTPException, Request
from sqlalchemy.orm import Session
from schema.users import UserLogin, UserResponse
from models.users import User
from core.database import get_db
import logging

router = APIRouter(prefix="/login", tags=["Login"])
logger = logging.getLogger("api.login")

@router.post("/", response_model=UserResponse)
def login_user(
    request: Request,
    user_credentials: UserLogin,
    db: Session = Depends(get_db)
):
    logger.info(f"Login attempt - Email: {user_credentials.email}, IP: {request.client.host}")
    
    db_user = db.query(User).filter(User.email == user_credentials.email).first()

    if not db_user:
        logger.warning(f"Login failed - Email not found: {user_credentials.email}")
        raise HTTPException(status_code=401, detail="Invalid email or password")

    if db_user.password != user_credentials.password:
        logger.warning(f"Login failed - Incorrect password for email: {user_credentials.email}")
        raise HTTPException(status_code=401, detail="Invalid email or password")

    logger.info(f"Login successful - User ID: {db_user.id}, Email: {db_user.email}")
    return db_user
