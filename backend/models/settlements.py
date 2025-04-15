# models/settlements.py

from sqlalchemy import Column, Integer, Float, ForeignKey, String, DateTime
from sqlalchemy.sql import func
from core.database import Base

class Settlement(Base):
    __tablename__ = "settlements"
    id = Column(Integer, primary_key=True, index=True)
    payer_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    receiver_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    amount = Column(Float, nullable=False)
    note = Column(String, nullable=True)
    settled_at = Column(DateTime, default=func.now())
