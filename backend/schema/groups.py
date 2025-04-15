# from pydantic import BaseModel
# from typing import List

# class GroupBase(BaseModel):
#     name: str

# class GroupCreate(GroupBase):
#     member_ids: List[int]  # List of user IDs to add to group

# class GroupOut(BaseModel):
#     id: int
#     name: str
#     member_ids: List[int]

#     @classmethod
#     def from_orm(cls, obj):
#         return cls(
#             id=obj.id,
#             name=obj.name,
#             member_ids=[user.id for user in obj.members]
#         )

#     class Config:
#         from_attributes = True


# schema/groups.py
from pydantic import BaseModel
from typing import List

class GroupCreate(BaseModel):
    name: str
    creator_id: int
    member_ids: List[int]  # includes creator optionally

class GroupOut(BaseModel):
    id: int
    name: str
    creator_id: int

    class Config:
        orm_mode = True
