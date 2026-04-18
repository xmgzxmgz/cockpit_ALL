from app.room_layout_db import SessionLocal, CabinetConfig
from app.database import Cabinet, Room
import random

db = SessionLocal()

cabinets = db.query(Cabinet).all()
print(f"Found {len(cabinets)} cabinets in cabinets table")

for cabinet in cabinets:
    room_id = cabinet.room_id
    cabinet_id = cabinet.id

    existing = db.query(CabinetConfig).filter(
        CabinetConfig.room_id == room_id,
        CabinetConfig.cabinet_id == cabinet_id
    ).first()

    if not existing:
        row = (cabinet_id - 1) // 30 + 1
        col = ((cabinet_id - 1) % 30) + 1

        config = CabinetConfig(
            room_id=room_id,
            cabinet_id=cabinet_id,
            col_position=col,
            row_position=row,
            enterprise=cabinet.enterprise.name if cabinet.enterprise else None,
            enabled=cabinet.status == 'active',
            color=cabinet.enterprise.color if cabinet.enterprise else None,
            is_hidden=False,
            visible_index=cabinet_id,
            name=cabinet.cabinet_label,
            maintainer=cabinet.enterprise.maintainer if cabinet.enterprise else None,
            manager=cabinet.enterprise.manager if cabinet.enterprise else None
        )
        db.add(config)

db.commit()
print(f"Total cabinets in cabinet_config: {db.query(CabinetConfig).count()}")
db.close()