from pydantic import BaseModel
from typing import Optional, List
from enum import Enum
from datetime import datetime

class SplitMethodEnum(str, Enum):
    even = "even"
    custom = "custom"
    percentage = "percentage"

class UrgencyEnum(str, Enum):
    low = "low"
    medium = "medium"
    high = "high"

class SplitEntry(BaseModel):
    user_id: int
    value: float  # Could be amount or percentage depending on method

class ExpenseCreate(BaseModel):
    name: str
    amount: float
    group_id: int
    paid_by_user_id: int
    split_method: SplitMethodEnum
    urgency: UrgencyEnum
    splits: Optional[List[SplitEntry]] = []
    receipt_url: Optional[str] = None

class ExpenseOut(BaseModel):
    id: int
    name: str
    amount: float
    group_id: int
    paid_by_user_id: int
    split_method: str
    urgency: str
    receipt_url: Optional[str]
    created_at: datetime

    class Config:
        orm_mode = True

class SplitResult(BaseModel):
    user_id: int
    amount_owed: float

class ExpenseDivvy(BaseModel):
    expense: str
    paid_by: int
    splits: List[SplitResult]
