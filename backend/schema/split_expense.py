from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime
from enum import Enum

class UrgencyEnum(str, Enum):
    Low = "Low"
    Medium = "Medium"
    High = "High"

class ExpenseSplitCreate(BaseModel):
    member_id: int
    amount: float
    percentage: Optional[float]

class ExpenseCreate(BaseModel):
    name: str
    amount: float
    group_id: int
    paid_by_member_id: int
    notes: Optional[str]
    urgency: UrgencyEnum = UrgencyEnum.Medium
    receipt_url: Optional[str]
    date: datetime
    splits: List[ExpenseSplitCreate]

class ExpenseSplitResponse(ExpenseSplitCreate):
    id: int

    class Config:
        orm_mode = True

class ExpenseResponse(BaseModel):
    id: int
    name: str
    amount: float
    group_id: int
    paid_by_member_id: int
    notes: Optional[str]
    urgency: UrgencyEnum
    receipt_url: Optional[str]
    date: datetime
    splits: List[ExpenseSplitResponse]

    class Config:
        orm_mode = True
