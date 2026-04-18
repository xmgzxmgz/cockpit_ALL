"""数据迁移脚本：将 roomConfig.ts 配置迁移到 PostgreSQL 数据库"""
import sys
import os
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from app.room_layout_db import (
    SessionLocal,
    RoomLayoutConfig,
    CabinetConfig,
    AreaFrameConfig,
    init_room_layout_db,
)

ROOM_CONFIG_DATA = [
    {
        "roomId": "1-1",
        "defaultColor": "#4a4a4a",
        "assignments": [
            {
                "enterprise": "未启用",
                "rackRange": "243-264,309-330,375-396,441-462",
                "enabled": True,
            },
        ],
    },
    {
        "roomId": "201",
        "defaultColor": "#4a4a4a",
        "assignments": [
            {
                "enterprise": "未启用",
                "rackRange": "1-17,45-61,89-93,97-105,133-149,177-198,221-242,265-269,273-282,309-313,317-326,353-374,397-418,441-458,485-489,493-502,529-541",
                "enabled": True,
            },
        ],
    },
    {
        "roomId": "202",
        "defaultColor": "#4a4a4a",
        "assignments": [
            {
                "enterprise": "未启用",
                "rackRange": "1-17,45-61,89-98,101-105,133-149,177-193,221-237,265-274,277-281,309-318,321-325,353-369,397-413,441-457,485-494,497-501,529-545,573-589",
                "enabled": True,
            },
        ],
    },
    {
        "roomId": "203",
        "defaultColor": "#4a4a4a",
        "assignments": [
            {
                "enterprise": "未启用",
                "rackRange": "1-13,45-49,53-62,89-106,133-154,177-198,221-225,229-238,265-269,273-282,309-330,353-374,397-413,441-445,449-457,485-501,529-545",
                "enabled": True,
            },
        ],
    },
    {
        "roomId": "204",
        "defaultColor": "#4a4a4a",
        "assignments": [
            {
                "enterprise": "未启用",
                "rackRange": "5-17,45-49,52-61,89-93,96-105,133-149,177-193,221-237,265-269,272-281,309-313,316-325,353-369,397-413,441-457,485-489,492-501,532-545,579-589",
                "enabled": True,
            },
        ],
    },
    {
        "roomId": "205",
        "defaultColor": "#4a4a4a",
        "assignments": [
            {
                "enterprise": "未启用",
                "rackRange": "116-117,119-120,125-126,128-129,131-132,134,137-138,162-164,166-167,169-170,172-173,175-176,178-179,181-184,208-209,211,213,216,218-219,221-222,224-225,229-230,254-255,257-258,260-261,263-264,266-267,269-270,272,275-276,300-301,303-304,306-307,309-310,312-313,315-316,318-319,321-322,346-348,350-351,353-354,356-357,359-360,362-363,365,367-368,392-394,396,400,402-403,405-406,408-409,413-414,438-439,441,443,447-448,450-451,453-454,456,459-460,484-487,489-490,492-493,495-496,498-499,501-502,504-506,530-531,533-534,539-540,542-543,545-546,548,551-552,576-578,580,582,584,586,588,590,592-593,595,597-598,625,627-628,630-632,634-637,639,640-644",
                "enabled": True,
            },
        ],
    },
    {
        "roomId": "206",
        "defaultColor": "#4a4a4a",
        "assignments": [
            {
                "enterprise": "未启用",
                "rackRange": "7-17,49-61,89-93,96-105,133-149,177-193,221-237,265-269,272-281,309-313,316-325,353-369,397-413,441-457,485-489,492-501,529-545,577-589",
                "enabled": True,
            },
        ],
    },
    {
        "roomId": "3-1",
        "defaultColor": "#4a4a4a",
        "assignments": [
            {
                "enterprise": "未启用",
                "rackRange": "6-18,50-54,57-62,116-120,123-128,160-172,226-238,270-282,336-340,343-348,380-392,446-458,490-502,556-560,563-568,600-604,607-612",
                "enabled": True,
            },
        ],
    },
    {
        "roomId": "3-2",
        "defaultColor": "#4a4a4a",
        "assignments": [
            {
                "enterprise": "未启用",
                "rackRange": "3-18,47-56,59-62,113-122,125-128,157-172,223-238,267-282,333-342,345-348,377-392,443-458,487-502,553-562,565-568,597-612",
                "enabled": True,
            },
        ],
    },
    {
        "roomId": "3-3",
        "defaultColor": "#4a4a4a",
        "assignments": [
            {
                "enterprise": "未启用",
                "rackRange": "5-17,49-54,57-61,94-98,101-105,138-149,182-193,226-237,270-274,277-281,314-325,358-369,402-413,446-450,453-457,490-494,497-501",
                "enabled": True,
            },
        ],
    },
    {
        "roomId": "3-4",
        "defaultColor": "#4a4a4a",
        "assignments": [
            {
                "enterprise": "未启用",
                "rackRange": "10-22,54-66,111-119,124-132,155-163,168-176,221-229,234-242,265-273,278-286,331-339,344-352,375-383,388-396,441-449,454-462,485-493,498-506,560-572,604-616",
                "enabled": True,
            },
        ],
    },
    {
        "roomId": "3-5",
        "defaultColor": "#4a4a4a",
        "assignments": [
            {
                "enterprise": "未启用",
                "rackRange": "28-32,38-42,72-76,82-86,138-142,148-152,182-186,192-196,248-252,258-262,292-296,302-306,358-362,368-372,402-406,412-416,468-472,478-482,512-516,522-526,578-582,588-592,622-626,632-636",
                "enabled": True,
            },
        ],
        "areaFrames": [
            {
                "id": "3-5-1",
                "label": "3-5-1",
                "rackRange": "111-120, 141-150, 171-180, 201-210, 231-240, 261-270, 291-300, 321-330, 351-360, 381-390, 411-420, 441-450, 471-480, 501-510, 531-540, 561-570, 591-600, 621-630, 651-660",
                "color": "#4682B4",
                "borderWidth": 5,
                "labelPosition": "top",
            },
            {
                "id": "3-5-2",
                "label": "3-5-2",
                "rackRange": "101-110, 131-140, 161-170, 191-200, 221-230, 251-260, 281-290, 311-320, 341-350, 371-380, 401-410, 431-440, 461-470, 491-500, 521-530, 551-560, 581-590, 611-620, 641-650, 671-680, 701-710",
                "color": "#AFEEEE",
                "borderWidth": 5,
                "labelPosition": "top",
            },
            {
                "id": "3-5-3",
                "label": "3-5-3",
                "rackRange": "91-100,121-130,151-160, 181-190, 211-220, 241-250, 271-280, 301-310, 331-340, 361-370, 391-400, 421-430, 451-460, 481-490, 511-520, 541-550, 571-580, 601-610, 631-640, 661-670, 691-700",
                "color": "#00FA9A",
                "borderWidth": 5,
                "labelPosition": "top",
            },
        ],
    },
    {
        "roomId": "3-6",
        "defaultColor": "#4a4a4a",
        "assignments": [
            {
                "enterprise": "未启用",
                "rackRange": "11-22,55-66,111-119,124-132,155-163,168-176,221-229,234-242,265-273,278-286,375-383,388-396,419-427,432-440,485-493,498-506,529-537,542-550,605-616,649-660",
                "enabled": True,
            },
        ],
    },
    {
        "roomId": "401",
        "defaultColor": "#4a4a4a",
        "assignments": [
            {
                "enterprise": "未启用",
                "rackRange": "25-42,71-80,83-88,117-126,129-134,163-180,209-226,255-272,301-310,313-318,347-364,393-410,439-456,485-502,531-540,543-548,577-594,623-640",
                "enabled": True,
            },
        ],
    },
    {
        "roomId": "402",
        "defaultColor": "#4a4a4a",
        "assignments": [
            {
                "enterprise": "未启用",
                "rackRange": "24-29,32-38,70-75,78-87,116-138,162-184,208-230,254-259,262-273,276,300-322,346-368,392-414,438-455,484-489,492-500,530-545,576-591",
                "enabled": True,
            },
        ],
    },
    {
        "roomId": "403",
        "defaultColor": "#4a4a4a",
        "assignments": [
            {
                "enterprise": "未启用",
                "rackRange": "30-44,71-76,79-90,117-122,125-136,163-182,209-228,255-274,301-306,309-320,347-352,355-366,393-412,439-458,485-504,531-536,539-550,577-582,585-596,628-642",
                "enabled": True,
            },
        ],
    },
    {
        "roomId": "404",
        "defaultColor": "#4a4a4a",
        "assignments": [
            {
                "enterprise": "未启用",
                "rackRange": "26-43,72-89,118-123,126-135,164-181,210-215,218-227,256-261,264-273,302-319,348-365,394-411,440-445,448-457,486-503,532-537,540-549,578-595,624-641",
                "enabled": True,
            },
        ],
    },
    {
        "roomId": "405",
        "defaultColor": "#4a4a4a",
        "assignments": [
            {
                "enterprise": "未启用",
                "rackRange": "30-44,71-76,79-90,117-122,125-136,163-182,209-228,255-274,301-306,309-320,347-352,355-366,393-412,439-458,485-504,531-536,539-550,577-582,585-596,628-642",
                "enabled": True,
            },
        ],
    },
    {
        "roomId": "406",
        "defaultColor": "#4a4a4a",
        "assignments": [
            {
                "enterprise": "未启用",
                "rackRange": "47-62,93-108,139-144,147-155,185-201,231-253,277-299,323-345,369-374,377-388,391,415-437,461-483,507-529,553-558,561-570,599-604,607-613",
                "enabled": True,
            },
        ],
    },
    {
        "roomId": "501",
        "defaultColor": "#4a4a4a",
        "assignments": [
            {
                "enterprise": "未启用",
                "rackRange": "4-19,48-63,92-100,103-107,136-151,180-195,224-239,268-283,312-320,323-327,356-371,400-415,444-459,488-503,532-540,543-547,576-591",
                "enabled": True,
            },
        ],
    },
    {
        "roomId": "502",
        "defaultColor": "#4a4a4a",
        "assignments": [
            {
                "enterprise": "未启用",
                "rackRange": "6-16,50-51,54-60,94-105,138-149,182-193,226-237,270-271,274-281,314-325,358-369,402-413,446-457,490-491,494-501,534-544,578-588",
                "enabled": True,
            },
        ],
    },
    {
        "roomId": "503",
        "defaultColor": "#4a4a4a",
        "assignments": [
            {
                "enterprise": "未启用",
                "rackRange": "3-19,47-55,59-63,91-107,135-151,179-195,223-239,267-275,279-283,311-327,355-371,399-415,443-459,487-495,499-503,531-547,575-591",
                "enabled": True,
            },
        ],
    },
]

CLICKABLE_ROOMS = [
    '1-1', '201', '202', '203', '204', '205', '206',
    '3-1', '3-2', '3-3', '3-4', '3-5', '3-6',
    '401', '402', '403', '404', '405', '406',
    '501', '502', '503',
]

HOVER_ANIMATION_ROOMS = [
    '1-1', '201', '202', '203', '204', '205', '206',
    '3-1', '3-2', '3-3', '3-4', '3-5', '3-6',
    '401', '402', '403', '404', '405', '406',
    '501', '502', '503',
]

GRID_CONFIG_DATA = {
    "1-1": {"cols": 30, "rows": 22, "maxRacks": 720},
    "205": {"cols": 30, "rows": 23, "maxRacks": 690},
    "default": {"cols": 30, "rows": 22, "maxRacks": 660},
    "401": {"cols": 30, "rows": 23, "maxRacks": 690},
    "402": {"cols": 30, "rows": 23, "maxRacks": 690},
    "403": {"cols": 30, "rows": 23, "maxRacks": 690},
    "404": {"cols": 30, "rows": 23, "maxRacks": 690},
    "405": {"cols": 30, "rows": 23, "maxRacks": 690},
    "406": {"cols": 30, "rows": 23, "maxRacks": 690},
    "503": {"cols": 30, "rows": 22, "maxRacks": 600},
}


def parse_rack_range(rack_range: str) -> list:
    """解析机柜范围字符串，返回机柜ID列表"""
    rack_ids = []
    parts = rack_range.split(',')

    for part in parts:
        trimmed = part.strip()
        if '-' in trimmed:
            start, end = trimmed.split('-')
            start = int(start.strip())
            end = int(end.strip())
            rack_ids.extend(range(start, end + 1))
        else:
            rack_ids.append(int(trimmed))

    return rack_ids


def get_enterprise_color(enterprise_name: str) -> str:
    """获取企业对应的颜色"""
    enterprise_colors = {
        "示例企业A": "#1890FF",
        "示例企业B": "#52C41A",
        "示例企业C": "#FA8C16",
        "示例企业D": "#F5222D",
        "示例企业E": "#722ED1",
    }
    if not enterprise_name or enterprise_name == "未启用":
        return "#6b7280"
    if enterprise_name in enterprise_colors:
        return enterprise_colors[enterprise_name]
    import random
    return "#" + "%06x" % random.randint(0, 0xFFFFFF)


def migrate_data():
    """执行数据迁移"""
    print("开始数据迁移...")

    init_room_layout_db()
    print("数据库表结构已初始化")

    db = SessionLocal()

    try:
        for room_data in ROOM_CONFIG_DATA:
            room_id = room_data["roomId"]
            grid_config = GRID_CONFIG_DATA.get(room_id, GRID_CONFIG_DATA["default"])

            existing_room = db.query(RoomLayoutConfig).filter(RoomLayoutConfig.room_id == room_id).first()

            if existing_room:
                existing_room.room_name = f"{room_id}机房"
                existing_room.cols = grid_config["cols"]
                existing_room.rows = grid_config["rows"]
                existing_room.max_racks = grid_config["maxRacks"]
                existing_room.default_color = room_data.get("defaultColor", "#4a4a4a")
                existing_room.is_clickable = room_id in CLICKABLE_ROOMS
                existing_room.is_hover_animation_enabled = room_id in HOVER_ANIMATION_ROOMS
                room_config = existing_room
                print(f"更新机房配置: {room_id}")
            else:
                room_config = RoomLayoutConfig(
                    room_id=room_id,
                    room_name=f"{room_id}机房",
                    cols=grid_config["cols"],
                    rows=grid_config["rows"],
                    max_racks=grid_config["maxRacks"],
                    default_color=room_data.get("defaultColor", "#4a4a4a"),
                    is_clickable=room_id in CLICKABLE_ROOMS,
                    is_hover_animation_enabled=room_id in HOVER_ANIMATION_ROOMS,
                    hover_duration=200,
                    hover_easing='ease-out',
                    hover_scale=1.05,
                    hover_shadow_intensity=0.3,
                )
                db.add(room_config)
                print(f"创建机房配置: {room_id}")

            db.commit()

            db.query(CabinetConfig).filter(CabinetConfig.room_id == room_id).delete()

            enabled_rack_ids = set()
            for assignment in room_data.get("assignments", []):
                if assignment.get("enabled", False):
                    rack_ids = parse_rack_range(assignment["rackRange"])
                    enabled_rack_ids.update(rack_ids)

            for assignment in room_data.get("assignments", []):
                enterprise = assignment.get("enterprise", "未启用")
                rack_ids = parse_rack_range(assignment["rackRange"])
                enabled = assignment.get("enabled", False)

                for rack_id in rack_ids:
                    row = (rack_id - 1) // grid_config["cols"] + 1
                    col = ((rack_id - 1) % grid_config["cols"]) + 1

                    color = "#f8fafc" if enabled else "#4a4a4a"
                    if enabled and enterprise != "未启用":
                        color = get_enterprise_color(enterprise)

                    cabinet = CabinetConfig(
                        room_id=room_id,
                        cabinet_id=rack_id,
                        col_position=col,
                        row_position=row,
                        enterprise=enterprise if enabled else None,
                        enabled=enabled,
                        color=color,
                        is_hidden=False,
                        visible_index=rack_id,
                    )
                    db.add(cabinet)

            db.commit()
            print(f"  -> 迁移了 {len(enabled_rack_ids)} 个启用的机柜到 {room_id}")

            if "areaFrames" in room_data:
                db.query(AreaFrameConfig).filter(AreaFrameConfig.room_id == room_id).delete()
                for frame in room_data["areaFrames"]:
                    area_frame = AreaFrameConfig(
                        room_id=room_id,
                        frame_id=frame["id"],
                        label=frame["label"],
                        rack_range=frame["rackRange"],
                        color=frame.get("color", "#4682B4"),
                        border_width=frame.get("borderWidth", 3),
                        label_position=frame.get("labelPosition", "top"),
                    )
                    db.add(area_frame)
                db.commit()
                print(f"  -> 迁移了 {len(room_data['areaFrames'])} 个区域框架")

        print("\n数据迁移完成!")
        print(f"总共迁移了 {len(ROOM_CONFIG_DATA)} 个机房配置")
        print(f"可点击机房数量: {len(CLICKABLE_ROOMS)}")
        print(f"悬停动画机房数量: {len(HOVER_ANIMATION_ROOMS)}")

    except Exception as e:
        print(f"迁移失败: {e}")
        db.rollback()
        raise
    finally:
        db.close()


if __name__ == "__main__":
    migrate_data()
