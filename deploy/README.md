# Small-server deployment

Build the frontend locally or in CI before packaging. This Dockerfile uses the prebuilt frontend and never builds React on the 1GB server.

On the server, place this repository's runtime files at /opt/green-leaves. Supply root-readable private/backend.env and private/postgres.env outside the image; uploads/ must be owned by container UID 1000. Do not commit these files. PostgreSQL is only accessible inside the Compose network; backend binds to loopback. Caddy serves api.little-green-leaves.world with managed HTTPS once DNS resolves to the server.

Run: docker compose -f deploy/compose.yml up -d --build

Import the existing database before starting backend. Migration startup preserves existing data. Do not run seeding over a fresh database as a replacement for importing editorial content.

Memory limits, image processing concurrency and a host swap file are required on the initial 1GB plan. Database and uploads backups must both be retained off-server. Daily backups on the same host are only a first recovery layer.

Copy deploy/runtime.dockerignore to the server runtime root as .dockerignore before building. This production archive includes prebuilt frontend/build, which the development root .dockerignore excludes.
