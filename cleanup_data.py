
import sys
import os

# Add backend directory to sys.path
sys.path.append(os.path.join(os.getcwd(), 'backend'))

from backend.app.database import SessionLocal, FeatureCategory

def cleanup_categories():
    db = SessionLocal()
    try:
        codes_to_delete = ['PWR', 'HDW', 'ALT']
        for code in codes_to_delete:
            cat = db.query(FeatureCategory).filter(FeatureCategory.code == code).first()
            if cat:
                print(f"Deleting category: {cat.name} ({cat.code})")
                db.delete(cat)
        db.commit()
        print("Cleanup completed.")
    finally:
        db.close()

if __name__ == "__main__":
    cleanup_categories()
