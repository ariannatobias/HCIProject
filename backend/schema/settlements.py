# schema/settlements.py

from pydantic import BaseModel
from datetime import datetime

class SettlementCreate(BaseModel):
    payer_id: int
    receiver_id: int
    amount: float
    note: str | None = None

class SettlementOut(SettlementCreate):
    id: int
    settled_at: datetime

    class Config:
        from_attributes = True
