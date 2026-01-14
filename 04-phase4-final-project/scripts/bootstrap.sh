#!/usr/bin/env bash
set -e

echo "=== Phase 4 Bootstrap: Jenkins + Docker + Tools ==="

sudo apt-get update -y
sudo apt-get upgrade -y

echo "[1/6] Installing base tools..."
sudo apt-get install -y git curl ca-certificates gnupg lsb-release

echo "[2/6] Installing Docker..."
sudo apt-get install -y docker.io
sudo systemctl enable docker
sudo systemctl start docker

echo "[3/6] Installing Docker Compose plugin..."
sudo apt-get install -y docker-compose-plugin
docker compose version

echo "[4/6] Installing Java (for Jenkins)..."
sudo apt-get install -y fontconfig openjdk-17-jre

echo "[5/6] Installing Jenkins..."
curl -fsSL https://pkg.jenkins.io/debian-stable/jenkins.io-2023.key | sudo tee \
  /usr/share/keyrings/jenkins-keyring.asc > /dev/null
echo deb [signed-by=/usr/share/keyrings/jenkins-keyring.asc] \
  https://pkg.jenkins.io/debian-stable binary/ | sudo tee \
  /etc/apt/sources.list.d/jenkins.list > /dev/null

sudo apt-get update -y
sudo apt-get install -y jenkins
sudo systemctl enable jenkins
sudo systemctl start jenkins

echo "[6/6] Allow Jenkins to run Docker..."
sudo usermod -aG docker jenkins
sudo systemctl restart jenkins

echo "=== Versions ==="
git --version
docker --version
docker compose version
java -version
sudo systemctl status jenkins --no-pager | head -n 15

echo "=== Bootstrap complete ==="
echo "Jenkins initial admin password:"
sudo cat /var/lib/jenkins/secrets/initialAdminPassword || true
