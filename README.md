
# Micronaut React

> Estrutura fullstack moderna com backend em Micronaut (Java) e frontend em React (Vite + TypeScript).

## Estrutura do Projeto

- **backend/**: API REST com Micronaut, Java e Maven. Inclui controllers, entidades, repositórios e configuração.
- **frontend/**: SPA com React, Vite, TypeScript, Zustand, Axios e Material UI. Componentes, páginas, serviços e gerenciamento de estado.

## Como rodar

### Backend

**Bash:**
```bash
export FRONTEND_URL=http://localhost:5173 && \
    mvn clean mn:run -Dmicronaut.test.resources.enabled=false
```

**PowerShell:**
```powershell
$env:FRONTEND_URL="http://localhost:5173"; mvn clean mn:run -Dmicronaut.test.resources.enabled=false
```

### Frontend

```bash
npm install
npm run dev
```

---

Ambos os projetos são independentes, mas integrados via API REST. Consulte as pastas `backend/` e `frontend/` para detalhes de código e arquitetura.
