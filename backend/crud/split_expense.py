from sqlalchemy.orm import Session
from . import models, schemas

def create_expense(db: Session, expense: schemas.ExpenseCreate):
    db_expense = models.Expense(
        name=expense.name,
        amount=expense.amount,
        group_id=expense.group_id,
        paid_by_member_id=expense.paid_by_member_id,
        notes=expense.notes,
        urgency=expense.urgency,
        receipt_url=expense.receipt_url,
        date=expense.date,
    )
    db.add(db_expense)
    db.commit()
    db.refresh(db_expense)

    for split in expense.splits:
        db_split = models.ExpenseSplit(
            expense_id=db_expense.id,
            member_id=split.member_id,
            amount=split.amount,
            percentage=split.percentage
        )
        db.add(db_split)

    db.commit()
    db.refresh(db_expense)
    return db_expense

def get_expense(db: Session, expense_id: int):
    return db.query(models.Expense).filter(models.Expense.id == expense_id).first()

def get_expenses_for_group(db: Session, group_id: int):
    return db.query(models.Expense).filter(models.Expense.group_id == group_id).all()
