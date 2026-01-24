
import sys
import os

# Add backend directory to sys.path
sys.path.append(os.path.join(os.getcwd(), 'backend'))

from backend.app.database import SessionLocal, MonitoringFeature, FeatureCategory, Alert

def verify_data():
    db = SessionLocal()
    try:
        categories = db.query(FeatureCategory).all()
        print(f"Categories count: {len(categories)}")
        for cat in categories:
            print(f"  - {cat.name} ({cat.code})")
        
        features = db.query(MonitoringFeature).all()
        print(f"Features count: {len(features)}")
        
        alerts = db.query(Alert).all()
        print(f"Alerts count: {len(alerts)}")
        
    finally:
        db.close()

if __name__ == "__main__":
    verify_data()
