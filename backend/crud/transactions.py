# crud/transactions.py

from sqlalchemy.orm import Session
from models.expenses import Expense, ExpenseSplit
from schema.transactions import DashboardSummary, RecentTransaction
from sqlalchemy import func
from typing import List
from models.settlements import Settlement

def get_dashboard_summary(db: Session, user_id: int) -> DashboardSummary:
    # Total owed by user (from splits)
    raw_owe = db.query(func.coalesce(func.sum(ExpenseSplit.amount_owed), 0)).\
        join(Expense, Expense.id == ExpenseSplit.expense_id).\
        filter(ExpenseSplit.user_id == user_id).\
        filter(Expense.paid_by_user_id != user_id).scalar()

    # Total user is owed (they paid, others owe them)
    raw_owed = db.query(func.coalesce(func.sum(ExpenseSplit.amount_owed), 0)).\
        join(Expense, Expense.id == ExpenseSplit.expense_id).\
        filter(Expense.paid_by_user_id == user_id).\
        filter(ExpenseSplit.user_id != user_id).scalar()

    # Settlements the user has paid
    paid_back = db.query(func.coalesce(func.sum(Settlement.amount), 0)).\
        filter(Settlement.payer_id == user_id).scalar()

    # Settlements the user has received
    received = db.query(func.coalesce(func.sum(Settlement.amount), 0)).\
        filter(Settlement.receiver_id == user_id).scalar()

    return DashboardSummary(
        user_id=user_id,
        you_owe=max(raw_owe - paid_back, 0),
        you_are_owed=max(raw_owed - received, 0)
    )


def get_recent_transactions(db: Session, user_id: int) -> List[RecentTransaction]:
    # Get expenses the user paid for OR was included in
    expenses = db.query(Expense).\
    join(ExpenseSplit, Expense.id == ExpenseSplit.expense_id).\
    filter(
        (Expense.paid_by_user_id == user_id) |
        (ExpenseSplit.user_id == user_id)
    ).\
    order_by(Expense.id, Expense.created_at.desc()).\
    distinct(Expense.id).\
    limit(10).all()


    return [
        RecentTransaction(
            expense_name=e.name,
            amount=e.amount,
            created_at=e.created_at,
            paid_by=e.paid_by_user_id
        )
        for e in expenses
    ]
