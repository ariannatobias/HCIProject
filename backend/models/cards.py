from sqlalchemy import Column, Integer, String, Boolean, ForeignKey
from backend.core.database import Base

class PaymentMethod(Base):
    __tablename__ = "payment_methods"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    cardholder_name = Column(String, nullable=False)
    card_number = Column(String, nullable=False)  # Store securely in production
    expiry_date = Column(String, nullable=False)  # Format: MM/YY
    cvv = Column(String, nullable=False)          # Store securely in production
    saved = Column(Boolean, default=True)
