# Database Schema Roadmap 🗄

**Database Engine**: MySQL 8.0  
**Database Name**: `agrivision_ai`

## Planned Tables (Upcoming Modules)

1. `users`: Stores core authentication credentials, role (FARMER, ADMIN, AGRONOMIST), and status.
2. `farmers`: Stores farmer profiles, preferred language (English, Kannada, Hindi), location details (State, District).
3. `farms`: Stores land area, soil type, irrigation availability, previous crop, and location coordinates.
4. `soil_reports`: Stores NPK values, pH, organic carbon content, and soil test timestamps.
5. `crops`: Knowledge base table storing crop metadata, ideal temperature/rainfall ranges, pH boundaries, and NPK requirements.
6. `recommendation_history`: Audit trail for generated suitability scores and AI recommendations.
