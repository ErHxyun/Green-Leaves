# Green-Leaves Backend

A minimal Express API to serve timeline data for the frontend.

## Endpoints
- `GET /api/health` — Health check
- `GET /api/timeline/:year` — Returns JSON for the requested year (from `src/data/<year>.json`).

## Local Development
```powershell
# In backend folder
npm install
npm run dev
# Open http://localhost:8080/api/health
# Example: http://localhost:8080/api/timeline/2016
```

## Connecting Frontend
Update your frontend fetch to call `http://localhost:8080/api/timeline/2016` (or use a `REACT_APP_API_BASE` env var). Enable CORS is already configured.

## Production Run
```powershell
npm install
npm start
```

## Docker
```powershell
# Build image
docker build -t green-leaves-backend .
# Run container
docker run -p 8080:8080 green-leaves-backend
```

## Deploy Options
- Railway / Render: Create a service from this repo's `backend` folder; set `PORT=8080` if needed.
- Azure App Service: Deploy the Docker image or Node app; expose `8080`.
- Frontend: Build CRA (`npm run build` in `frontend`) and host separately (Vercel/Netlify/Static hosting). Or copy `frontend/build` into `backend` to serve statically.
