from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from schema.users import UserCreate, UserResponse, UserLogin
from crud import users as user_crud
from core.database import get_db

router = APIRouter(prefix="/users", tags=["Users"])

# @router.post("/", response_model=UserResponse)
# def create_user(user: UserCreate, db: Session = Depends(get_db)):
#     print()
#     return user_crud.create_user(db, user)

# @router.get("/{user_id}", response_model=UserResponse)
# def get_user(user_id: int, db: Session = Depends(get_db)):
#     return user_crud.get_user(db, user_id)

# @router.get("/", response_model=list[UserResponse])
# def get_all_users(db: Session = Depends(get_db)):
#     return user_crud.get_all_users(db)

# @router.put("/{user_id}", response_model=UserResponse)
# def update_user(user_id: int, user: UserCreate, db: Session = Depends(get_db)):
#     return user_crud.update_user(db, user_id, user)

# @router.delete("/{user_id}")
# def delete_user(user_id: int, db: Session = Depends(get_db)):
#     return user_crud.delete_user(db, user_id)

from fastapi import APIRouter, Depends, HTTPException, Request
from sqlalchemy.orm import Session
from schema.users import UserCreate, UserResponse
from crud import users as user_crud
from core.database import get_db
import logging
from models.users import User

router = APIRouter(prefix="/users", tags=["Users"])
logger = logging.getLogger("api.users")

@router.post("/", response_model=UserResponse)
async def create_user(
    request: Request,
    user: UserCreate, 
    db: Session = Depends(get_db)
):
    """Endpoint for user registration with detailed logging"""
    try:
        # Log incoming request
        logger.info(f"Registration attempt - Email: {user.email}, IP: {request.client.host}")
        logger.debug(f"Request headers: {dict(request.headers)}")
        logger.debug(f"Raw user input: {user.dict()}")

        # Create user
        db_user = user_crud.create_user(db, user)
        
        # Log successful creation
        logger.info(f"User created - ID: {db_user.id}, Email: {db_user.email}")
        return db_user

    except HTTPException as he:
        logger.warning(f"Registration failed - {he.detail}")
        raise
    except Exception as e:
        logger.error(f"Unexpected error during registration: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error")

@router.get("/{user_id}", response_model=UserResponse)
def get_user(user_id: int, db: Session = Depends(get_db)):
    """Endpoint to fetch user by ID with logging"""
    logger.info(f"Fetching user with ID: {user_id}")
    user = user_crud.get_user(db, user_id)
    if not user:
        logger.warning(f"User not found - ID: {user_id}")
    return user

@router.post("/login", response_model=UserResponse)
def login(user: UserLogin, db: Session = Depends(get_db)):
    db_user = db.query(User).filter(User.email == user.email).first()
    if not db_user or db_user.password != user.password:
        raise HTTPException(status_code=401, detail="Invalid email or password")
    return db_user
# Add similar logging to other endpoints...

@router.get("/", response_model=list[UserResponse])
def get_all_users(db: Session = Depends(get_db)):
    return user_crud.get_all_users(db)
