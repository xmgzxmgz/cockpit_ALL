#!/usr/bin/env python3
import json
import subprocess
import sys
import urllib.request


API_BASE = "http://127.0.0.1:8002"


def http_get_json(path: str):
    with urllib.request.urlopen(f"{API_BASE}{path}", timeout=8) as resp:
        return json.loads(resp.read().decode("utf-8"))


def query_counts():
    sql = (
        "SELECT 'enterprises', COUNT(*) FROM enterprises "
        "UNION ALL SELECT 'rooms', COUNT(*) FROM rooms "
        "UNION ALL SELECT 'cabinets', COUNT(*) FROM cabinets "
        "UNION ALL SELECT 'feature_categories', COUNT(*) FROM feature_categories "
        "UNION ALL SELECT 'monitoring_features', COUNT(*) FROM monitoring_features "
        "UNION ALL SELECT 'feature_metrics', COUNT(*) FROM feature_metrics "
        "UNION ALL SELECT 'alert_rules', COUNT(*) FROM alert_rules "
        "UNION ALL SELECT 'alerts', COUNT(*) FROM alerts "
        "UNION ALL SELECT 'environment_readings', COUNT(*) FROM environment_readings "
        "UNION ALL SELECT 'power_events', COUNT(*) FROM power_events "
        "UNION ALL SELECT 'server_metrics', COUNT(*) FROM server_metrics "
        "UNION ALL SELECT 'network_metrics', COUNT(*) FROM network_metrics "
        "UNION ALL SELECT 'application_metrics', COUNT(*) FROM application_metrics "
        "UNION ALL SELECT 'security_events', COUNT(*) FROM security_events "
        "UNION ALL SELECT 'oncall_schedules', COUNT(*) FROM oncall_schedules "
        "UNION ALL SELECT 'inspection_reports', COUNT(*) FROM inspection_reports "
        "UNION ALL SELECT 'firmware_inventory', COUNT(*) FROM firmware_inventory "
        "UNION ALL SELECT 'maintenance_assets', COUNT(*) FROM maintenance_assets "
        "UNION ALL SELECT 'knowledge_base_links', COUNT(*) FROM knowledge_base_links;"
    )
    cmd = [
        "docker",
        "exec",
        "cockpit-db",
        "psql",
        "-U",
        "user",
        "-d",
        "cockpit_db",
        "-t",
        "-A",
        "-F",
        "|",
        "-c",
        sql,
    ]
    proc = subprocess.run(cmd, capture_output=True, text=True)
    if proc.returncode != 0:
        raise RuntimeError(proc.stderr.strip())
    data = {}
    for line in proc.stdout.splitlines():
        if not line.strip():
            continue
        k, v = line.split("|", 1)
        data[k] = int(v)
    return data


def main() -> int:
    try:
        health = http_get_json("/health")
        overview = http_get_json("/api/stats/overview")
        alerts = http_get_json("/api/alerts")
        env = http_get_json("/api/environment/readings")
        power = http_get_json("/api/power/events")
        counts = query_counts()

        payload = {
            "success": True,
            "health": health,
            "overview": overview,
            "sample_sizes": {
                "alerts": len(alerts),
                "environment_readings": len(env),
                "power_events": len(power),
            },
            "db_counts": counts,
        }
        print(json.dumps(payload, ensure_ascii=False, indent=2))
        return 0
    except Exception as exc:
        print(json.dumps({"success": False, "error": str(exc)}, ensure_ascii=False, indent=2))
        return 1


if __name__ == "__main__":
    sys.exit(main())
