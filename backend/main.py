from fastapi import FastAPI
from api import users, groups, expenses, transactions, settlements
from core.database import Base, engine
from models import users as user_model
from models import users as user_model
from models import groups as group_model
from models import expenses as expense_model
from api import login


Base.metadata.create_all(bind=engine)

app = FastAPI()

app.include_router(users.router)
app.include_router(groups.router)
app.include_router(expenses.router)
app.include_router(transactions.router)
app.include_router(login.router)

app.include_router(settlements.router)
