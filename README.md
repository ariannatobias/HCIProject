# **Divvy** 
*A simple and efficient way to manage shared expenses*  

## Overview  
**Divvy** is a full-stack mobile application designed to make splitting expenses seamless. Whether you're sharing rent, covering a group dinner, or keeping track of trip expenses, **Divvy** helps you manage and settle debts efficiently.  

## Tech Stack  
**Frontend:** [React Native](https://reactnative.dev/) ⚛️  
**Backend:** [FastAPI](https://fastapi.tiangolo.com/) 🚀  
**Database:** [PostgreSQL](https://www.postgresql.org/) 🐘  
**Authentication & Real-time Data:** [Firebase](https://firebase.google.com/) 🔥  

## Testing Instructions
**User Postman to verify:**
- User login/Sign Up 
- Group Creation

| Endpoint              | Method | Description             |
|-----------------------|--------|-------------------------|
| `/users/`             | POST   | Register new user       |
| `/login/`             | POST   | Authenticate user       |
| `/groups/`            | POST   | Create new group        |
| `/groups/<groupId>`   | GET    | Fetch group details     |

**Manual Testing**
- Log in and create a group
- Verify that new group appears on the home screen 
- Add an expense and verify that group name and members are present in the drop down menus

## Features  
✔️ **Expense Tracking** – Record shared expenses and assign who owes what  
✔️ **Group Management** – Organize expenses by groups (e.g., roommates, trips)  
✔️ **Real-time Updates** – Firebase-powered live data syncing  
✔️ **Secure Authentication** – Firebase Auth for seamless login  
✔️ **Smart Settlement** – Algorithm to minimize transactions  

## Folder Structure (Frontend)
Divvy/
--> components --> Shared UI and custom components
--> screens --> App screens (e.g. Login, Group, Profile)
--> context --> Global contexts (UserContext, GroupContext)
--> assets --> Images & avatars
--> App.tsx

## Folder Structure (Backend)
backend/ 
app/ 
 --> api/  --> users.py, groups.py, expenses.py              # Route handler files

 --> core/ config.py, database.py, dependencies.py           # Configuration, Database connectivity, Dependencies

 --> crud/ users.py, groups.py, expenses.py                  # DB access functions (CRUD logic)

 --> models/ user.py, group.py, expense.py                   # SQLAlchemy models

 --> schemas/  user.py, group.py, expense.py                 # Schemas used for request and response validation 

 main.py                                                     # FastAPI app entry point
   


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

Local IP Address:ipconfig getifaddr en0

Modify these files with the address: api.ts, index.ts

npx expo start —clear


Backend:

main.py:
from fastapi.middleware.cors import CORSMiddleware

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

psql -U postgres -d divvy

DROP TABLE groups, member, member_payment_recieve, member_payment_send, payment_recieve, payment_send CASCADE;

\dt

SELECT * FROM users;

Make sure your backend is running on `http://localhost:8000/

## Future Improvements
- 3rd party payment integration (Venmo, Paypal, CashApp)
- Loggin in / Signing up with external accounts (Ex: Google)
- Push Notifications


## License  
MIT License © 2025 **Divvy Team**  
