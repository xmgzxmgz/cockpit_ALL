import random
from app.database import SessionLocal, Cabinet, Room, Enterprise
from app.room_layout_db import SessionLocal as LayoutSession, CabinetConfig

db = SessionLocal()
db_layout = LayoutSession()

print("Ensuring all rooms have at least 80% enterprise assignment...")

# Get all enterprises
enterprises = db.query(Enterprise).all()
enterprise_list = [(e.id, e.name, e.color, e.maintainer, e.manager) for e in enterprises]
print(f"Found {len(enterprise_list)} enterprises")

# Get all rooms
rooms = db.query(Room).all()
print(f"Found {len(rooms)} rooms")

random.seed(20260322)  # New seed for this assignment

for room in rooms:
    cabinets = db.query(Cabinet).filter(Cabinet.room_id == room.id).all()

    if not cabinets:
        continue

    total = len(cabinets)
    target = int(total * 0.80)  # 80% target

    # Count current assignments
    current_assigned = sum(1 for c in cabinets if c.enterprise_id is not None)
    needed = max(0, target - current_assigned)

    print(f"Room {room.id}: Total={total}, Current={current_assigned} ({current_assigned*100//total}%), Need to assign={needed}")

    if needed > 0:
        # Find unassigned cabinets and assign them
        unassigned = [c for c in cabinets if c.enterprise_id is None]
        random.shuffle(unassigned)

        for i, cabinet in enumerate(unassigned[:needed]):
            ent_id, ent_name, ent_color, ent_maintainer, ent_manager = random.choice(enterprise_list)

            # Update cabinets table
            cabinet.enterprise_id = ent_id
            cabinet.status = 'active'

            # Update cabinet_config table
            config = db_layout.query(CabinetConfig).filter(
                CabinetConfig.room_id == room.id,
                CabinetConfig.cabinet_id == i + 1
            ).first()

            if config:
                config.enterprise = ent_name
                config.color = ent_color
                config.enabled = True
                config.maintainer = ent_maintainer
                config.manager = ent_manager

db.commit()
db_layout.commit()

print("\n=== Final Verification ===")
for room in rooms:
    cabinets = db.query(Cabinet).filter(Cabinet.room_id == room.id).all()
    if cabinets:
        total = len(cabinets)
        assigned = sum(1 for c in cabinets if c.enterprise_id is not None)
        pct = assigned * 100 // total
        status = "✓" if pct >= 80 else "✗"
        print(f"Room {room.id}: {assigned}/{total} ({pct}%) {status}")

db.close()
db_layout.close()
print("\nDone!")