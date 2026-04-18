"""重新生成所有机房的机柜数据，按照30x20网格布局"""
import sys
import os
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from app.room_layout_db import SessionLocal, RoomLayoutConfig, CabinetConfig

# 企业列表
ENTERPRISES = [
    "示例企业A", "示例企业B", "示例企业C", "示例企业D", "示例企业E",
    "科技公司1", "网络服务2", "数据中心3", "云服务4", "安全公司5",
    "金融科技6", "人工智能7", "物联网8", "区块链9", "大数据10",
    "教育科技11", "医疗科技12", "游戏公司13", "电商平台14", "物流科技15",
    "新能源16", "智能制造17", "农业科技18", "环保科技19", "航空科技20",
    "汽车科技21", "房地产22", "零售科技23", "媒体科技24", "旅游科技25",
    "保险科技26", "法律科技27", "人力资源28", "市场营销29", "广告科技30",
    "健康科技31", "体育科技32", "娱乐科技33", "时尚科技34", "家居科技35",
    "宠物科技36", "儿童科技37", "老年科技38", "公益科技39", "政府服务40",
    "军队系统41", "科研机构42", "大学院校43", "医院系统44", "银行系统45",
    "证券系统46", "保险系统47", "电信系统48", "电力系统49", "交通系统50",
    "水利系统51", "环保系统52"
]

# 颜色映射
ENTERPRISE_COLORS = {
    "示例企业A": "#1890FF", "示例企业B": "#52C41A", "示例企业C": "#FA8C16",
    "示例企业D": "#F5222D", "示例企业E": "#722ED1",
    "科技公司1": "#13C2C2", "网络服务2": "#1890FF", "数据中心3": "#2F54EB",
    "云服务4": "#722ED1", "安全公司5": "#FA541C",
    "金融科技6": "#FAAD14", "人工智能7": "#73D13D", "物联网8": "#597EF7",
    "区块链9": "#B37FEB", "大数据10": "#13C2C2",
    "教育科技11": "#FA8C16", "医疗科技12": "#F759AB", "游戏公司13": "#F5222D",
    "电商平台14": "#13C2C2", "物流科技15": "#722ED1",
    "新能源16": "#52C41A", "智能制造17": "#1890FF", "农业科技18": "#52C41A",
    "环保科技19": "#13C2C2", "航空科技20": "#2F54EB",
    "汽车科技21": "#FA8C16", "房地产22": "#722ED1", "零售科技23": "#FAAD14",
    "媒体科技24": "#FA541C", "旅游科技25": "#597EF7",
    "保险科技26": "#13C2C2", "法律科技27": "#73D13D", "人力资源28": "#B37FEB",
    "市场营销29": "#FA8C16", "广告科技30": "#F759AB",
    "健康科技31": "#52C41A", "体育科技32": "#FA541C", "娱乐科技33": "#F5222D",
    "时尚科技34": "#722ED1", "家居科技35": "#13C2C2",
    "宠物科技36": "#FAAD14", "儿童科技37": "#FA8C16", "老年科技38": "#597EF7",
    "公益科技39": "#73D13D", "政府服务40": "#1890FF",
    "军队系统41": "#722ED1", "科研机构42": "#13C2C2", "大学院校43": "#52C41A",
    "医院系统44": "#F5222D", "银行系统45": "#2F54EB",
    "证券系统46": "#FAAD14", "保险系统47": "#73D13D", "电信系统48": "#1890FF",
    "电力系统49": "#FA8C16", "交通系统50": "#597EF7",
    "水利系统51": "#13C2C2", "环保系统52": "#52C41A"
}


def get_enterprise_color(enterprise: str) -> str:
    """获取企业对应的颜色"""
    return ENTERPRISE_COLORS.get(enterprise, f"#{hash(enterprise) % 0xFFFFFF:06x}")


def regenerate_all_cabinets():
    """重新生成所有机房的机柜数据"""
    print("开始重新生成所有机房的机柜数据...")
    
    db = SessionLocal()
    
    try:
        # 获取所有机房
        rooms = db.query(RoomLayoutConfig).all()
        print(f"找到 {len(rooms)} 个机房")
        
        total_rooms = len(rooms)
        processed_rooms = 0
        
        for room in rooms:
            processed_rooms += 1
            print(f"\n处理机房 {room.room_id} ({processed_rooms}/{total_rooms})")
            
            # 删除现有机柜
            db.query(CabinetConfig).filter(
                CabinetConfig.room_id == room.room_id
            ).delete()
            
            # 生成30x20网格的机柜
            cabinets = []
            for i in range(1, 601):  # 30x20=600个机柜
                # 计算坐标：左上角(1,1)，横向递增
                row = (i - 1) // 30 + 1
                col = (i - 1) % 30 + 1
                
                # 40%的概率分配企业
                import random
                enterprise = None
                color = "#f8fafc"
                
                if random.random() < 0.4:
                    enterprise = random.choice(ENTERPRISES)
                    color = get_enterprise_color(enterprise)
                else:
                    enterprise = "未启用"
                
                cabinet = CabinetConfig(
                    room_id=room.room_id,
                    cabinet_id=i,
                    col_position=col,
                    row_position=row,
                    enterprise=enterprise,
                    enabled=True,
                    color=color,
                    is_hidden=False,
                    visible_index=i,
                    name=None,
                    maintainer=None,
                    manager=None
                )
                cabinets.append(cabinet)
            
            # 随机打乱机柜顺序
            random.shuffle(cabinets)
            
            # 更新可见索引
            for idx, cabinet in enumerate(cabinets, 1):
                cabinet.visible_index = idx
            
            # 批量插入
            db.bulk_save_objects(cabinets)
            print(f"  -> 已生成并打乱 {len(cabinets)} 个机柜")
        
        db.commit()
        print(f"\n所有机房机柜数据重新生成完成！")
        print(f"总计处理 {total_rooms} 个机房")
        print(f"每个机房生成 600 个机柜（30x20网格）")
        
    except Exception as e:
        print(f"重新生成机柜数据失败: {e}")
        db.rollback()
        raise
    finally:
        db.close()


if __name__ == "__main__":
    regenerate_all_cabinets()
    print("\n所有机柜数据重新生成和打乱完成！")
