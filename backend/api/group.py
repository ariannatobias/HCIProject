from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from core.database import get_db
from schema import group as schemas
from crud import group as crud

router = APIRouter(prefix="/groups", tags=["Groups"])

@router.post("/", response_model=schemas.GroupOut)
def create_group(group: schemas.GroupCreate, db: Session = Depends(get_db)):
    db_group = crud.create_group(db, group)
    return schemas.GroupOut.from_orm(db_group)


@router.get("/", response_model=list[schemas.GroupOut])
def read_groups(db: Session = Depends(get_db)):
    groups = crud.get_groups(db)
    return [schemas.GroupOut.from_orm(group) for group in groups]


@router.get("/{group_id}", response_model=schemas.GroupOut)
def read_group(group_id: int, db: Session = Depends(get_db)):
    group = crud.get_group_by_id(db, group_id)
    if not group:
        raise HTTPException(status_code=404, detail="Group not found")
    return schemas.GroupOut.from_orm(group)


