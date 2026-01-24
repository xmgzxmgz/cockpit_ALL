import sys
import os

# Add backend directory to path
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from app.database import engine

def init_db():
    sql_path = os.path.join(os.path.dirname(__file__), '../../database_schema.sql')
    print(f"Reading SQL from {sql_path}")
    with open(sql_path, 'r') as f:
        sql = f.read()
    
    print("Connecting to database...")
    # Get raw connection to bypass SQLAlchemy text() processing issues with %
    conn = engine.raw_connection()
    try:
        cursor = conn.cursor()
        print("Executing SQL script...")
        cursor.execute(sql)
        conn.commit()
        print("Database initialized successfully.")
    except Exception as e:
        conn.rollback()
        print(f"Error initializing database: {e}")
        raise
    finally:
        conn.close()

if __name__ == "__main__":
    init_db()
