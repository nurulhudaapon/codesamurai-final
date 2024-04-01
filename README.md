# EcoSync
### A monorepo for the Ecosync - an app to to bridge the gaps, streamline processes, and enhance accountability through technological innovation.

### Docker Instruction

To build, deploy db schema and seed database with initial data
```bash
# To build and run all docker containers
docker compose up -d --build

# To deploy the database schema
docker container exec -d web npm run deploy -w @ecosync/db

# To seed the database with inital data (including some dummy data)
docker container exec -d web npm run seed -w @ecosync/db
```

**Runs on: http://localhost:3000**

**Credentials (email/password): admin@ecosync.gov.bd/password**


### Docker Instruction (detailed - Not neccessary to execute, the above will do all at once)
To build and run all docker containers
```bash
docker compose up -d --build
```

To deploy the database schema
```bash
docker container exec -d web npm run deploy -w @ecosync/db
```

To seed the database with inital data (including some dummy data)
```bash
docker container exec -d web npm run seed -w @ecosync/db
```

**Runs on: http://localhost:3000**

**Credentials (email/password): admin@ecosync.gov.bd/password**

### Local Instruction
Have Node v20 and Bun v1 installed

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

**Runs on: http://localhost:3000**

**Credentials (email/password): admin@ecosync.gov.bd/password**


### App Host
The app will be running on http://localhost:3000

### Credentials
Default Admin: 
```
admin@ecosync.gov.bd
```

Default Admin Password: 
```
password
```

### Technologies
- NextJS 14: As the frontend framework as well as the backend
- Postgresql: As the core database for OLTP storage
- CubeJs: As the OLAP DB to pre-aggregate statistics for speed and scalibity
- TailwindCSS: As the CSS Utility for styling
