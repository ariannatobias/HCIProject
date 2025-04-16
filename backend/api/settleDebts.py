from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
import crud, schemas
from database import get_db

router = APIRouter()

# ----- Group Endpoints -----

@router.post("/groups/", response_model=schemas.Group)
def create_group(group: schemas.GroupCreate, db: Session = Depends(get_db)):
    return crud.create_group(db, group)

@router.get("/groups/", response_model=list[schemas.Group])
def read_groups(db: Session = Depends(get_db)):
    return crud.get_groups(db)

@router.get("/groups/{group_id}/", response_model=schemas.Group)
def read_group(group_id: int, db: Session = Depends(get_db)):
    group = crud.get_group(db, group_id)
    if group is None:
        raise HTTPException(status_code=404, detail="Group not found")
    return group

@router.get("/groups/{group_id}/members/", response_model=list[schemas.Member])
def get_group_members(group_id: int, db: Session = Depends(get_db)):
    return crud.get_members_by_group(db, group_id)

@router.get("/groups/{group_id}/debts/total", response_model=float)
def get_total_debt(group_id: int, db: Session = Depends(get_db)):
    return crud.calculate_total_debt(db, group_id)

@router.post("/members/", response_model=schemas.Member)
def create_member(member: schemas.MemberCreate, db: Session = Depends(get_db)):
    return crud.create_member(db, member)