# Negotiated Studies – DevOps CI/CD Final Project

## Overview
This project represents the **final phase** of my negotiated studies module. It consolidates the learning and technical skills developed in **Phases 1–3** into a single, complete DevOps solution.

The outcome is a fully automated **CI/CD pipeline on AWS**, built using **Infrastructure as Code**, containerisation, and monitoring tools. The system demonstrates how modern DevOps practices can be applied to deliver, deploy, and observe an application in a repeatable and controlled way.

---

## Project Objectives
The purpose of this project was to:

- Design and deploy a complete CI/CD pipeline using industry-standard DevOps tools
- Apply **Infrastructure-as-Code (IaC)** principles using AWS CloudFormation
- Automate build, deployment, and validation stages using Jenkins
- Containerise services using Docker and Docker Compose
- Implement monitoring and observability using Prometheus and Grafana
- Document design decisions, configuration files, and system behaviour clearly

---

## Architecture Overview
The system is deployed on a single AWS EC2 instance provisioned using **CloudFormation**.

### Core components:
- **Jenkins** – CI/CD automation server
- **Docker & Docker Compose** – Containerisation and service orchestration
- **Application service** – Node.js app exposing Prometheus metrics
- **Prometheus** – Metrics collection and scraping
- **Grafana** – Metrics visualisation and dashboards
- **GitHub** – Source control and pipeline trigger

All services run as containers managed through Docker Compose.

---

## CI/CD Pipeline
The CI/CD pipeline is defined declaratively using a `Jenkinsfile` and performs the following stages:

1. **Checkout** – Source code pulled from GitHub
2. **Build** – Application Docker image built using Docker Compose
3. **Deploy** – Updated container deployed automatically
4. **Smoke Test** – Application health endpoint validated post-deployment

This pipeline demonstrates **continuous delivery**, ensuring that any change pushed to the repository can be built, deployed, and verified automatically.

---

## Infrastructure as Code (IaC)
AWS infrastructure is defined and provisioned using **CloudFormation**, including:

- EC2 instance
- IAM role
- Security group configuration
- Networking rules

Using IaC ensures:
- Repeatable deployments
- Version-controlled infrastructure
- Reduced configuration drift

---

## Monitoring & Observability
Monitoring is implemented using **Prometheus** and **Grafana**.

### Metrics collected include:
- Total HTTP requests
- HTTP request rate
- Application CPU usage
- Application memory usage

Grafana dashboards visualise these metrics in real time, providing insight into application behaviour and system performance after deployment.

---

## Constraints and Mitigation
The project was built using the **AWS Free Tier**, which imposed resource constraints (limited memory).

Mitigations included:
- Careful instance sizing
- Swap configuration
- Jenkins JVM memory tuning
- Staged service startup to maintain stability

These decisions reflect realistic DevOps problem-solving and operational awareness.

---

## Learning Outcomes Mapping
This project demonstrates the following learning outcomes:

- **LO2** – Automation of build and deployment processes using Jenkins
- **LO4** – Cloud infrastructure provisioned and managed using Infrastructure as Code
- **LO5** – Continuous delivery through containerised deployment
- **LO6** – Monitoring and observability using Prometheus and Grafana

---

## Skills and Behaviours Demonstrated
The project evidences:

- **S22** – Professional development through practical DevOps implementation
- **B4** – Clear communication through structured documentation
- **B5** – Tool selection and justification based on constraints
- **B7** – Awareness and application of modern DevOps practices

---

## Repository Structure
