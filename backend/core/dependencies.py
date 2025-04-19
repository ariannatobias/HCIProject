# Import FastAPI tools for handling dependencies, exceptions, and status codes
from fastapi import Depends, HTTPException, status

# Import OAuth2PasswordBearer utility for handling token extraction from the request
from fastapi.security import OAuth2PasswordBearer

# Import JWT handling tools from the jose library
from jose import JWTError, jwt

# SQLAlchemy Session for database access
from sqlalchemy.orm import Session

# Import the database dependency and user model
from core.database import get_db
from models.users import User

# Import application settings (contains secret key, algorithm, etc.)
from core.config import settings

# Set up the OAuth2 scheme. This tells FastAPI to expect a bearer token in the "Authorization" header.
# tokenUrl="login" refers to your token generation endpoint (e.g., POST /login)
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")

# Dependency to get the current authenticated user from the JWT token
async def get_current_user(
    db: Session = Depends(get_db),                   # Injects the database session
    token: str = Depends(oauth2_scheme)              # Extracts the token from the Authorization header
):
    # Define the standard exception to raise if anything goes wrong with token validation
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",      # Generic error message
        headers={"WWW-Authenticate": "Bearer"},       # Standard OAuth2 header response
    )

    try:
        # Decode the JWT using your app's secret key and algorithm
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM])
        
        # Extract the user ID (usually stored in the "sub" field of the token)
        user_id: int = payload.get("sub")
        if user_id is None:
            raise credentials_exception
    except JWTError:
        # Raised if decoding the JWT fails or it’s tampered with
        raise credentials_exception
    
    # Query the database for the user with the given ID
    user = db.query(User).filter(User.id == user_id).first()
    if user is None:
        # If the user doesn't exist in the database, raise an auth error
        raise credentials_exception

    # Return the user instance, which can be accessed in protected routes
    return user