
import sys
import os
from sqlalchemy import func

# Add backend directory to sys.path
sys.path.append(os.path.join(os.getcwd(), 'backend'))

from backend.app.database import SessionLocal, MonitoringFeature, FeatureCategory

def check_usage():
    db = SessionLocal()
    try:
        categories = db.query(FeatureCategory).all()
        for cat in categories:
            count = db.query(MonitoringFeature).filter(MonitoringFeature.category_code == cat.code).count()
            print(f"Category {cat.name} ({cat.code}): {count} features")
            
            if count == 0:
                print(f"  -> Marking for deletion: {cat.code}")
                # db.delete(cat) # Commented out for safety first
        
        # db.commit()
    finally:
        db.close()

if __name__ == "__main__":
    check_usage()
