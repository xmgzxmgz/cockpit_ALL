import random
from app.database import SessionLocal, Cabinet, Room, Enterprise

db = SessionLocal()

print("Generating cabinets for all rooms...")

# Get all rooms
rooms = db.query(Room).all()
print(f"Found {len(rooms)} rooms")

# Get all enterprises for random assignment
enterprises = db.query(Enterprise).all()
print(f"Found {len(enterprises)} enterprises")

random.seed(20260321)

total_created = 0

for room in rooms:
    # Check if this room already has cabinets
    existing = db.query(Cabinet).filter(Cabinet.room_id == room.id).count()
    if existing > 0:
        print(f"Room {room.id}: already has {existing} cabinets, skipping")
        continue

    print(f"Room {room.id}: Creating 80 cabinets...")

    # Create 80 cabinets for this room (8 rows x 10 cols pattern)
    for i in range(1, 81):
        # 70% chance to assign an enterprise
        enterprise_id = None
        status = 'inactive'
        if random.random() < 0.7:
            enterprise_id = random.choice(enterprises).id
            status = 'active'

        cabinet_label = f"A{i:02d}"

        cabinet = Cabinet(
            room_id=room.id,
            enterprise_id=enterprise_id,
            cabinet_label=cabinet_label,
            status=status
        )
        db.add(cabinet)
        total_created += 1

    print(f"  Created 80 cabinets for room {room.id}")

db.commit()
print(f"\nTotal cabinets created: {total_created}")

# Verify
print("\nVerification - cabinets per room:")
result = db.execute("SELECT room_id, COUNT(*) FROM cabinets GROUP BY room_id ORDER BY room_id").fetchall()
for row in result:
    print(f"  Room {row[0]}: {row[1]} cabinets")

db.close()
print("\nDone!")