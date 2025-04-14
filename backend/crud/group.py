from sqlalchemy.orm import Session
from models.group import Group
from models.users import User
from schema.group import GroupCreate

def create_group(db: Session, group_data: GroupCreate):
    new_group = Group(name=group_data.name)
    db.add(new_group)
    db.commit()
    db.refresh(new_group)

    # Add members
    if group_data.member_ids:
        users = db.query(User).filter(User.id.in_(group_data.member_ids)).all()
        new_group.members.extend(users)
        db.commit()

    return new_group

def get_groups(db: Session):
    return db.query(Group).all()

def get_group_by_id(db: Session, group_id: int):
    return db.query(Group).filter(Group.id == group_id).first()
