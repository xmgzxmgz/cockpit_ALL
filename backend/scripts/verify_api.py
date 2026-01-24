import sys
import os
from fastapi.testclient import TestClient

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
from app.main import app

client = TestClient(app)

def verify():
    print("Verifying /api/features...")
    response = client.get("/api/features")
    if response.status_code == 200:
        data = response.json()
        print(f"Success! Got {len(data)} features.")
        # print first 1
        if data:
            print(f"Sample feature: {data[0]}")
    else:
        print(f"Failed: {response.status_code} {response.text}")

    print("\nVerifying /api/features/1.01/metrics...")
    # Note: 1.01 is '温湿度热力图'
    response = client.get("/api/features/1.01/metrics")
    if response.status_code == 200:
        print(f"Success! Got metrics: {len(response.json())} records")
    else:
        print(f"Metrics check: {response.status_code} {response.text}")

    # Check Environment API
    print("\nVerifying /api/environment/readings...")
    response = client.get("/api/environment/readings")
    if response.status_code == 200:
        print(f"Success! Got env readings: {len(response.json())} records")
    else:
        print(f"Failed env readings: {response.status_code} {response.text}")

if __name__ == "__main__":
    verify()
