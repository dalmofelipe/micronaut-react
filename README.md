### Micronaut React Template

### Stack

- **Backend**: API REST com Micronaut, Java, Maven e JDBC (H2, PostgreSQL).
- **Frontend**: SPA com React, Vite, TypeScript, Zustand, Axios, TanStack Query e Material UI.

### Backend

**Bash:**
```bash
cd backend
export FRONTEND_URL=http://localhost:5173 && \
    mvn clean mn:run -Dmicronaut.test.resources.enabled=false
```

**PowerShell:**
```powershell
$env:FRONTEND_URL="http://localhost:5173"; `
    mvn clean mn:run -Dmicronaut.test.resources.enabled=false
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```
