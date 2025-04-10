from fastapi import FastAPI, Depends, HTTPException
from fastapi.responses import Response
from sqlalchemy.orm import Session
from . import models, schemas, database

# Create tables in the database 
models.Base.metadata.create_all(bind=database.engine)

# Initialize FastAPI app
app = FastAPI()

# Favicon route handler
@app.get("/favicon.ico")
def favicon():
    return Response(status_code=204)

# Dependency to get DB session
def get_db():
    db = database.SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Favicon route handler
@app.get("/favicon.ico")
def favicon():
    return Response(status_code=204)

# Testing to see if messages work
@app.get("/")
def read_root():
    return {"message": "Welcome to the homepage!"}

# get DB session
def get_db():
    db = database.SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Sample endpoint to create a group
@app.post("/groups/", response_model=schemas.Group)
def create_group(group: schemas.GroupCreate, db: Session = Depends(get_db)):
    db_group = models.Groups(**group.dict())
    db.add(db_group)
    db.commit()
    db.refresh(db_group)
    return db_group

# Add similar CRUD routes below...

@app.post("/members/", response_model=schemas.Member)
def create_member(member: schemas.MemberCreate, db: Session = Depends(get_db)):
    db_member = models.Member(**member.dict())
    db.add(db_member)
    db.commit()
    db.refresh(db_member)
    return db_member

@app.post("/payments/send/", response_model=schemas.PaymentSend)
def create_payment_send(payment: schemas.PaymentSendCreate, db: Session = Depends(get_db)):
    db_payment = models.PaymentSend(**payment.dict())
    db.add(db_payment)
    db.commit()
    db.refresh(db_payment)
    return db_payment

@app.post("/payments/receive/", response_model=schemas.PaymentReceive)
def create_payment_receive(payment: schemas.PaymentReceiveCreate, db: Session = Depends(get_db)):
    db_payment = models.PaymentReceive(**payment.dict())
    db.add(db_payment)
    db.commit()
    db.refresh(db_payment)
    return db_payment

@app.post("/member-payments/send/")
def create_member_payment_send(data: schemas.MemberPaymentSendCreate, db: Session = Depends(get_db)):
    db_entry = models.MemberPaymentSend(**data.dict())
    db.add(db_entry)
    db.commit()
    return {"message": "Member payment send record created."}

@app.post("/member-payments/receive/")
def create_member_payment_receive(data: schemas.MemberPaymentReceiveCreate, db: Session = Depends(get_db)):
    db_entry = models.MemberPaymentReceive(**data.dict())
    db.add(db_entry)
    db.commit()
    return {"message": "Member payment receive record created."}

