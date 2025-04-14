from sqlalchemy.orm import Session
from . import models, schemas

def create_payment_method(db: Session, payment: schemas.PaymentMethodCreate):
    db_payment = models.PaymentMethod(**payment.dict())
    db.add(db_payment)
    db.commit()
    db.refresh(db_payment)
    return db_payment

def get_user_payment_methods(db: Session, user_id: int):
    return db.query(models.PaymentMethod).filter(models.PaymentMethod.user_id == user_id).all()

def get_payment_method(db: Session, payment_id: int):
    return db.query(models.PaymentMethod).filter(models.PaymentMethod.id == payment_id).first()

def delete_payment_method(db: Session, payment_id: int):
    payment = db.query(models.PaymentMethod).filter(models.PaymentMethod.id == payment_id).first()
    if payment:
        db.delete(payment)
        db.commit()
    return payment
