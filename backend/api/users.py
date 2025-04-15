# from fastapi import APIRouter, Depends
# from sqlalchemy.orm import Session
# from schema.users import UserCreate, UserResponse, UserLogin
# from crud import users as user_crud
# from core.database import get_db

# router = APIRouter(prefix="/users", tags=["Users"])

# # @router.post("/", response_model=UserResponse)
# # def create_user(user: UserCreate, db: Session = Depends(get_db)):
# #     print()
# #     return user_crud.create_user(db, user)

# # @router.get("/{user_id}", response_model=UserResponse)
# # def get_user(user_id: int, db: Session = Depends(get_db)):
# #     return user_crud.get_user(db, user_id)

# @router.get("/", response_model=list[UserResponse])
# def get_all_users(db: Session = Depends(get_db)):
#      return user_crud.get_all_users(db)

# # @router.put("/{user_id}", response_model=UserResponse)
# # def update_user(user_id: int, user: UserCreate, db: Session = Depends(get_db)):
# #     return user_crud.update_user(db, user_id, user)

# # @router.delete("/{user_id}")
# # def delete_user(user_id: int, db: Session = Depends(get_db)):
# #     return user_crud.delete_user(db, user_id)

# from fastapi import APIRouter, Depends, HTTPException, Request
# from sqlalchemy.orm import Session
# from schema.users import UserCreate, UserResponse
# from crud import users as user_crud
# from core.database import get_db
# import logging
# from models.users import User

# router = APIRouter(prefix="/users", tags=["Users"])
# logger = logging.getLogger("api.users")

# @router.post("/", response_model=UserResponse)
# async def create_user(
#     request: Request,
#     user: UserCreate, 
#     db: Session = Depends(get_db)
# ):
#     """Endpoint for user registration with detailed logging"""
#     try:
#         # Log incoming request
#         logger.info(f"Registration attempt - Email: {user.email}, IP: {request.client.host}")
#         logger.debug(f"Request headers: {dict(request.headers)}")
#         logger.debug(f"Raw user input: {user.dict()}")

#         # Create user
#         db_user = user_crud.create_user(db, user)
        
#         # Log successful creation
#         logger.info(f"User created - ID: {db_user.id}, Email: {db_user.email}")
#         return db_user

#     except HTTPException as he:
#         logger.warning(f"Registration failed - {he.detail}")
#         raise
#     except Exception as e:
#         logger.error(f"Unexpected error during registration: {str(e)}")
#         raise HTTPException(status_code=500, detail="Internal server error")

# @router.get("/{user_id}", response_model=UserResponse)
# def get_user(user_id: int, db: Session = Depends(get_db)):
#     """Endpoint to fetch user by ID with logging"""
#     logger.info(f"Fetching user with ID: {user_id}")
#     user = user_crud.get_user(db, user_id)
#     if not user:
#         logger.warning(f"User not found - ID: {user_id}")
#     return user

# @router.post("/login", response_model=UserResponse)
# def login(user: UserLogin, db: Session = Depends(get_db)):
#     db_user = db.query(User).filter(User.email == user.email).first()
#     if not db_user or db_user.password != user.password:
#         raise HTTPException(status_code=401, detail="Invalid email or password")
#     return db_user
# # Add similar logging to other endpoints...

# @router.get("/", response_model=list[UserResponse])
# def get_all_users(db: Session = Depends(get_db)):
#     return user_crud.get_all_users(db)

# from fastapi import APIRouter, Depends, HTTPException
# from sqlalchemy.orm import Session
# from typing import List

# from core.database import get_db
# from schema import group as schemas
# from models import group as models
# from models.users import User
# from core.dependencies import get_current_user

# router = APIRouter(prefix="/users", tags=["Users"])

# @router.post("/", response_model=schemas.GroupOut)
# def create_group(
#     group: schemas.GroupCreate, 
#     db: Session = Depends(get_db),
#     current_user: User = Depends(get_current_user)
# ):
#     # Ensure all member IDs exist
#     member_ids = list(set(group.member_ids))  # Remove duplicates
#     users = db.query(User).filter(User.id.in_(member_ids)).all()
    
#     if len(users) != len(member_ids):
#         missing_ids = set(member_ids) - {u.id for u in users}
#         raise HTTPException(
#             status_code=400,
#             detail=f"Users not found: {missing_ids}"
#         )
    
#     # Add current user to the group members
#     if current_user.id not in member_ids:
#         users.append(current_user)
    
#     db_group = models.Group(name=group.name, members=users)
#     db.add(db_group)
#     db.commit()
#     db.refresh(db_group)
#     return schemas.GroupOut.from_orm(db_group)

# @router.get("/", response_model=List[schemas.GroupOut])
# def read_groups(
#     db: Session = Depends(get_db),
#     current_user: User = Depends(get_current_user)
# ):
#     # Only return groups the current user is a member of
#     groups = db.query(models.Group).filter(
#         models.Group.members.any(id=current_user.id)
#     ).all()
#     return [schemas.GroupOut.from_orm(group) for group in groups]

# @router.get("/{group_id}", response_model=schemas.GroupOut)
# def read_group(
#     group_id: int,
#     db: Session = Depends(get_db),
#     current_user: User = Depends(get_current_user)
# ):
#     group = db.query(models.Group).filter(
#         models.Group.id == group_id,
#         models.Group.members.any(id=current_user.id)
#     ).first()
    
#     if not group:
#         raise HTTPException(
#             status_code=404,
#             detail="Group not found or you don't have access"
#         )
#     return schemas.GroupOut.from_orm(group)

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from schema.users import UserCreate, UserResponse
from crud import users as user_crud
from core.database import get_db
from typing import List

router = APIRouter(prefix="/users", tags=["Users"])

@router.post("/", response_model=UserResponse)
def create_user(user: UserCreate, db: Session = Depends(get_db)):
    return user_crud.create_user(db, user)

@router.get("/", response_model=List[UserResponse])
def get_all_users(db: Session = Depends(get_db)):
    return user_crud.get_all_users(db)
