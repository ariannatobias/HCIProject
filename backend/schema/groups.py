
# schema/groups.py
from pydantic import BaseModel
from typing import List

class GroupCreate(BaseModel):
    name: str
    creator_id: int
    member_ids: List[int]

class GroupOut(BaseModel):
    id: int
    name: str
    creator_id: int

    class Config:
        orm_mode = True

