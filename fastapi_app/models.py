from sqlalchemy import Column, Integer, String, ForeignKey
from .database import Base

class Groups(Base):
    __tablename__ = "groups"
    GroupID = Column(Integer, primary_key=True, index=True)
    Group_Name = Column(String, nullable=False)

class Member(Base):
    __tablename__ = "member"
    MemberID = Column(Integer, primary_key=True, index=True)
    GroupID = Column(Integer, ForeignKey("groups.GroupID"))
    First_name = Column(String, nullable=False)
    Last_Name = Column(String, nullable=False)
    Bank_Account_Number = Column(Integer, nullable=False)

class PaymentSend(Base):
    __tablename__ = "payment_send"
    Payment_send_ID = Column(Integer, primary_key=True, index=True)
    Payment_Name = Column(String, nullable=False)
    Payment_Type = Column(String, nullable=False)

class PaymentReceive(Base):
    __tablename__ = "payment_recieve"
    Payment_recieve_ID = Column(Integer, primary_key=True, index=True)
    Payment_Name = Column(String, nullable=False)
    Payment_Type = Column(String, nullable=False)

class MemberPaymentSend(Base):
    __tablename__ = "member_payment_send"
    Member_payment_send_ID = Column(Integer, primary_key=True, index=True)
    MemberID = Column(Integer, ForeignKey("member.MemberID"))
    Payment_send_ID = Column(Integer, ForeignKey("payment_send.Payment_send_ID"))

class MemberPaymentReceive(Base):
    __tablename__ = "member_payment_recieve"
    Member_payment_recieve_ID = Column(Integer, primary_key=True, index=True)
    MemberID = Column(Integer, ForeignKey("member.MemberID"))
    Payment_recieve_ID = Column(Integer, ForeignKey("payment_recieve.Payment_recieve_ID"))
