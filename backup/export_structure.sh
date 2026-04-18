#!/bin/bash
# 导出完整的数据库结构

echo "正在导出 Cockpit 数据库完整结构..."
echo "==========================================="
echo ""

OUTPUT_FILE="/Users/xiamuguizhi/code/cockpit_ALL/backup/database_structure.txt"

# 清空输出文件
> "$OUTPUT_FILE"

echo "==============================================" >> "$OUTPUT_FILE"
echo "  COCKPIT 数据库完整结构" >> "$OUTPUT_FILE"
echo "  Date: $(date)" >> "$OUTPUT_FILE"
echo "==============================================" >> "$OUTPUT_FILE"
echo "" >> "$OUTPUT_FILE"

# 获取所有表
TABLES=$(docker exec cockpit-db psql -U user -d cockpit_db -t -c "SELECT tablename FROM pg_tables WHERE schemaname = 'public' ORDER BY tablename;")

echo "发现 $(echo "$TABLES" | wc -l) 个表"

for table in $TABLES; do
    echo "========================================" >> "$OUTPUT_FILE"
    echo " 表名: $table" >> "$OUTPUT_FILE"
    echo "========================================" >> "$OUTPUT_FILE"
    
    # 获取表结构
    docker exec cockpit-db psql -U user -d cockpit_db -c "\d+ $table" >> "$OUTPUT_FILE"
    
    # 获取数据量
    ROW_COUNT=$(docker exec cockpit-db psql -U user -d cockpit_db -t -c "SELECT COUNT(*) FROM \"$table\";")
    echo "" >> "$OUTPUT_FILE"
    echo "数据量: $ROW_COUNT 条" >> "$OUTPUT_FILE"
    echo "" >> "$OUTPUT_FILE"
done

echo "" >> "$OUTPUT_FILE"
echo "==============================================" >> "$OUTPUT_FILE"
echo "  数据库连接信息" >> "$OUTPUT_FILE"
echo "==============================================" >> "$OUTPUT_FILE"
echo "  主机: localhost" >> "$OUTPUT_FILE"
echo "  端口: 5434" >> "$OUTPUT_FILE"
echo "  用户名: user" >> "$OUTPUT_FILE"
echo "  数据库名: cockpit_db" >> "$OUTPUT_FILE"
echo "==============================================" >> "$OUTPUT_FILE"

echo ""
echo "✅ 数据库结构已导出到: $OUTPUT_FILE"
