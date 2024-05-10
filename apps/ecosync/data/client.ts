import { createDbApiClient } from "@ecosync/db/api";

export const dbClient = createDbApiClient(process.env.DATABASE_API_URL, process.env.AUTH_JWT_SECRET);
