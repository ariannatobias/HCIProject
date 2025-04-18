# **Divvy**  
*A simple and efficient way to manage shared expenses*

## Quick Start Instructions  

### Frontend Setup  
1. Navigate to the frontend directory and run:  
   ```bash
   npm install
   ```

2. If using environment variables:  
   ```bash
   npm install react-native-dotenv
   ```

3. Clean install if issues arise:  
   ```bash
   rm -rf node_modules && rm package-lock.json && npm install
   ```

4. Find your local IP address (for API connection):  
   ```bash
   ipconfig getifaddr en0
   ```

5. Update your API address in `api.ts` and `index.ts`.

6. Start the frontend:  
   ```bash
   npx expo start --clear
   ```

---

### Backend Setup  
1. Install dependencies:  

   - For **Zsh**:
     ```bash
     pip install "fastapi[all]" "passlib[bcrypt]" sqlalchemy asyncpg psycopg2-binary python-dotenv databases email-validator python-multipart python-jose uvicorn
     ```

   - For **Bash**:
     ```bash
     pip install "fastapi[all]" sqlalchemy asyncpg psycopg2-binary passlib[bcrypt] python-dotenv databases email-validator python-multipart python-jose uvicorn
     ```

2. Start the backend:
   ```bash
   PYTHONPATH=./backend uvicorn backend.main:app --reload
   ```

---

### Database  
1. Access PostgreSQL:
   ```bash
   psql -U postgres -d divvy
   ```

2. Drop existing tables (if needed):
   ```sql
   DROP TABLE groups, member, member_payment_recieve, member_payment_send, payment_recieve, payment_send CASCADE;
   ```

3. View tables and users:
   ```sql
   \dt
   SELECT * FROM users;
   ```

Make sure the backend is running at:  
`http://localhost:8000/`

---

## Overview  
**Divvy** is a full-stack mobile application designed to make splitting expenses seamless. Whether you're sharing rent, covering a group dinner, or keeping track of trip expenses, **Divvy** helps you manage and settle debts efficiently.

---

## Testing Instructions  

### API Testing with Postman  
Test endpoints like login, signup, and group creation:

| Endpoint              | Method | Description             |
|-----------------------|--------|-------------------------|
| `/users/`             | POST   | Register new user       |
| `/login/`             | POST   | Authenticate user       |
| `/groups/`            | POST   | Create new group        |
| `/groups/<groupId>`   | GET    | Fetch group details     |

### Manual Testing  
- Log in and create a group  
- Confirm new group appears on the home screen  
- Add an expense and verify the group name and members appear in dropdown menus

---

## Tech Stack  
- **Frontend:** [React Native](https://reactnative.dev/) ⚛️  
- **Backend:** [FastAPI](https://fastapi.tiangolo.com/) 🚀  
- **Database:** [PostgreSQL](https://www.postgresql.org/) 🐘  
- **Authentication & Real-time Data:** [Firebase](https://firebase.google.com/) 🔥

---

## Features  
✔️ **Expense Tracking** – Record shared expenses and assign who owes what  
✔️ **Group Management** – Organize expenses by groups (e.g., roommates, trips)  
✔️ **Real-time Updates** – Firebase-powered live data syncing  
✔️ **Secure Authentication** – Firebase Auth for seamless login  
✔️ **Smart Settlement** – Algorithm to minimize transactions  

---

## Folder Structure  

### Frontend
```
Divvy/
├── App.tsx
├── assets/             # Images & avatars
├── components/         # Shared UI and custom components
├── context/            # Global state (UserContext, GroupContext)
└── screens/            # App screens (Login, Group, Profile)
```

### Backend
```
backend/
└── app/
    ├── api/            # Route handlers (users.py, groups.py, expenses.py)
    ├── core/           # Configs & DB setup (config.py, database.py)
    ├── crud/           # CRUD logic for database operations
    ├── models/         # SQLAlchemy models
    ├── schemas/        # Pydantic request/response schemas
    └── main.py         # FastAPI app entry point
```

---

## Future Improvements  
- 3rd party payment integrations (Venmo, PayPal, CashApp)  
- OAuth login options (e.g., Google)  
- Push notifications  

---

## License  
MIT License © 2025 **Divvy Team**
