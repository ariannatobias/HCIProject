# api/settlements.py

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from schema.settlements import SettlementCreate, SettlementOut
from core.database import SessionLocal
from crud.settlements import create_settlement, get_user_settlements
from typing import List

router = APIRouter(prefix="/settlements", tags=["Settlements"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
@router.post("/", response_model=SettlementOut)
def settle_up(data: SettlementCreate, db: Session = Depends(get_db)):
    return create_settlement(db, data)

@router.get("/{user_id}", response_model=List[SettlementOut])
def get_settlements(user_id: int, db: Session = Depends(get_db)):
    return get_user_settlements(db, user_id)
