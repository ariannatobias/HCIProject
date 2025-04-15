from sqlalchemy import Column, Integer, String, Date
from core.database import Base

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    first_name = Column(String)
    last_name = Column(String)
    dob = Column(Date)
    phone = Column(String)
    email = Column(String, unique=True, index=True)
    password = Column(String)
