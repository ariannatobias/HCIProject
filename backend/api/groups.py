
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from schema.groups import GroupCreate, GroupOut
from crud.groups import create_group
from core.database import SessionLocal

router = APIRouter(prefix="/groups", tags=["Groups"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
        
@router.post("/", response_model=GroupOut)
def create_new_group(group: GroupCreate, db: Session = Depends(get_db)):
    created_group = create_group(db, group)
    if not created_group:
        raise HTTPException(status_code=500, detail="Group creation failed")
    return created_group



@router.post("/raw")
async def create_raw(payload: dict):
    print("RAW payload received:", payload)
    return {"message": "Received successfully", "data": payload}

