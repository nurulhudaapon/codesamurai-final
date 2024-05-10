import { createDbClient } from "@ecosync/db/api";

export const dbClient = createDbClient(process.env.DATABASE_API_URL, process.env.AUTH_JWT_SECRET);
