from sqlalchemy.orm import Session
import models, schemas

# Group operations
def create_group(db: Session, group: schemas.GroupCreate):
    db_group = models.Group(name=group.name)
    db.add(db_group)
    db.commit()
    db.refresh(db_group)
    return db_group

def get_groups(db: Session):
    return db.query(models.Group).all()

def get_group(db: Session, group_id: int):
    return db.query(models.Group).filter(models.Group.id == group_id).first()

# Member operations
def create_member(db: Session, member: schemas.MemberCreate):
    db_member = models.Member(**member.dict())
    db.add(db_member)
    db.commit()
    db.refresh(db_member)
    return db_member

def get_members_by_group(db: Session, group_id: int):
    return db.query(models.Member).filter(models.Member.group_id == group_id).all()

def calculate_total_debt(db: Session, group_id: int):
    members = get_members_by_group(db, group_id)
    return sum(member.amount_owed for member in members)