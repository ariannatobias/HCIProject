from sqlalchemy.orm import Session
from models.group import Group
from models.users import User
from schema.group import GroupCreate

# def create_group(db: Session, group: GroupCreate):
#     users = db.query(User).filter(User.id.in_(group.member_ids)).all()
#     db_group = Group(name=group.name, members=users)
#     db.add(db_group)
#     db.commit()
#     db.refresh(db_group)
#     return db_group

# In crud/group.py
def create_group(db: Session, group: GroupCreate, creator_id: int):
    # Ensure creator is included in members
    member_ids = list(set(group.member_ids + [creator_id]))
    users = db.query(User).filter(User.id.in_(member_ids)).all()
    db_group = Group(name=group.name, members=users)
    db.add(db_group)
    db.commit()
    db.refresh(db_group)
    return db_group

def get_groups(db: Session):
    return db.query(Group).all()

def get_group_by_id(db: Session, group_id: int):
    return db.query(Group).filter(Group.id == group_id).first()
