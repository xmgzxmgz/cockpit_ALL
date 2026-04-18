import random
from app.room_layout_db import SessionLocal, CabinetConfig
from app.database import Cabinet, Room, Enterprise

db = SessionLocal()

print("Starting random enterprise assignment...")

# Get all enterprises
enterprises = db.query(Enterprise).all()
enterprise_list = [(e.id, e.name, e.color, e.maintainer, e.manager) for e in enterprises]
print(f"Found {len(enterprise_list)} enterprises")

# Get all rooms
rooms = db.query(Room).all()
print(f"Found {len(rooms)} rooms")

random.seed(20260321)  # Fixed seed for reproducibility

total_assigned = 0
total_unassigned = 0

for room in rooms:
    # Get all cabinets for this room
    cabinets = db.query(Cabinet).filter(Cabinet.room_id == room.id).order_by(Cabinet.id).all()

    if not cabinets:
        continue

    print(f"\nRoom {room.id}: {len(cabinets)} cabinets")

    for idx, cabinet in enumerate(cabinets, start=1):
        # 70% chance to assign an enterprise, 30% chance to leave empty
        if random.random() < 0.7:
            # Pick a random enterprise
            ent_id, ent_name, ent_color, ent_maintainer, ent_manager = random.choice(enterprise_list)

            # Update cabinets table
            cabinet.enterprise_id = ent_id
            cabinet.status = 'active'

            # Update cabinet_config table
            config = db.query(CabinetConfig).filter(
                CabinetConfig.room_id == room.id,
                CabinetConfig.cabinet_id == idx
            ).first()

            if config:
                config.enterprise = ent_name
                config.color = ent_color
                config.enabled = True
                config.maintainer = ent_maintainer
                config.manager = ent_manager

            total_assigned += 1
        else:
            # Leave unassigned
            cabinet.enterprise_id = None
            cabinet.status = 'inactive'

            config = db.query(CabinetConfig).filter(
                CabinetConfig.room_id == room.id,
                CabinetConfig.cabinet_id == idx
            ).first()

            if config:
                config.enterprise = None
                config.color = None
                config.enabled = False

            total_unassigned += 1

    # Count for this room
    room_assigned = db.query(Cabinet).filter(Cabinet.room_id == room.id, Cabinet.enterprise_id.isnot(None)).count()
    print(f"  Assigned: {room_assigned}/{len(cabinets)} ({room_assigned*100//len(cabinets)}%)")

db.commit()

print(f"\n=== Summary ===")
print(f"Total assigned: {total_assigned}")
print(f"Total unassigned: {total_unassigned}")

# Verify
print("\nVerification from cabinets table:")
for room in rooms[:6]:
    assigned = db.query(Cabinet).filter(Cabinet.room_id == room.id, Cabinet.enterprise_id.isnot(None)).count()
    total = db.query(Cabinet).filter(Cabinet.room_id == room.id).count()
    if total > 0:
        print(f"  Room {room.id}: {assigned}/{total} assigned")

db.close()
print("\nDone!")