#!/usr/bin/env python3
import json
import subprocess
from datetime import datetime, timezone
from pathlib import Path


PROJECT_ROOT = Path(__file__).resolve().parents[1]
OUTPUT_FILE = PROJECT_ROOT / "docs" / "ER_INFO.md"
DB_CONTAINER = "cockpit-db"
DB_USER = "user"
DB_NAME = "cockpit_db"


def run_psql(sql: str) -> list[str]:
    cmd = [
        "docker",
        "exec",
        DB_CONTAINER,
        "psql",
        "-U",
        DB_USER,
        "-d",
        DB_NAME,
        "-t",
        "-A",
        "-F",
        "|",
        "-c",
        sql,
    ]
    proc = subprocess.run(cmd, capture_output=True, text=True)
    if proc.returncode != 0:
        raise RuntimeError(f"psql failed: {proc.stderr.strip()}")
    return [line for line in proc.stdout.splitlines() if line.strip()]


def fetch_tables() -> list[str]:
    sql = """
    SELECT table_name
    FROM information_schema.tables
    WHERE table_schema='public' AND table_type='BASE TABLE'
    ORDER BY table_name;
    """
    return run_psql(sql)


def fetch_columns() -> list[dict]:
    sql = """
    SELECT
      c.table_name,
      c.column_name,
      c.data_type,
      CASE WHEN c.is_nullable='YES' THEN 'YES' ELSE 'NO' END AS nullable,
      COALESCE(c.column_default, '') AS column_default,
      CASE WHEN tc.constraint_type='PRIMARY KEY' THEN 'YES' ELSE 'NO' END AS is_pk
    FROM information_schema.columns c
    LEFT JOIN information_schema.key_column_usage kcu
      ON c.table_name = kcu.table_name
      AND c.column_name = kcu.column_name
      AND c.table_schema = kcu.table_schema
    LEFT JOIN information_schema.table_constraints tc
      ON kcu.constraint_name = tc.constraint_name
      AND kcu.table_schema = tc.table_schema
    WHERE c.table_schema='public'
    ORDER BY c.table_name, c.ordinal_position;
    """
    rows = []
    for line in run_psql(sql):
        table, column, data_type, nullable, default, is_pk = line.split("|", 5)
        rows.append(
            {
                "table": table,
                "column": column,
                "data_type": data_type,
                "nullable": nullable,
                "default": default,
                "is_pk": is_pk,
            }
        )
    return rows


def fetch_foreign_keys() -> list[dict]:
    sql = """
    SELECT
      tc.table_name AS source_table,
      kcu.column_name AS source_column,
      ccu.table_name AS target_table,
      ccu.column_name AS target_column,
      tc.constraint_name
    FROM information_schema.table_constraints tc
    JOIN information_schema.key_column_usage kcu
      ON tc.constraint_name = kcu.constraint_name
      AND tc.table_schema = kcu.table_schema
    JOIN information_schema.constraint_column_usage ccu
      ON ccu.constraint_name = tc.constraint_name
      AND ccu.table_schema = tc.table_schema
    WHERE tc.constraint_type = 'FOREIGN KEY'
      AND tc.table_schema='public'
    ORDER BY source_table, source_column;
    """
    rows = []
    for line in run_psql(sql):
        src_t, src_c, dst_t, dst_c, cons = line.split("|", 4)
        rows.append(
            {
                "constraint": cons,
                "source_table": src_t,
                "source_column": src_c,
                "target_table": dst_t,
                "target_column": dst_c,
            }
        )
    return rows


def fetch_row_counts(tables: list[str]) -> dict:
    counts = {}
    for t in tables:
        rows = run_psql(f'SELECT COUNT(*) FROM "{t}";')
        counts[t] = int(rows[0]) if rows else 0
    return counts


def main() -> int:
    OUTPUT_FILE.parent.mkdir(parents=True, exist_ok=True)

    tables = fetch_tables()
    columns = fetch_columns()
    foreign_keys = fetch_foreign_keys()
    row_counts = fetch_row_counts(tables)

    by_table = {}
    for col in columns:
        by_table.setdefault(col["table"], []).append(col)

    lines = []
    lines.append("# ER 图数据说明")
    lines.append("")
    lines.append(f"- 导出时间(UTC): {datetime.now(timezone.utc).isoformat()}")
    lines.append(f"- 数据库: `{DB_NAME}`")
    lines.append(f"- 容器: `{DB_CONTAINER}`")
    lines.append("")
    lines.append("## 表清单与行数")
    lines.append("")
    for t in tables:
        lines.append(f"- `{t}`: {row_counts.get(t, 0)} rows")
    lines.append("")
    lines.append("## 外键关系")
    lines.append("")
    if foreign_keys:
        for fk in foreign_keys:
            lines.append(
                f"- `{fk['source_table']}.{fk['source_column']}` -> "
                f"`{fk['target_table']}.{fk['target_column']}` "
                f"({fk['constraint']})"
            )
    else:
        lines.append("- 无外键")
    lines.append("")
    lines.append("## 字段明细")
    lines.append("")
    for t in tables:
        lines.append(f"### `{t}`")
        lines.append("")
        lines.append("| column | type | pk | nullable | default |")
        lines.append("|---|---|---|---|---|")
        for c in by_table.get(t, []):
            lines.append(
                f"| `{c['column']}` | `{c['data_type']}` | {c['is_pk']} | "
                f"{c['nullable']} | `{c['default']}` |"
            )
        lines.append("")

    lines.append("## 可直接给 Gemini 的结构化 JSON")
    lines.append("")
    payload = {
        "tables": tables,
        "row_counts": row_counts,
        "foreign_keys": foreign_keys,
        "columns": columns,
    }
    lines.append("```json")
    lines.append(json.dumps(payload, ensure_ascii=False, indent=2))
    lines.append("```")
    lines.append("")

    OUTPUT_FILE.write_text("\n".join(lines), encoding="utf-8")
    print(f"Wrote {OUTPUT_FILE}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
