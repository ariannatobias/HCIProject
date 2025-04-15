# from pydantic import BaseModel, EmailStr, Field
# from datetime import date

# # For incoming request (sign up)
# class UserCreate(BaseModel):
#     first_name: str
#     last_name: str
#     email: EmailStr
#     date_of_birth: date
#     phone_number: str = Field(..., min_length=10, max_length=12)
#     password: str = Field(..., min_length=8)

# # For response
# class UserResponse(BaseModel):
#     id: int
#     first_name: str
#     last_name: str
#     email: EmailStr
#     date_of_birth: date
#     phone_number: str

#     class Config:
#         orm_mode = True
    

# class UserLogin(BaseModel):
#     email: str
#     password: str


# schema/users.py
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
