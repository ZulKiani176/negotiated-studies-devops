#!/usr/bin/env bash
set -e
echo "=== Verify ==="
curl -sSf http://localhost/ | head -c 200
echo
echo "Prometheus:"
curl -sSf http://localhost:9090/-/healthy
echo
