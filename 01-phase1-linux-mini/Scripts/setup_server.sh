#!/usr/bin/env bash
set -e

echo "=== Phase 1 Mini Project: Linux Automation Setup Script ==="

echo "[1/6] Updating system..."
sudo apt-get update -y
sudo apt-get upgrade -y

echo "[2/6] Installing core tools..."
sudo apt-get install -y git curl

echo "[3/6] Installing Docker..."
sudo apt-get install -y docker.io
sudo systemctl start docker
sudo systemctl enable docker

echo "[4/6] Creating deployment directories..."
sudo mkdir -p /opt/app /opt/logs
sudo chown -R "$USER":"$USER" /opt/app /opt/logs

echo "[5/6] Verifying installs..."
git --version
curl --version
docker --version

echo "[6/6] Checking Docker service..."
sudo systemctl status docker --no-pager | head -n 15

echo "=== Done. ==="
