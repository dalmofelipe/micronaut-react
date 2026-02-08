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

## Media Storage

This project uses a centralized media storage system at the workspace root.

### Directory Structure

```
micronaut-react/
├── backend/           # Backend code
├── frontend/          # Frontend code
├── docs/              # Documentation
└── storage/           # ✅ Media uploads (gitignored)
    └── media/
        └── YYYY/
            └── MM/
                └── DD/
                    └── uuid.ext
```

### Environment Variables

- **`MEDIA_STORAGE_PATH`**: Absolute or relative path to media directory (default: `../storage/media`)
- **`MEDIA_BASE_URL`**: Public URL base for accessing media files (default: `http://localhost:8080/media/`)

### Local Development

No additional setup needed. The default configuration uses `../storage/media` relative to the backend working directory.

Files are automatically organized by date: `storage/media/2026/02/07/uuid.png`

### Docker Compose

Start the entire stack (backend, frontend, database) with persistent media storage:

```bash
docker-compose up --build
```

**Volume mapping:**
- Host: `./storage/media` → Container: `/app/storage/media`

**Environment variables set:**
- `MEDIA_STORAGE_PATH=/app/storage/media`
- `MEDIA_BASE_URL=http://localhost:8080/media/`

### Production

For production deployments, consider using cloud storage:

**Option 1: Volume/NFS Mount**
```yaml
# Set environment variables
MEDIA_STORAGE_PATH=/var/media/uploads
MEDIA_BASE_URL=https://yourdomain.com/media/
```

**Option 2: S3/Cloud Storage (Future)**
```yaml
# Implement S3MediaStorage adapter
MEDIA_STORAGE_TYPE=s3
AWS_S3_BUCKET=your-bucket-name
AWS_REGION=us-east-1
```

The storage layer follows **Clean Architecture** (see [ADR-007](docs/adr/007-clean-architecture-hexagonal.md)):
- **Port**: `MediaStorage` interface in `core/repository/`
- **Adapter**: `LocalMediaStorage` in `adapter/persistence/storage/`
- Easily swappable for S3, Cloudinary, or other implementations
