from pydantic import BaseModel
from typing import Optional, List

class MemberBase(BaseModel):
    first_name: str
    last_name: str
    avatar_url: Optional[str] = None
    amount_owed: float

class MemberCreate(MemberBase):
    group_id: int

class Member(MemberBase):
    id: int
    group_id: int
    class Config:
        orm_mode = True

class GroupBase(BaseModel):
    name: str

class GroupCreate(GroupBase):
    pass

class Group(GroupBase):
    id: int
    members: List[Member] = []

    class Config:
        orm_mode = True