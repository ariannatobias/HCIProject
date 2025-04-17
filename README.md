# **Divvy** 
*A simple and efficient way to manage shared expenses*  

## Overview  
**Divvy** is a full-stack mobile application designed to make splitting expenses seamless. Whether you're sharing rent, covering a group dinner, or keeping track of trip expenses, **Divvy** helps you manage and settle debts efficiently.  

## Tech Stack  
**Frontend:** [React Native](https://reactnative.dev/) ⚛️  
**Backend:** [FastAPI](https://fastapi.tiangolo.com/) 🚀  
**Database:** [PostgreSQL](https://www.postgresql.org/) 🐘  
**Authentication & Real-time Data:** [Firebase](https://firebase.google.com/) 🔥  

## Features  
✔️ **Expense Tracking** – Record shared expenses and assign who owes what  
✔️ **Group Management** – Organize expenses by groups (e.g., roommates, trips)  
✔️ **Real-time Updates** – Firebase-powered live data syncing  
✔️ **Secure Authentication** – Firebase Auth for seamless login  
✔️ **Smart Settlement** – Algorithm to minimize transactions  

### Prerequisites  
- **Node.js** & **npm/yarn** for frontend  
- **Python 3.8+** for backend  
- **PostgreSQL** for database  
- **Firebase Account**

### Divvy Command Lines to run:
Frontend:
npm install

//npm install react-native-dotenv

(Clean install if you run into issues): rm -rf node_modules && rm package-lock.json && npm install

npx expo start —clear

Add these to signupscreen placeholder fields: placeholderTextColor="#888"


Backend:

main.py:from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow any origin for dev
    allow_credentials=True,
    allow_methods=["*"],  # <-- Needed to allow OPTIONS
    allow_headers=["*"],
)

Zsh terminal:
pip install "fastapi[all]" "passlib[bcrypt]" sqlalchemy asyncpg psycopg2-binary python-dotenv databases email-validator python-multipart python-jose uvicorn

Bash terminal:pip install "fastapi[all]" sqlalchemy asyncpg psycopg2-binary passlib[bcrypt] python-dotenv databases email-validator python-multipart python-jose uvicorn

PYTHONPATH=./backend uvicorn backend.main:app --reload



Database:

Local IP Address:ipconfig getifaddr en0

Modify these files with the address: api.ts, index.ts

psql -U postgres -d divvy

DROP TABLE groups, member, member_payment_recieve, member_payment_send, payment_recieve, payment_send CASCADE;

\dt

SELECT * FROM users;

DROP TABLE groups, member, member_payment_recieve, member_payment_send, payment_recieve, payment_send CASCADE;


## License  
MIT License © 2025 **Divvy Team**  
