from pydantic import BaseModel
from datetime import datetime

class DashboardSummary(BaseModel):
    user_id: int
    you_owe: float
    you_are_owed: float



class RecentTransaction(BaseModel):
    expense_name: str
    amount: float
    created_at: datetime
    paid_by: int
