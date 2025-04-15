from sqlalchemy.orm import Session
from models.groups import Group, GroupMember
from schema.groups import GroupCreate


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
