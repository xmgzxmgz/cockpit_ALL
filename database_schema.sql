-- 数据库初始化脚本
-- 创建表结构

-- 1. 企业表 (Enterprises)
CREATE TABLE IF NOT EXISTS enterprises (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL, -- FKHNAME: 企业名称
    full_name VARCHAR(255),     -- FENAME: 企业全称
    maintainer VARCHAR(100),    -- 维护人员
    manager VARCHAR(100),       -- KHMANAGE: 客户经理
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. 机房表 (Rooms)
CREATE TABLE IF NOT EXISTS rooms (
    id VARCHAR(50) PRIMARY KEY, -- 机房ID (如 '201', '202')
    name VARCHAR(100) NOT NULL,
    location VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. 机柜表 (Cabinets)
CREATE TABLE IF NOT EXISTS cabinets (
    id SERIAL PRIMARY KEY,
    room_id VARCHAR(50) REFERENCES rooms(id),
    enterprise_id INTEGER REFERENCES enterprises(id),
    cabinet_label VARCHAR(50) NOT NULL, -- 机柜编号
    status VARCHAR(50) DEFAULT 'active', -- 状态
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(room_id, cabinet_label)
);

-- 插入初始模拟数据 (为了演示功能)

-- 插入机房
INSERT INTO rooms (id, name, location) VALUES 
('201', '201机房', '二楼东侧'),
('202', '202机房', '二楼西侧'),
('203', '203机房', '二楼南侧'),
('204', '204机房', '二楼北侧')
ON CONFLICT (id) DO NOTHING;

-- 插入企业
INSERT INTO enterprises (name, full_name, maintainer, manager) VALUES 
('示例企业A', '示例企业A全称科技有限公司', '徐祺炜', '张经理'),
('示例企业B', '示例企业B全称网络技术有限公司', '李运维', '王经理'),
('示例企业C', '示例企业C全称数据服务有限公司', '张技术', '赵经理'),
('示例企业D', '示例企业D全称云存储有限公司', '刘支持', '孙经理')
ON CONFLICT DO NOTHING;

-- 插入机柜数据 (示例)
-- 201机房分配给企业A和B
INSERT INTO cabinets (room_id, enterprise_id, cabinet_label) 
SELECT '201', id, 'A01' FROM enterprises WHERE name = '示例企业A'
UNION ALL
SELECT '201', id, 'A02' FROM enterprises WHERE name = '示例企业B'
UNION ALL
SELECT '201', id, 'A03' FROM enterprises WHERE name = '示例企业A'
UNION ALL
SELECT '201', id, 'A04' FROM enterprises WHERE name = '示例企业B'
ON CONFLICT DO NOTHING;

-- 202机房分配给企业C
INSERT INTO cabinets (room_id, enterprise_id, cabinet_label)
SELECT '202', id, 'B01' FROM enterprises WHERE name = '示例企业C'
UNION ALL
SELECT '202', id, 'B02' FROM enterprises WHERE name = '示例企业C'
ON CONFLICT DO NOTHING;
