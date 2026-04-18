import random
from app.room_layout_db import SessionLocal, CabinetConfig, RoomLayoutConfig
from app.database import Enterprise

db = SessionLocal()

print("Starting enterprise assignment for 600-cabinet rooms...")

# Get all enterprises
enterprises = db.query(Enterprise).all()
enterprise_list = [(e.id, e.name, e.color, e.maintainer, e.manager) for e in enterprises]
print(f"Found {len(enterprise_list)} enterprises")

# Get all rooms
rooms = db.query(RoomLayoutConfig).filter(RoomLayoutConfig.max_racks == 600).all()
print(f"Found {len(rooms)} rooms with 600 cabinets")

random.seed(20260419)  # Seed for reproducibility

total_assigned = 0

target_assignment_rate = 0.80  # 80%

for room in rooms:
    room_id = room.room_id
    total_cabinets = room.max_racks
    target_assigned = int(total_cabinets * target_assignment_rate)
    
    print(f"\nRoom {room_id}: Total={total_cabinets}, Target assigned={target_assigned}")
    
    # Clear existing cabinet configs for this room
    db.query(CabinetConfig).filter(CabinetConfig.room_id == room_id).delete()
    
    # Create new cabinet configs
    cabinets_created = 0
    assigned_count = 0
    
    for i in range(1, total_cabinets + 1):
        col = ((i - 1) % 30) + 1
        row = ((i - 1) // 30) + 1
        
        # 80% chance to assign an enterprise
        enterprise = None
        color = None
        enabled = False
        maintainer = None
        manager = None
        
        if assigned_count < target_assigned and random.random() < 0.8:
            ent_id, ent_name, ent_color, ent_maintainer, ent_manager = random.choice(enterprise_list)
            enterprise = ent_name
            color = ent_color
            enabled = True
            maintainer = ent_maintainer
            manager = ent_manager
            assigned_count += 1
        
        cabinet = CabinetConfig(
            room_id=room_id,
            cabinet_id=i,
            col_position=col,
            row_position=row,
            enterprise=enterprise,
            enabled=enabled,
            color=color,
            is_hidden=False,
            visible_index=i,
            name=f"A{i:03d}",
            maintainer=maintainer,
            manager=manager
        )
        db.add(cabinet)
        cabinets_created += 1
    
    total_assigned += assigned_count
    print(f"  Created {cabinets_created} cabinets, {assigned_count} assigned ({assigned_count*100//total_cabinets}%)")

db.commit()

print(f"\n=== Summary ===")
print(f"Total rooms processed: {len(rooms)}")
print(f"Total cabinets created: {len(rooms) * 600}")
print(f"Total cabinets assigned: {total_assigned}")
print(f"Average assignment rate: {total_assigned * 100 // (len(rooms) * 600)}%")

db.close()
print("\nDone!")