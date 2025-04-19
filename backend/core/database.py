# Import the necessary SQLAlchemy components to connect to the database and define models
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# Define the URL to connect to the PostgreSQL database
# Format: postgresql://<username>:<password>@<host>:<port>/<database_name>
DATABASE_URL = "postgresql://postgres:divvy@localhost:5432/divvy"

# Dependency function to get a new database session for each request
# This will be used in FastAPI routes to interact with the database
def get_db():
    db = SessionLocal()  # Create a new session
    try:
        yield db  # Provide the session to the calling function
    finally:
        db.close()  # Ensure the session is closed after use

# Create a new SQLAlchemy engine that knows how to connect to the PostgreSQL database
engine = create_engine(DATABASE_URL)

# Create a configured session class bound to the engine
# autocommit=False: transactions must be explicitly committed
# autoflush=False: prevents automatic flushing of changes to the database
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Base class for all ORM models to inherit from
# This Base is later used to create tables with Base.metadata.create_all()
Base = declarative_base()