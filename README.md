# EcoSync
### A monorepo for the Ecosync - an app to to bridge the gaps, streamline processes, and enhance accountability through technological innovation.

### Docker Instruction

Step 1: To build, deploy db schema
```bash
# To build and run all docker containers
docker compose up -d --build

# To deploy the database schema
docker container exec -d web npm run deploy -w @ecosync/db
```

Step 2: To seed database with initial data
```bash
# To go inside docker container
docker exec -it web bash

# To seed the database with inital data (including some dummy data)
npm run seed -w @ecosync/db
```
### Open the App

Runs on: 
```
http://localhost:3000
```

Credentials
```
Email: admin@ecosync.gov.bd
Password: password
```

### Local Instruction (If docker fails)

Prerequisite
- Have Node v20
- Bun v1 installed

To start other service except web
```bash
docker compose up -d db redis cube
```

To install dependancies
```bash
npm ci
```

To deploy the database schema
```bash
npm run deploy -w @ecosync/db
```

To seed the database with inital data (including some dummy data)
```bash
npm run seed -w @ecosync/db
```

To build web app
```bash
npm run build -w @ecosync/web
```

To start web app
```bash
npm start -w @ecosync/web
```

### Technologies
- NextJS 14: As the frontend framework as well as the backend
- Postgresql: As the core database for OLTP storage
- CubeJs: As the OLAP DB to pre-aggregate statistics for speed and scalibity
- TailwindCSS: As the CSS Utility for styling
