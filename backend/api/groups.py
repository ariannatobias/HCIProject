# # # from fastapi import APIRouter, Depends, HTTPException
# # # from sqlalchemy.orm import Session
# # # from core.database import get_db
# # # from schema import group as schemas
# # # from crud import group as crud

# # # router = APIRouter(prefix="/groups", tags=["Groups"])

# # # # @router.post("/", response_model=schemas.GroupOut)
# # # # def create_group(group: schemas.GroupCreate, db: Session = Depends(get_db)):
# # # #     db_group = crud.create_group(db, group)
# # # #     return schemas.GroupOut.from_orm(db_group)

# # # # In your FastAPI groups router
# # # @router.post("/", response_model=schemas.GroupOut)
# # # def create_group(
# # #     group: schemas.GroupCreate, 
# # #     db: Session = Depends(get_db),
# # #     current_user: models.User = Depends(get_current_user)  # Use your auth dependency
# # # ):
# # #     # The creator is automatically added to the group
# # #     member_ids = list(set(group.member_ids + [current_user.id]))
    
# # #     users = db.query(models.User).filter(models.User.id.in_(member_ids)).all()
# # #     if len(users) != len(member_ids):
# # #         raise HTTPException(status_code=400, detail="Some users not found")
    
# # #     db_group = models.Group(name=group.name, members=users)
# # #     db.add(db_group)
# # #     db.commit()
# # #     db.refresh(db_group)
# # #     return db_group

# # # @router.get("/", response_model=list[schemas.GroupOut])
# # # def read_groups(db: Session = Depends(get_db)):
# # #     groups = crud.get_groups(db)
# # #     return [schemas.GroupOut.from_orm(group) for group in groups]


# # # @router.get("/{group_id}", response_model=schemas.GroupOut)
# # # def read_group(group_id: int, db: Session = Depends(get_db)):
# # #     group = crud.get_group_by_id(db, group_id)
# # #     if not group:
# # #         raise HTTPException(status_code=404, detail="Group not found")
# # #     return schemas.GroupOut.from_orm(group)


# # from fastapi import APIRouter, Depends, HTTPException
# # from sqlalchemy.orm import Session
# # from typing import List

# # from core.database import get_db
# # from schema import group as schemas
# # from models import group as models
# # from models.users import User
# # from core.dependencies import get_current_user

# # router = APIRouter(prefix="/groups", tags=["Groups"])

# # @router.post("/", response_model=schemas.GroupOut)
# # def create_group(
# #     group: schemas.GroupCreate, 
# #     db: Session = Depends(get_db),
# #     current_user: User = Depends(get_current_user)
# # ):
# #     # Ensure all member IDs exist
# #     member_ids = list(set(group.member_ids))  # Remove duplicates
# #     users = db.query(User).filter(User.id.in_(member_ids)).all()
    
# #     if len(users) != len(member_ids):
# #         missing_ids = set(member_ids) - {u.id for u in users}
# #         raise HTTPException(
# #             status_code=400,
# #             detail=f"Users not found: {missing_ids}"
# #         )
    
# #     # Add current user to the group members
# #     if current_user.id not in member_ids:
# #         users.append(current_user)
    
# #     db_group = models.Group(name=group.name, members=users)
# #     db.add(db_group)
# #     db.commit()
# #     db.refresh(db_group)
# #     return schemas.GroupOut.from_orm(db_group)

# # @router.get("/", response_model=List[schemas.GroupOut])
# # def read_groups(
# #     db: Session = Depends(get_db),
# #     current_user: User = Depends(get_current_user)
# # ):
# #     # Only return groups the current user is a member of
# #     groups = db.query(models.Group).filter(
# #         models.Group.members.any(id=current_user.id)
# #     ).all()
# #     return [schemas.GroupOut.from_orm(group) for group in groups]

# # @router.get("/{group_id}", response_model=schemas.GroupOut)
# # def read_group(
# #     group_id: int,
# #     db: Session = Depends(get_db),
# #     current_user: User = Depends(get_current_user)
# # ):
# #     group = db.query(models.Group).filter(
# #         models.Group.id == group_id,
# #         models.Group.members.any(id=current_user.id)
# #     ).first()
    
# #     if not group:
# #         raise HTTPException(
# #             status_code=404,
# #             detail="Group not found or you don't have access"
# #         )
# #     return schemas.GroupOut.from_orm(group)

# from fastapi import APIRouter, Depends, HTTPException
# from sqlalchemy.orm import Session
# from typing import List

# from core.database import get_db
# from backend.schema import groups as schemas
# from backend.models import groups as models
# from models.users import User
# from core.dependencies import get_current_user

# router = APIRouter(prefix="/groups", tags=["Groups"])

# # @router.post("/", response_model=schemas.GroupOut)
# # def create_group(
# #     group: schemas.GroupCreate, 
# #     db: Session = Depends(get_db),
# #     current_user: User = Depends(get_current_user)
# # ):
# #     member_ids = list(set(group.member_ids))
# #     users = db.query(User).filter(User.id.in_(member_ids)).all()

# #     if len(users) != len(member_ids):
# #         missing_ids = set(member_ids) - {u.id for u in users}
# #         raise HTTPException(
# #             status_code=400,
# #             detail=f"Users not found: {missing_ids}"
# #         )

# #     if current_user.id not in member_ids:
# #         users.append(current_user)

# #     db_group = models.Group(name=group.name, members=users)
# #     db.add(db_group)
# #     db.commit()
# #     db.refresh(db_group)
# #     return schemas.GroupOut.from_orm(db_group)

# @router.post("/", response_model=schemas.GroupOut)
# def create_group(
#     group: schemas.GroupCreate, 
#     db: Session = Depends(get_db)
# ):
#     member_ids = list(set(group.member_ids))  # Remove duplicates
#     users = db.query(User).filter(User.id.in_(member_ids)).all()

#     if len(users) != len(member_ids):
#         missing_ids = set(member_ids) - {u.id for u in users}
#         raise HTTPException(
#             status_code=400,
#             detail=f"Users not found: {missing_ids}"
#         )
    
#     db_group = models.Group(name=group.name, members=users)
#     db.add(db_group)
#     db.commit()
#     db.refresh(db_group)
#     return schemas.GroupOut.from_orm(db_group)


# # @router.get("/", response_model=List[schemas.GroupOut])
# # def read_groups(
# #     db: Session = Depends(get_db),
# #     current_user: User = Depends(get_current_user)
# # ):
# #     groups = db.query(models.Group).filter(
# #         models.Group.members.any(id=current_user.id)
# #     ).all()
# #     return [schemas.GroupOut.from_orm(group) for group in groups]

# @router.get("/", response_model=List[schemas.GroupOut])
# def read_groups(db: Session = Depends(get_db)):
#     groups = db.query(models.Group).all()
#     return [schemas.GroupOut.from_orm(group) for group in groups]


# @router.get("/{group_id}", response_model=schemas.GroupOut)
# def read_group(
#     group_id: int,
#     db: Session = Depends(get_db),
#     current_user: User = Depends(get_current_user)
# ):
#     group = db.query(models.Group).filter(
#         models.Group.id == group_id,
#         models.Group.members.any(id=current_user.id)
#     ).first()

#     if not group:
#         raise HTTPException(
#             status_code=404,
#             detail="Group not found or you don't have access"
#         )
#     return schemas.GroupOut.from_orm(group)


# api/groups.py
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
    return create_group(db, group)
