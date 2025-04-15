# api/expenses.py
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from schema.expenses import ExpenseCreate, ExpenseOut
from crud.expenses import create_expense
from core.database import SessionLocal
from typing import List

from crud.expenses import get_group_divvy
from schema.expenses import ExpenseDivvy
router = APIRouter(prefix="/expenses", tags=["Expenses"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/", response_model=ExpenseOut)
def create_expense_endpoint(expense: ExpenseCreate, db: Session = Depends(get_db)):
    return create_expense(db, expense)

@router.get("/divvy/{group_id}", response_model=List[ExpenseDivvy])
def get_divvy_by_group(group_id: int, db: Session = Depends(get_db)):
    return get_group_divvy(db, group_id)
