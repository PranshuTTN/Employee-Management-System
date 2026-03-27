# 👥 EmpTrack — Employee Management System POC
### Spring Boot + React Full-Stack Application

---

## 🏗️ Architecture Overview

```
┌─────────────────────────────────────────────────────────┐
│                   REACT FRONTEND (Port 3000)            │
│  ┌──────────┐  ┌──────────────┐  ┌──────────────────┐  │
│  │ StatsBar │  │ EmployeeList │  │  EmployeeForm    │  │
│  └──────────┘  └──────────────┘  └──────────────────┘  │
│                 EmployeeService (Axios HTTP Client)      │
└──────────────────────────┬──────────────────────────────┘
                           │ REST API calls
                    ┌──────▼──────┐
                    │  HTTP/JSON  │
                    └──────┬──────┘
┌──────────────────────────▼──────────────────────────────┐
│               SPRING BOOT BACKEND (Port 8080)           │
│  ┌─────────────────────────────────────────────────┐    │
│  │        EmployeeController  (@RestController)    │    │
│  │   GET /api/employees      - List all            │    │
│  │   GET /api/employees/:id  - Get one             │    │
│  │   POST /api/employees     - Create              │    │
│  │   PUT /api/employees/:id  - Update              │    │
│  │   DELETE /api/employees/:id - Delete            │    │
│  │   GET /api/employees/search?keyword=x - Search  │    │
│  │   GET /api/employees/stats - Dashboard stats    │    │
│  └─────────────────────────────────────────────────┘    │
│  ┌─────────────────────────────────────────────────┐    │
│  │         EmployeeRepository (Spring Data JPA)    │    │
│  └─────────────────────────────────────────────────┘    │
│  ┌─────────────────────────────────────────────────┐    │
│  │         H2 In-Memory Database                   │    │
│  └─────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────┘
```

---

## ✅ Prerequisites

| Tool | Version | Download |
|------|---------|----------|
| Java JDK | 17+ | https://adoptium.net |
| Maven | 3.8+ | https://maven.apache.org |
| Node.js | 18+ | https://nodejs.org |
| npm | 9+ | Comes with Node.js |

---

## 🚀 Step-by-Step Setup

### STEP 1 — Clone / Extract Project

```
project-root/
├── backend/          ← Spring Boot
│   ├── pom.xml
│   └── src/
│       └── main/
│           ├── java/com/poc/employee/
│           │   ├── EmployeeApplication.java
│           │   ├── model/Employee.java
│           │   ├── repository/EmployeeRepository.java
│           │   ├── controller/EmployeeController.java
│           │   └── config/DataSeeder.java
│           └── resources/
│               └── application.properties
└── frontend/         ← React
    ├── package.json
    └── src/
        ├── App.js
        ├── App.css
        ├── index.js
        ├── services/EmployeeService.js
        └── components/
            ├── EmployeeList.js
            ├── EmployeeForm.js
            └── StatsBar.js
```

---

### STEP 2 — Start Spring Boot Backend

```bash
# Navigate to backend folder
cd backend

# Build the project (downloads dependencies)
mvn clean install

# Run the application
mvn spring-boot:run
```

**Expected output:**
```
  .   ____          _            __ _ _
 /\\ / ___'_ __ _ _(_)_ __  __ _ \ \ \ \
...
✅ Seeded 6 demo employees
Started EmployeeApplication in 2.3 seconds
```

**Verify backend is running:**
- API Base URL: http://localhost:8080/api/employees
- H2 Database Console: http://localhost:8080/h2-console
  - JDBC URL: `jdbc:h2:mem:employeedb`
  - Username: `sa` | Password: *(leave blank)*

---

### STEP 3 — Start React Frontend

```bash
# Open a NEW terminal window/tab
# Navigate to frontend folder
cd frontend

# Install dependencies
npm install

# Start the development server
npm start
```

**Expected output:**
```
Compiled successfully!
Local: http://localhost:3000
```

Browser opens automatically at **http://localhost:3000** 🎉

---

## 🎯 Features to Showcase

### ✅ CRUD Operations
| Operation | React | API |
|-----------|-------|-----|
| **View** employees | EmployeeList renders cards | GET /api/employees |
| **Add** employee | Click "+ Add Employee" | POST /api/employees |
| **Edit** employee | Click "✏️ Edit" on any card | PUT /api/employees/{id} |
| **Delete** employee | Click "🗑️ Delete" → confirm | DELETE /api/employees/{id} |

### ✅ React Concepts Demonstrated
- **useState** — form state, employee list, notification, search
- **useEffect** — fetch data on mount and when search changes
- **useCallback** — optimized fetch functions
- **Props** — Employee data passed between components
- **Controlled Components** — All form inputs
- **Conditional Rendering** — List vs Form view switching
- **Component Composition** — App → EmployeeList → EmployeeCard

### ✅ Spring Boot Concepts Demonstrated
- **@RestController** — REST endpoints
- **@CrossOrigin** — CORS for React frontend
- **Spring Data JPA** — Repository pattern, no SQL boilerplate
- **H2 Database** — In-memory DB, zero setup
- **Bean Validation** — @NotBlank, @Email on entity
- **CommandLineRunner** — Pre-seeded demo data
- **Custom @Query** — Search across multiple columns

---

## 🔌 API Reference

### Get All Employees
```
GET http://localhost:8080/api/employees
```

### Get Employee by ID
```
GET http://localhost:8080/api/employees/1
```

### Create Employee
```
POST http://localhost:8080/api/employees
Content-Type: application/json

{
  "firstName": "Virat",
  "lastName": "Kohli",
  "email": "virat@company.com",
  "department": "Engineering",
  "role": "Tech Lead",
  "salary": 2000000
}
```

### Update Employee
```
PUT http://localhost:8080/api/employees/1
Content-Type: application/json

{
  "firstName": "Virat",
  "lastName": "Kohli",
  "email": "virat@company.com",
  "department": "Engineering",
  "role": "Senior Developer",
  "status": "ACTIVE",
  "salary": 2200000
}
```

### Delete Employee
```
DELETE http://localhost:8080/api/employees/1
```

### Search Employees
```
GET http://localhost:8080/api/employees/search?keyword=rahul
```

### Dashboard Stats
```
GET http://localhost:8080/api/employees/stats
Response: { "total": 6, "active": 5, "inactive": 1 }
```

---

## 🛠️ Test with cURL

```bash
# List all
curl http://localhost:8080/api/employees

# Create one
curl -X POST http://localhost:8080/api/employees \
  -H "Content-Type: application/json" \
  -d '{"firstName":"Test","lastName":"User","email":"test@co.com","department":"Engineering","role":"Developer","salary":1000000}'

# Delete (replace 7 with actual id)
curl -X DELETE http://localhost:8080/api/employees/7
```

---

## 🐛 Troubleshooting

| Problem | Fix |
|---------|-----|
| Port 8080 already in use | `kill $(lsof -t -i:8080)` or change `server.port` in application.properties |
| Port 3000 already in use | `kill $(lsof -t -i:3000)` or `PORT=3001 npm start` |
| CORS error in browser | Ensure backend is running on port 8080 and `@CrossOrigin` is set |
| npm install fails | Delete `node_modules/` folder and run `npm install` again |
| H2 console not loading | Check `spring.h2.console.enabled=true` in properties |
| Java version error | Ensure `JAVA_HOME` is set to JDK 17+ |

---
