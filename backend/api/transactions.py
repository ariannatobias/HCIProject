# api/transactions.py

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from core.database import SessionLocal
from schema.transactions import DashboardSummary
from crud.transactions import get_dashboard_summary
from typing import List
from schema.transactions import RecentTransaction
from crud.transactions import get_recent_transactions

router = APIRouter(prefix="/transactions", tags=["Transactions"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/summary/{user_id}", response_model=DashboardSummary)
def dashboard_summary(user_id: int, db: Session = Depends(get_db)):
    return get_dashboard_summary(db, user_id)
# api/transactions.py (append)


@router.get("/recent/{user_id}", response_model=List[RecentTransaction])
def recent_transactions(user_id: int, db: Session = Depends(get_db)):
    return get_recent_transactions(db, user_id)
