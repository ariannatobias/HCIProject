# crud/settlements.py

from models.settlements import Settlement
from schema.settlements import SettlementCreate
from sqlalchemy.orm import Session

def create_settlement(db: Session, data: SettlementCreate):
    new_settlement = Settlement(**data.dict())
    db.add(new_settlement)
    db.commit()
    db.refresh(new_settlement)
    return new_settlement

def get_user_settlements(db: Session, user_id: int):
    return db.query(Settlement).filter(
        (Settlement.payer_id == user_id) | (Settlement.receiver_id == user_id)
    ).order_by(Settlement.settled_at.desc()).all()
