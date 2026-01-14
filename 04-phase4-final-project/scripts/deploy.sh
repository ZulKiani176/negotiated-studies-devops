#!/usr/bin/env bash
set -e

ROOT="/opt/phase4"
SRC="$(pwd)/04-phase4-final-project"

echo "=== Deploying Phase 4 stack ==="
sudo mkdir -p "$ROOT"
sudo rsync -a --delete "$SRC/" "$ROOT/"
cd "$ROOT/monitoring"

echo "[1/2] Building and starting services..."
sudo docker compose up -d --build

echo "[2/2] Running basic verification..."
curl -sSf http://localhost/ || (echo "App not responding" && exit 1)

echo "=== Deploy complete ==="
sudo docker ps --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"
