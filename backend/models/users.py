from sqlalchemy import Column, Integer, String, Date
from sqlalchemy.orm import relationship
from core.database import Base
from .group import group_members  # 👈 Circular-safe import

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    first_name = Column(String, nullable=False)
    last_name = Column(String, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    date_of_birth = Column(Date, nullable=False)
    phone_number = Column(String, unique=True, nullable=False)
    password = Column(String, nullable=False)

    groups = relationship("Group", secondary=group_members, back_populates="members")
