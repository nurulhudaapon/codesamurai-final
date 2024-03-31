# EcoSync
### A monorepo for the Ecosync - an app to to bridge the gaps, streamline processes, and enhance accountability through technological innovation.

### Docker Instruction
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

### Credentials
Default Admin: 
```
admin@ecosync.gov.bd
```

Default Admin Password: 
```
password
```
