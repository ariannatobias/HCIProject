# # models/group.py
# from sqlalchemy import Column, Integer, String, ForeignKey, Table
# from sqlalchemy.orm import relationship
# from core.database import Base

# # Corrected association table: must use `user_id` instead of `id`
# group_members = Table(
#     "group_members",
#     Base.metadata,
#     Column("group_id", ForeignKey("groups.id", ondelete="CASCADE"), primary_key=True),
#     Column("user_id", ForeignKey("users.id", ondelete="CASCADE"), primary_key=True),  # ✅ FIXED HERE
# )

# class Group(Base):
#     __tablename__ = "groups"

#     id = Column(Integer, primary_key=True, index=True)
#     name = Column(String, nullable=False)

#     members = relationship("User", secondary=group_members, back_populates="groups")


# models/groups.py
from sqlalchemy import Column, Integer, String, ForeignKey, Table
from sqlalchemy.orm import relationship
from core.database import Base

class Group(Base):
    __tablename__ = "groups"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    creator_id = Column(Integer, ForeignKey("users.id"))

    members = relationship("GroupMember", back_populates="group")

class GroupMember(Base):
    __tablename__ = "group_members"
    id = Column(Integer, primary_key=True, index=True)
    group_id = Column(Integer, ForeignKey("groups.id"))
    user_id = Column(Integer, ForeignKey("users.id"))

    group = relationship("Group", back_populates="members")
