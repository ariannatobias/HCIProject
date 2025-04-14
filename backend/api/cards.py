from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from . import schemas, crud, database

router = APIRouter(
    prefix="/payment-methods",
    tags=["Payment Methods"]
)

def get_db():
    db = database.SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/", response_model=schemas.PaymentMethodResponse)
def add_payment_method(payment: schemas.PaymentMethodCreate, db: Session = Depends(get_db)):
    return crud.create_payment_method(db, payment)

@router.get("/user/{user_id}", response_model=list[schemas.PaymentMethodResponse])
def get_user_methods(user_id: int, db: Session = Depends(get_db)):
    return crud.get_user_payment_methods(db, user_id)

@router.get("/{payment_id}", response_model=schemas.PaymentMethodResponse)
def get_payment(payment_id: int, db: Session = Depends(get_db)):
    payment = crud.get_payment_method(db, payment_id)
    if not payment:
        raise HTTPException(status_code=404, detail="Payment method not found")
    return payment

@router.delete("/{payment_id}")
def delete_payment(payment_id: int, db: Session = Depends(get_db)):
    deleted = crud.delete_payment_method(db, payment_id)
    if not deleted:
        raise HTTPException(status_code=404, detail="Payment method not found")
    return {"message": "Deleted successfully"}
