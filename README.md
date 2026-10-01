# SindaAgro – AI-Powered Smart Agriculture & Crop Decision Platform 🌾🤖

[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.3.2-brightgreen.svg)](https://spring.io/projects/spring-boot)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.141.1-009688.svg)](https://fastapi.tiangolo.com/)
[![React](https://img.shields.io/badge/React-18.3.1-61DAFB.svg)](https://reactjs.org/)
[![Kotlin](https://img.shields.io/badge/Kotlin-1.9.22-7F52FF.svg)](https://kotlinlang.org/)
[![MySQL](https://img.shields.io/badge/MySQL-8.0-4479A1.svg)](https://www.mysql.com/)

**SindaAgro** is a comprehensive, production-grade monorepo platform designed to empower smallholder farmers and agricultural extension officers with AI-driven crop selection, suitability scoring, split fertilizer schedules, weather risk alerts, and high-value cash crop financial projections.

---

## 🏗️ System Architecture

```
                                  ┌─────────────────────────┐
                                  │   React Web Frontend    │
                                  │   (Vite 5 + Glass UI)   │
                                  └────────────┬────────────┘
                                               │
                                               │ HTTP / REST (JWT)
                                               ▼
┌─────────────────────────┐       ┌─────────────────────────┐       ┌─────────────────────────┐
│  Android Mobile App     ├──────►│   Spring Boot 3 Core    ├──────►│   MySQL Database        │
│  (Kotlin + Retrofit 2)  │       │   Backend Gateway       │       │   (sindaagro_db)        │
└─────────────────────────┘       └────────────┬────────────┘       └─────────────────────────┘
                                               │
                                               │ HTTP RestTemplate / RestClient
                                               ▼
                                  ┌─────────────────────────┐
                                  │  Python AI Microservice │
                                  │ (FastAPI + Random Forest│
                                  │   97.9% ML Classifier)  │
                                  └─────────────────────────┘
```

---

## ⚡ Core Features & Engines

1. **Rule-Based & ML Hybrid Recommendation Engine**:
   - Computes 0–100% crop suitability scores based on pH match (25%), NPK balance (35%), water match (15%), seasonal climate match (15%), and crop rotation bonus (10%).
   - Integrated Random Forest Classifier (`ai-service/`) trained on regional soil & climate signatures with **97.92% accuracy**.
2. **Step-by-Step Farming Procedure Generator**:
   - Recommends land preparation, certified seed selection (variety + seed rate), and split NPK fertilizer application schedules (Day 0 Basal + Day 30 Top Dressing 1 + Day 55 Top Dressing 2).
3. **High-Value Commercial Crop Engine**:
   - Calculates gross revenue, input costs, net profit/acre, and profit multipliers (e.g. 21.0x for Turmeric vs traditional cereal baselines).
4. **Agro-Climatic Weather Risk Alert Engine**:
   - Analyzes 7-day weather forecasts for Fungal Disease Outbreaks (Humidity ≥ 80% + Temp 24–34°C), Unseasonal Flooding (Rain ≥ 40mm), High Wind Lodging, and Thermal Stress.
5. **Unified Master 10-Question Decision Gateway**:
   - Consolidates all engine outputs into a single payload answering the 10 core agricultural questions asked by farmers.

---

## 💻 Tech Stack & Monorepo Structure

```
AgriVision-AI/
├── backend/                  # Java 17, Spring Boot 3.3.2, JPA, Spring Security 6, JWT
├── ai-service/               # Python 3.14, FastAPI, Scikit-Learn, Pandas, NumPy, Pytest
├── frontend/                 # React 18, Vite 5, Lucide Icons, Glassmorphism Dark UI
├── android/                  # Kotlin 1.9, Android SDK 34, Retrofit 2, Material3 UI
└── README.md
```

---

## 🗄️ Database Configuration

- **Database System**: MySQL 8.0
- **Database Name**: `sindaagro_db`
- **Host / Port**: `localhost:3308` (Windows service `MySQL80`)
- **Username**: `root`

### Creation SQL:
```sql
CREATE DATABASE IF NOT EXISTS sindaagro_db;
USE sindaagro_db;
```

---

## 🚀 Getting Started

### 1. Spring Boot Backend (`backend/`)
```bash
cd backend
mvn clean test
mvn spring-boot:run
```
*Backend runs at:* `http://localhost:8080`

### 2. Python AI Microservice (`ai-service/`)
```bash
cd ai-service
.\venv\Scripts\python app/ml/train_model.py
.\venv\Scripts\uvicorn main:app --reload --port 8000
```
*AI Service runs at:* `http://localhost:8000`

### 3. React Web Frontend (`frontend/`)
```bash
cd frontend
npm install
npm run dev
```
*Web App runs at:* `http://localhost:5173`

---

## 🧪 Verification & Test Suite Summary

- **Spring Boot Backend**: 40/40 Unit & Integration Tests Passed (`mvn clean test`).
- **Python AI Microservice**: 2/2 Pytest Suite Passed (`pytest`).
- **React Web App**: Production assets compiled cleanly (`npm run build`).

---

## 📜 License
This project is licensed under the MIT License - see the LICENSE file for details.
