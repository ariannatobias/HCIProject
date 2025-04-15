# models/expenses.py
from sqlalchemy import Column, Integer, String, Float, ForeignKey, DateTime, Enum
from sqlalchemy.orm import relationship
from core.database import Base
import enum
from datetime import datetime

# models/expenses.py

class SplitMethod(enum.Enum):
    even = "even"
    custom = "custom"
    percentage = "percentage"

class UrgencyLevel(enum.Enum):
    low = "low"
    medium = "medium"
    high = "high"


class Expense(Base):
    __tablename__ = "expenses"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    amount = Column(Float, nullable=False)
    group_id = Column(Integer, ForeignKey("groups.id"))
    paid_by_user_id = Column(Integer, ForeignKey("users.id"))
    split_method = Column(Enum(SplitMethod))
    urgency = Column(Enum(UrgencyLevel))
    receipt_url = Column(String, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    splits = relationship("ExpenseSplit", back_populates="expense")

class ExpenseSplit(Base):
    __tablename__ = "expense_splits"
    id = Column(Integer, primary_key=True, index=True)
    expense_id = Column(Integer, ForeignKey("expenses.id"))
    user_id = Column(Integer, ForeignKey("users.id"))
    amount_owed = Column(Float, nullable=False)

    expense = relationship("Expense", back_populates="splits")
