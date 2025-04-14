from pydantic import BaseModel, Field
from typing import Optional

class PaymentMethodCreate(BaseModel):
    user_id: int
    cardholder_name: str
    card_number: str = Field(..., min_length=13, max_length=19)
    expiry_date: str  # Should be MM/YY format
    cvv: str = Field(..., min_length=3, max_length=4)
    saved: Optional[bool] = True

class PaymentMethodResponse(BaseModel):
    id: int
    user_id: int
    cardholder_name: str
    card_number: str
    expiry_date: str
    saved: bool

    class Config:
        orm_mode = True
