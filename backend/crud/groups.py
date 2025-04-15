# from sqlalchemy.orm import Session
# from backend.models.groups import Group
# from models.users import User
# from backend.schema.groups import GroupCreate

# # def create_group(db: Session, group: GroupCreate):
# #     users = db.query(User).filter(User.id.in_(group.member_ids)).all()
# #     db_group = Group(name=group.name, members=users)
# #     db.add(db_group)
# #     db.commit()
# #     db.refresh(db_group)
# #     return db_group

# # In crud/group.py
# def create_group(db: Session, group: GroupCreate, creator_id: int):
#     # Ensure creator is included in members
#     member_ids = list(set(group.member_ids + [creator_id]))
#     users = db.query(User).filter(User.id.in_(member_ids)).all()
#     db_group = Group(name=group.name, members=users)
#     db.add(db_group)
#     db.commit()
#     db.refresh(db_group)
#     return db_group

# def get_groups(db: Session):
#     return db.query(Group).all()

# def get_group_by_id(db: Session, group_id: int):
#     return db.query(Group).filter(Group.id == group_id).first()


# crud/groups.py
from sqlalchemy.orm import Session
from models.groups import Group, GroupMember
from schema.groups import GroupCreate

# def create_group(db: Session, group_data: GroupCreate):
#     group = Group(name=group_data.name, creator_id=group_data.creator_id)
#     db.add(group)
#     db.commit()
#     db.refresh(group)

#     for user_id in group_data.member_ids:
#         db.add(GroupMember(group_id=group.id, user_id=user_id))
    
#     db.commit()
#     return group

def create_group(db: Session, group_data: GroupCreate):
    group = Group(name=group_data.name, creator_id=group_data.creator_id)
    db.add(group)
    db.commit()
    db.refresh(group)

    # Ensure creator is added
    member_ids = set(group_data.member_ids)
    member_ids.add(group_data.creator_id)

    for user_id in member_ids:
        db.add(GroupMember(group_id=group.id, user_id=user_id))

    db.commit()
    return group
