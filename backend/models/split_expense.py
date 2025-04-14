from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey, Enum
from sqlalchemy.orm import relationship
from backend.core.database import Base
import enum
from datetime import datetime

class UrgencyEnum(enum.Enum):
    Low = "Low"
    Medium = "Medium"
    High = "High"

class Expense(Base):
    __tablename__ = "expenses"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    amount = Column(Float, nullable=False)
    group_id = Column(Integer, ForeignKey("groups.id"), nullable=False)
    paid_by_member_id = Column(Integer, ForeignKey("members.id"), nullable=False)
    notes = Column(String)
    urgency = Column(Enum(UrgencyEnum), default="Medium")
    receipt_url = Column(String)
    date = Column(DateTime, default=datetime.utcnow)

    splits = relationship("ExpenseSplit", back_populates="expense")

class ExpenseSplit(Base):
    __tablename__ = "expense_splits"

    id = Column(Integer, primary_key=True, index=True)
    expense_id = Column(Integer, ForeignKey("expenses.id"), nullable=False)
    member_id = Column(Integer, ForeignKey("members.id"), nullable=False)
    amount = Column(Float, nullable=False)
    percentage = Column(Float)

    expense = relationship("Expense", back_populates="splits")
