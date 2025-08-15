# Three-Tier App

> A full-stack three-tier application combining a frontend, backend, and PostgreSQL database, orchestrated with Docker Compose.

---

##  Table of Contents

- [Overview](#overview)  
- [Architecture](#architecture)  
- [Prerequisites](#prerequisites)  
- [Installation & Setup](#installation--setup)  
- [Usage](#usage)  
- [Environment Variables](#environment-variables)  
- [Project Structure](#project-structure)  
- [Testing](#testing) *(if applicable)*  
- [Contributing](#contributing)  
- [License](#license)  
- [Contact](#contact)  

---

## Overview

This application demonstrates a classic three-tier architecture:

1. **Frontend** – user interface (e.g., React, Vue, or plain HTML/JS)  
2. **Backend** – RESTful API (e.g., Node.js/Express)  
3. **Database** – PostgreSQL for persistent storage  

All services are containerized and configured via Docker Compose for easy deployment and development.

---

## Architecture

```plaintext
┌──────────┐        ┌──────────┐        ┌──────────────────┐
│          │        │          │        │                  │
│ Frontend ├───HTTP──► Backend ├───SQL──► PostgreSQL DB     │
│          │        │          │        │                  │
└──────────┘        └──────────┘        └──────────────────┘

---

---

## Prerequisites

Before running the project, ensure you have the following installed on your system:

1. **Docker** – (version X.X or later)
2. **Docker Compose** – (version X.X or later)

You can verify your setup with:

```plaintext
docker --version
docker compose version

