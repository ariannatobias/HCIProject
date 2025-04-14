from pydantic import BaseModel
from typing import List

class GroupBase(BaseModel):
    name: str

class GroupCreate(GroupBase):
    member_ids: List[int]  # List of user IDs to add to group

class GroupOut(GroupBase):
    id: int
    member_ids: List[int]

    class Config:
        orm_mode = True
