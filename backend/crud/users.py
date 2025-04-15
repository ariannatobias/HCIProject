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
