#!/usr/bin/env python3
import subprocess
import sys

def run_command(cmd):
    """执行docker命令并返回输出"""
    result = subprocess.run(cmd, shell=True, capture_output=True, text=True)
    return result.stdout, result.stderr

def main():
    output_file = "/Users/xiamuguizhi/code/cockpit_ALL/backup/database_structure.md"
    
    with open(output_file, 'w', encoding='utf-8') as f:
        f.write("""# Cockpit 数据库完整结构文档

## 📅 生成日期
- **日期**: 2026年4月19日
- **数据库**: PostgreSQL 15
- **连接**: localhost:5434 / user / password

---

## 📋 数据表列表

| 序号 | 表名 | 说明 |
|------|------|------|
| 1 | `alert_rules` | 告警规则 |
| 2 | `alerts` | 告警记录 |
| 3 | `application_metrics` | 应用指标 |
| 4 | `area_frame_config` | 区域框架配置 |
| 5 | `cabinet_config` | 机柜配置 |
| 6 | `cabinet_grid` | 机柜网格 |
| 7 | `cabinet_layout` | 机柜布局 |
| 8 | `cabinet_layout_order` | 机柜布局顺序 |
| 9 | `cabinets` | 机柜 |
| 10 | `data_center_config` | 数据中心配置 |
| 11 | `db_backup_record` | 数据库备份记录 |
| 12 | `enterprises` | 企业信息 |
| 13 | `environment_readings` | 环境读数 |
| 14 | `feature_categories` | 功能分类 |
| 15 | `feature_metrics` | 功能指标 |
| 16 | `firmware_inventory` | 固件清单 |
| 17 | `floor_config` | 楼层配置 |
| 18 | `inspection_reports` | 巡检报告 |
| 19 | `knowledge_base_links` | 知识库链接 |
| 20 | `maintenance_assets` | 维保资产 |
| 21 | `monitoring_features` | 监控功能 |
| 22 | `network_metrics` | 网络指标 |
| 23 | `oncall_schedules` | 值班排班 |
| 24 | `power_events` | 电力事件 |
| 25 | `resource_overview` | 资源概览 |
| 26 | `room_config` | 机房配置 |
| 27 | `room_layout_config` | 机房布局配置 |
| 28 | `rooms` | 机房信息 |
| 29 | `security_events` | 安全事件 |
| 30 | `server_metrics` | 服务器指标 |

---
""")

        # 获取表列表
        tables_cmd = "docker exec cockpit-db psql -U user -d cockpit_db -t -c \"SELECT tablename FROM pg_tables WHERE schemaname = 'public' ORDER BY tablename;\""
        tables_out, _ = run_command(tables_cmd)
        tables = [t.strip() for t in tables_out.split('\n') if t.strip()]

        for i, table in enumerate(tables, 1):
            f.write(f"\n## {i}. {table}\n")
            f.write("="*80 + "\n")
            
            # 获取表结构
            struct_cmd = f"docker exec cockpit-db psql -U user -d cockpit_db -c \"\\d+ {table}\""
            struct_out, _ = run_command(struct_cmd)
            f.write("```\n")
            f.write(struct_out)
            f.write("```\n")
            
            # 获取数据量
            count_cmd = f"docker exec cockpit-db psql -U user -d cockpit_db -t -c \"SELECT COUNT(*) FROM \\\"{table}\\\";\""
            count_out, _ = run_command(count_cmd)
            f.write(f"\n**数据量**: {count_out.strip()} 条\n")
            
            # 获取示例数据（最多5条）
            try:
                sample_cmd = f"docker exec cockpit-db psql -U user -d cockpit_db -c \"SELECT * FROM \\\"{table}\\\" LIMIT 5;\""
                sample_out, _ = run_command(sample_cmd)
                f.write(f"\n**示例数据**:\n")
                f.write("```\n")
                f.write(sample_out)
                f.write("```\n")
            except:
                pass
                
            f.write("\n---\n")

    print(f"✅ 数据库结构文档已生成: {output_file}")

if __name__ == "__main__":
    main()
