#!/usr/bin/env python3
import argparse
import json
import subprocess
import sys
import time
import urllib.error
import urllib.request
from pathlib import Path


PROJECT_ROOT = Path(__file__).resolve().parents[1]
COMPOSE_FILE = PROJECT_ROOT / "docker-compose.yml"

DB_CONTAINER = "cockpit-db"
DB_USER = "user"
DB_NAME = "cockpit_db"
BACKEND_HEALTH_URL = "http://127.0.0.1:8002/health"
FRONTEND_URL = "http://127.0.0.1:5174"


def run_cmd(cmd: list[str], check: bool = True) -> subprocess.CompletedProcess:
    proc = subprocess.run(cmd, cwd=PROJECT_ROOT, capture_output=True, text=True)
    if check and proc.returncode != 0:
        raise RuntimeError(
            f"Command failed: {' '.join(cmd)}\nstdout:\n{proc.stdout}\nstderr:\n{proc.stderr}"
        )
    return proc


def wait_http_ok(url: str, timeout: int, name: str) -> None:
    deadline = time.time() + timeout
    last_error = ""
    while time.time() < deadline:
        try:
            with urllib.request.urlopen(url, timeout=5) as resp:
                if 200 <= resp.status < 500:
                    return
        except (urllib.error.URLError, urllib.error.HTTPError, TimeoutError) as err:
            last_error = str(err)
        time.sleep(2)
    raise RuntimeError(f"{name} not healthy within {timeout}s. Last error: {last_error}")


def check_db_connectivity() -> dict:
    sql = (
        "SELECT json_build_object("
        "'ok', true, "
        "'db', current_database(), "
        "'user', current_user, "
        "'version', split_part(version(), ',', 1)"
        ");"
    )
    proc = run_cmd(
        [
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
            "-c",
            sql,
        ]
    )
    line = proc.stdout.strip()
    if not line:
        raise RuntimeError("Database connectivity check returned empty output.")
    return json.loads(line)


def check_container_health() -> dict:
    proc = run_cmd(
        [
            "docker",
            "ps",
            "--format",
            "{{.Names}}|{{.Status}}|{{.Ports}}",
        ]
    )
    result = {}
    for line in proc.stdout.splitlines():
        if not line.strip():
            continue
        name, status, ports = line.split("|", 2)
        if name in {"cockpit-frontend", "cockpit-backend", "cockpit-db"}:
            result[name] = {"status": status, "ports": ports}
    return result


def main() -> int:
    parser = argparse.ArgumentParser(
        description="One-click start frontend/backend/database with health checks."
    )
    parser.add_argument(
        "--no-build",
        action="store_true",
        help="Skip image build and only run docker compose up -d.",
    )
    parser.add_argument(
        "--timeout",
        type=int,
        default=120,
        help="Health check timeout seconds for each service.",
    )
    args = parser.parse_args()

    try:
        if not COMPOSE_FILE.exists():
            raise RuntimeError(f"docker-compose file not found: {COMPOSE_FILE}")

        compose_cmd = [
            "docker",
            "compose",
            "-f",
            str(COMPOSE_FILE),
            "up",
            "-d",
        ]
        if not args.no_build:
            compose_cmd.append("--build")

        print("[1/4] Starting docker services...")
        run_cmd(compose_cmd)

        print("[2/4] Waiting backend health endpoint...")
        wait_http_ok(BACKEND_HEALTH_URL, args.timeout, "Backend")

        print("[3/4] Waiting frontend endpoint...")
        wait_http_ok(FRONTEND_URL, args.timeout, "Frontend")

        print("[4/4] Testing PostgreSQL connection...")
        db_info = check_db_connectivity()

        container_info = check_container_health()
        payload = {
            "success": True,
            "frontend": FRONTEND_URL,
            "backend_health": BACKEND_HEALTH_URL,
            "database": db_info,
            "containers": container_info,
        }
        print(json.dumps(payload, ensure_ascii=False, indent=2))
        return 0
    except Exception as err:
        print(
            json.dumps(
                {
                    "success": False,
                    "error": str(err),
                    "hint": "Run `docker compose logs --tail=200` for more details.",
                },
                ensure_ascii=False,
                indent=2,
            )
        )
        return 1


if __name__ == "__main__":
    sys.exit(main())
