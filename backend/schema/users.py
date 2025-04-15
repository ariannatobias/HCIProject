from pydantic import BaseModel
from datetime import date

class UserCreate(BaseModel):
    first_name: str
    last_name: str
    dob: date
    phone: str
    email: str
    password: str

class UserLogin(BaseModel):
    email: str
    password: str

class UserResponse(BaseModel):
    id: int
    first_name: str
    last_name: str
    email: str

    class Config:
        orm_mode = True
