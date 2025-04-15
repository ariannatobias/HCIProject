# from sqlalchemy.orm import Session
# from models.users import User
# from schema.users import UserCreate
# from fastapi import HTTPException

# def create_user(db: Session, user: UserCreate):
#     # Check if user already exists
#     existing_user = db.query(User).filter(User.email == user.email).first()
#     if existing_user:
#         raise HTTPException(status_code=400, detail="Email already registered")

#     existing_phone = db.query(User).filter(User.phone_number == user.phone_number).first()
#     if existing_phone:
#         raise HTTPException(status_code=400, detail="Phone number already registered")

#     new_user = User(**user.dict())
#     db.add(new_user)
#     db.commit()
#     db.refresh(new_user)
#     return new_user

# def get_user(db: Session, user_id: int):
#     user = db.query(User).filter(User.id == user_id).first()
#     if not user:
#         raise HTTPException(status_code=404, detail="User not found")
#     return user

# def get_all_users(db: Session):
#     return db.query(User).all()

# def update_user(db: Session, user_id: int, updated_data: UserCreate):
#     user = db.query(User).filter(User.id == user_id).first()
#     if not user:
#         raise HTTPException(status_code=404, detail="User not found")

#     for key, value in updated_data.dict().items():
#         setattr(user, key, value)

#     db.commit()
#     db.refresh(user)
#     return user

# def delete_user(db: Session, user_id: int):
#     user = db.query(User).filter(User.id == user_id).first()
#     if not user:
#         raise HTTPException(status_code=404, detail="User not found")

#     db.delete(user)
#     db.commit()
#     return {"detail": "User deleted successfully"}


# crud/users.py
from sqlalchemy.orm import Session
from models import users as user_model
from schema import users as user_schema
from passlib.hash import bcrypt

def create_user(db: Session, user: user_schema.UserCreate):
    hashed_pw = bcrypt.hash(user.password)
    db_user = user_model.User(
        first_name=user.first_name,
        last_name=user.last_name,
        dob=user.dob,
        phone=user.phone,
        email=user.email,
        password=user.password
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def get_user_by_email(db: Session, email: str):
    return db.query(user_model.User).filter(user_model.User.email == email).first()
