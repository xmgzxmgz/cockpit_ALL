import random
from app.room_layout_db import SessionLocal, RoomLayoutConfig, CabinetConfig
from app.database import Enterprise

db = SessionLocal()

print("Creating room layout configurations for all rooms...")

# Define all rooms that should exist
all_rooms = [
    '101', '102', '103', '104', '105', '106',
    '201', '202', '203', '204', '205', '206',
    '301', '302', '303', '304', '305', '306',
    '401', '402', '403', '404', '405', '406',
    '501', '502', '503', '504', '505', '506'
]

# Get existing room layout configs
existing_configs = db.query(RoomLayoutConfig).all()
existing_room_ids = [config.room_id for config in existing_configs]

print(f"Existing rooms in room_layout_config: {len(existing_room_ids)}")

# Create missing room configs
for room_id in all_rooms:
    if room_id not in existing_room_ids:
        config = RoomLayoutConfig(
            room_id=room_id,
            room_name=f"{room_id}机房",
            max_racks=600,
            rows=20,
            cols=30
        )
        db.add(config)
        print(f"Added room config: {room_id}")

db.commit()
print("Room layout configs created!")

# Now sync cabinet data from cabinets table to cabinet_config table
print("\nSyncing cabinet data...")

# Get all enterprises
enterprises = db.query(Enterprise).all()
enterprise_list = [(e.id, e.name, e.color, e.maintainer, e.manager) for e in enterprises]

random.seed(20260419)

# Process each room
for room_id in all_rooms:
    # Count existing cabinets for this room
    existing_cabinets = db.query(CabinetConfig).filter(CabinetConfig.room_id == room_id).count()

    if existing_cabinets == 0:
        print(f"\nCreating 600 cabinets for room {room_id}...")

        # Get cabinets from cabinets table
        cabinets = db.query(Cabinet).filter(Cabinet.room_id == room_id).all()

        if cabinets:
            for i, cab in enumerate(cabinets):
                col = (i % 30) + 1
                row = (i // 30) + 1

                # Get enterprise info
                enterprise_name = None
                color = None
                enabled = False
                maintainer = None
                manager = None

                if cab.enterprise:
                    ent = db.query(Enterprise).filter(Enterprise.id == cab.enterprise_id).first()
                    if ent:
                        enterprise_name = ent.name
                        color = ent.color
                        enabled = cab.status == 'active'
                        maintainer = ent.maintainer
                        manager = ent.manager

                cabinet_config = CabinetConfig(
                    room_id=room_id,
                    cabinet_id=i + 1,
                    col_position=col,
                    row_position=row,
                    enterprise=enterprise_name,
                    enabled=enabled,
                    color=color,
                    is_hidden=False,
                    visible_index=i + 1,
                    name=f"A{i + 1:03d}",
                    maintainer=maintainer,
                    manager=manager
                )
                db.add(cabinet_config)
        else:
            # No cabinets in cabinets table, create with enterprise assignment
            target_assigned = int(600 * 0.8)  # 80%
            assigned_count = 0

            for i in range(600):
                col = (i % 30) + 1
                row = (i // 30) + 1

                enterprise_name = None
                color = None
                enabled = False
                maintainer = None
                manager = None

                if assigned_count < target_assigned and random.random() < 0.8:
                    ent_id, ent_name, ent_color, ent_maintainer, ent_manager = random.choice(enterprise_list)
                    enterprise_name = ent_name
                    color = ent_color
                    enabled = True
                    maintainer = ent_maintainer
                    manager = ent_manager
                    assigned_count += 1

                cabinet_config = CabinetConfig(
                    room_id=room_id,
                    cabinet_id=i + 1,
                    col_position=col,
                    row_position=row,
                    enterprise=enterprise_name,
                    enabled=enabled,
                    color=color,
                    is_hidden=False,
                    visible_index=i + 1,
                    name=f"A{i + 1:03d}",
                    maintainer=maintainer,
                    manager=manager
                )
                db.add(cabinet_config)

        db.commit()
        print(f"Created 600 cabinets for room {room_id}, assigned {assigned_count}")

print("\n=== Done! ===")

# Verify
total_rooms = db.query(RoomLayoutConfig).count()
total_cabinets = db.query(CabinetConfig).count()
print(f"Total rooms in config: {total_rooms}")
print(f"Total cabinets in config: {total_cabinets}")

db.close()
