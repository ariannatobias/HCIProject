from pydantic import BaseModel

class GroupBase(BaseModel):
    Group_Name: str

class GroupCreate(GroupBase):
    pass

class Group(GroupBase):
    GroupID: int
    class Config:
        orm_mode = True

class MemberBase(BaseModel):
    GroupID: int
    First_name: str
    Last_Name: str
    Bank_Account_Number: int

class MemberCreate(MemberBase):
    pass

class Member(MemberBase):
    MemberID: int
    class Config:
        orm_mode = True

class PaymentSendBase(BaseModel):
    Payment_Name: str
    Payment_Type: str

class PaymentSendCreate(PaymentSendBase):
    pass

class PaymentSend(PaymentSendBase):
    Payment_send_ID: int
    class Config:
        orm_mode = True

class PaymentReceiveBase(BaseModel):
    Payment_Name: str
    Payment_Type: str

class PaymentReceiveCreate(PaymentReceiveBase):
    pass

class PaymentReceive(PaymentReceiveBase):
    Payment_recieve_ID: int
    class Config:
        orm_mode = True

class MemberPaymentSendCreate(BaseModel):
    MemberID: int
    Payment_send_ID: int

class MemberPaymentReceiveCreate(BaseModel):
    MemberID: int
    Payment_recieve_ID: int
