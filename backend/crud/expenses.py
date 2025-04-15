# crud/expenses.py
from sqlalchemy.orm import Session
from models.expenses import Expense, ExpenseSplit, SplitMethod
from schema.expenses import ExpenseCreate
from fastapi import HTTPException
from models.expenses import Expense, ExpenseSplit
from schema.expenses import ExpenseDivvy, SplitResult
from typing import List
from sqlalchemy import text

def create_expense(db: Session, expense_data: ExpenseCreate):
    expense = Expense(
        name=expense_data.name,
        amount=expense_data.amount,
        group_id=expense_data.group_id,
        paid_by_user_id=expense_data.paid_by_user_id,
        split_method=expense_data.split_method,
        urgency=expense_data.urgency,
        receipt_url=expense_data.receipt_url
    )
    db.add(expense)
    db.commit()
    db.refresh(expense)

    if expense_data.split_method == "even":
        splits = db.execute(
    text("SELECT user_id FROM group_members WHERE group_id = :group_id"),
    {"group_id": expense.group_id}
).fetchall()
        if not splits:
            raise HTTPException(status_code=400, detail="No group members found")

        per_person = round(expense.amount / len(splits), 2)
        for row in splits:
            db.add(ExpenseSplit(expense_id=expense.id, user_id=row[0], amount_owed=per_person))

    elif expense_data.split_method in ["custom", "percentage"]:
        total = 0
        for split in expense_data.splits:
            if expense_data.split_method == "custom":
                amount = split.value
            else:
                amount = round((split.value / 100) * expense.amount, 2)

            total += amount
            db.add(ExpenseSplit(expense_id=expense.id, user_id=split.user_id, amount_owed=amount))

        if round(total, 2) > round(expense.amount, 2):
            raise HTTPException(status_code=400, detail="Total split exceeds expense amount")

    db.commit()
    return expense
# crud/expenses.py



def get_group_divvy(db: Session, group_id: int) -> List[ExpenseDivvy]:
    expenses = db.query(Expense).filter(Expense.group_id == group_id).all()
    result = []

    for exp in expenses:
        splits = db.query(ExpenseSplit).filter(ExpenseSplit.expense_id == exp.id).all()
        result.append(ExpenseDivvy(
            expense=exp.name,
            paid_by=exp.paid_by_user_id,
            splits=[
                SplitResult(user_id=s.user_id, amount_owed=s.amount_owed)
                for s in splits
            ]
        ))

    return result
