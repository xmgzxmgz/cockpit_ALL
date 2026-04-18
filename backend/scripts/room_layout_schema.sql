-- 机房机柜配置数据库表结构
-- 用于存储所有机房的机柜布局和企业分配信息

-- 1. 机房布局配置表 (Room Layout Config)
CREATE TABLE IF NOT EXISTS room_layout_config (
    id SERIAL PRIMARY KEY,
    room_id VARCHAR(50) NOT NULL UNIQUE, -- 机房ID (如 '201', '202', '3-1')
    room_name VARCHAR(100), -- 机房名称
    cols INTEGER DEFAULT 30, -- 网格列数，统一为30
    rows INTEGER DEFAULT 30, -- 网格行数，统一为30
    max_racks INTEGER, -- 最大机柜数
    default_color VARCHAR(50) DEFAULT '#4a4a4a', -- 默认颜色
    is_clickable BOOLEAN DEFAULT TRUE, -- 是否可点击
    is_hover_animation_enabled BOOLEAN DEFAULT TRUE, -- 是否开启悬停动画
    hover_duration INTEGER DEFAULT 200, -- 悬停动画持续时间(毫秒)
    hover_easing VARCHAR(50) DEFAULT 'ease-out', -- 悬停动画缓动效果
    hover_scale FLOAT DEFAULT 1.05, -- 悬停时放大比例
    hover_shadow_intensity FLOAT DEFAULT 0.3, -- 悬停时阴影强度
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. 机柜配置表 (Cabinet Config)
CREATE TABLE IF NOT EXISTS cabinet_config (
    id SERIAL PRIMARY KEY,
    room_id VARCHAR(50) NOT NULL, -- 机房ID
    cabinet_id INTEGER NOT NULL, -- 机柜编号 (1, 2, 3...)
    col_position INTEGER NOT NULL, -- 网格列坐标 (1-30)
    row_position INTEGER NOT NULL, -- 网格行坐标 (1-30)
    enterprise VARCHAR(255), -- 机柜所属企业
    enabled BOOLEAN DEFAULT TRUE, -- 是否启用
    color VARCHAR(50), -- 机柜颜色
    is_hidden BOOLEAN DEFAULT FALSE, -- 是否隐藏
    visible_index INTEGER, -- 可见机柜序号
    name VARCHAR(255), -- 机柜名称
    maintainer VARCHAR(100), -- 维护人
    manager VARCHAR(100), -- 客户经理
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(room_id, cabinet_id)
);

-- 3. 区域框架配置表 (Area Frame Config)
CREATE TABLE IF NOT EXISTS area_frame_config (
    id SERIAL PRIMARY KEY,
    room_id VARCHAR(50) NOT NULL, -- 机房ID
    frame_id VARCHAR(50) NOT NULL, -- 框架ID (如 '3-5-1')
    label VARCHAR(100), -- 框架标签
    rack_range TEXT, -- 机柜范围字符串 (如 '111-120,141-150')
    color VARCHAR(50) DEFAULT '#4682B4', -- 框架颜色
    border_width INTEGER DEFAULT 3, -- 边框宽度
    label_position VARCHAR(20) DEFAULT 'top', -- 标签位置: top, bottom, left, right
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(room_id, frame_id)
);

-- 4. 机柜布局排序表 (用于存储随机打乱后的排序)
CREATE TABLE IF NOT EXISTS cabinet_layout_order (
    id SERIAL PRIMARY KEY,
    room_id VARCHAR(50) NOT NULL, -- 机房ID
    original_order JSONB NOT NULL, -- 原始顺序 [1, 2, 3, ...]
    shuffled_order JSONB NOT NULL, -- 打乱后顺序
    shuffle_seed VARCHAR(100), -- 随机种子
    is_active BOOLEAN DEFAULT FALSE, -- 是否当前激活的排序
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(room_id, is_active)
);

-- 5. 数据库备份记录表
CREATE TABLE IF NOT EXISTS db_backup_record (
    id SERIAL PRIMARY KEY,
    backup_name VARCHAR(255) NOT NULL, -- 备份名称
    backup_path VARCHAR(500), -- 备份文件路径
    backup_type VARCHAR(50) DEFAULT 'full', -- full, incremental
    backup_size BIGINT, -- 备份大小(字节)
    checksum VARCHAR(128), -- 校验和
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    description TEXT -- 备份描述
);

-- 创建索引以提升查询性能
CREATE INDEX IF NOT EXISTS idx_cabinet_config_room_id ON cabinet_config(room_id);
CREATE INDEX IF NOT EXISTS idx_cabinet_config_enterprise ON cabinet_config(enterprise);
CREATE INDEX IF NOT EXISTS idx_area_frame_room_id ON area_frame_config(room_id);
CREATE INDEX IF NOT EXISTS idx_cabinet_layout_order_room ON cabinet_layout_order(room_id);
CREATE INDEX IF NOT EXISTS idx_cabinet_layout_order_active ON cabinet_layout_order(room_id, is_active) WHERE is_active = TRUE;

-- 插入所有机房配置数据（包含所有新字段）
INSERT INTO room_layout_config (room_id, room_name, cols, rows, max_racks, default_color, is_clickable, is_hover_animation_enabled, hover_duration, hover_easing, hover_scale, hover_shadow_intensity) VALUES
('1-1', '1-1机房', 30, 30, 720, '#4a4a4a', TRUE, TRUE, 200, 'ease-out', 1.05, 0.3),
('201', '201机房', 30, 30, 660, '#4a4a4a', TRUE, TRUE, 200, 'ease-out', 1.05, 0.3),
('202', '202机房', 30, 30, 660, '#4a4a4a', TRUE, TRUE, 200, 'ease-out', 1.05, 0.3),
('203', '203机房', 30, 30, 660, '#4a4a4a', TRUE, TRUE, 200, 'ease-out', 1.05, 0.3),
('204', '204机房', 30, 30, 660, '#4a4a4a', TRUE, TRUE, 200, 'ease-out', 1.05, 0.3),
('205', '205机房', 30, 30, 690, '#4a4a4a', TRUE, TRUE, 200, 'ease-out', 1.05, 0.3),
('206', '206机房', 30, 30, 660, '#4a4a4a', TRUE, TRUE, 200, 'ease-out', 1.05, 0.3),
('3-1', '3-1机房', 30, 30, 660, '#4a4a4a', TRUE, TRUE, 200, 'ease-out', 1.05, 0.3),
('3-2', '3-2机房', 30, 30, 660, '#4a4a4a', TRUE, TRUE, 200, 'ease-out', 1.05, 0.3),
('3-3', '3-3机房', 30, 30, 660, '#4a4a4a', TRUE, TRUE, 200, 'ease-out', 1.05, 0.3),
('3-4', '3-4机房', 30, 30, 660, '#4a4a4a', TRUE, TRUE, 200, 'ease-out', 1.05, 0.3),
('3-5', '3-5机房', 30, 30, 720, '#4a4a4a', TRUE, TRUE, 200, 'ease-out', 1.05, 0.3),
('3-6', '3-6机房', 30, 30, 660, '#4a4a4a', TRUE, TRUE, 200, 'ease-out', 1.05, 0.3),
('401', '401机房', 30, 30, 660, '#4a4a4a', TRUE, TRUE, 200, 'ease-out', 1.05, 0.3),
('402', '402机房', 30, 30, 660, '#4a4a4a', TRUE, TRUE, 200, 'ease-out', 1.05, 0.3),
('403', '403机房', 30, 30, 660, '#4a4a4a', TRUE, TRUE, 200, 'ease-out', 1.05, 0.3),
('404', '404机房', 30, 30, 660, '#4a4a4a', TRUE, TRUE, 200, 'ease-out', 1.05, 0.3),
('405', '405机房', 30, 30, 660, '#4a4a4a', TRUE, TRUE, 200, 'ease-out', 1.05, 0.3),
('406', '406机房', 30, 30, 660, '#4a4a4a', TRUE, TRUE, 200, 'ease-out', 1.05, 0.3),
('501', '501机房', 30, 30, 660, '#4a4a4a', TRUE, TRUE, 200, 'ease-out', 1.05, 0.3),
('502', '502机房', 30, 30, 660, '#4a4a4a', TRUE, TRUE, 200, 'ease-out', 1.05, 0.3),
('503', '503机房', 30, 30, 600, '#4a4a4a', TRUE, TRUE, 200, 'ease-out', 1.05, 0.3)
ON CONFLICT (room_id) DO UPDATE SET
    room_name = EXCLUDED.room_name,
    cols = EXCLUDED.cols,
    rows = EXCLUDED.rows,
    max_racks = EXCLUDED.max_racks,
    default_color = EXCLUDED.default_color,
    is_clickable = EXCLUDED.is_clickable,
    is_hover_animation_enabled = EXCLUDED.is_hover_animation_enabled,
    hover_duration = EXCLUDED.hover_duration,
    hover_easing = EXCLUDED.hover_easing,
    hover_scale = EXCLUDED.hover_scale,
    hover_shadow_intensity = EXCLUDED.hover_shadow_intensity,
    updated_at = CURRENT_TIMESTAMP;

-- 插入3-5机房的区域框架配置
INSERT INTO area_frame_config (room_id, frame_id, label, rack_range, color, border_width, label_position) VALUES
('3-5', '3-5-1', '3-5-1', '111-120,141-150,171-180,201-210,231-240,261-270,291-300,321-330,351-360,381-390,411-420,441-450,471-480,501-510,531-540,561-570,591-600,621-630,651-660', '#4682B4', 5, 'top'),
('3-5', '3-5-2', '3-5-2', '101-110,131-140,161-170,191-200,221-230,251-260,281-290,311-320,341-350,371-380,401-410,431-440,461-470,491-500,521-530,551-560,581-590,611-620,641-650,671-680,701-710', '#AFEEEE', 5, 'top'),
('3-5', '3-5-3', '3-5-3', '91-100,121-130,151-160,181-190,211-220,241-250,271-280,301-310,331-340,361-370,391-400,421-430,451-460,481-490,511-520,541-550,571-580,601-610,631-640,661-670,691-700', '#00FA9A', 5, 'top')
ON CONFLICT (room_id, frame_id) DO UPDATE SET
    label = EXCLUDED.label,
    rack_range = EXCLUDED.rack_range,
    color = EXCLUDED.color,
    border_width = EXCLUDED.border_width,
    label_position = EXCLUDED.label_position,
    updated_at = CURRENT_TIMESTAMP;