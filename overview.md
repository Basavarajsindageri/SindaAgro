# System Architecture Overview 🏛

## High-Level Architecture Diagram

```
                              ┌────────────────────────┐
                              │  Android Mobile App    │
                              │   (Jetpack Compose)    │
                              └───────────┬────────────┘
                                          │
                                          ▼
┌────────────────────────┐     ┌───────────────────────┐
│  React Web Application │ ──► │  Spring Boot Backend  │
│      (Vite + JS)       │     │     (Java 21 REST)    │
└────────────────────────┘     └──────────┬────────────┘
                                          │
                  ┌───────────────────────┼────────────────────────┐
                  │                       │                        │
                  ▼                       ▼                        ▼
       ┌────────────────────┐   ┌──────────────────┐   ┌──────────────────────┐
       │   MySQL Database   │   │ Python AI Service│   │ External Services    │
       │  (agrivision_ai)   │   │    (FastAPI)     │   │ (Weather & Market)   │
       └────────────────────┘   └──────────────────┘   └──────────────────────┘
```

## Architectural Principles

1. **Modular Monolith Backend**: The core Spring Boot application is logically separated by feature domains (`user`, `farmer`, `farm`, `soil`, `crop`, `recommendation`, `farmingplan`, `weather`, `market`).
2. **DTO Layer Scoping**: Database entities are strictly encapsulated within the service layer. Controllers receive and return validated Data Transfer Objects (DTOs).
3. **Decoupled AI Engine**: The Python FastAPI service handles machine learning model execution and mathematical optimizations, communicated asynchronously or synchronously via REST from Spring Boot.
4. **Offline-First Mobile Architecture**: Android client caches critical farm data locally via Room database and synchronizes background tasks via WorkManager.
