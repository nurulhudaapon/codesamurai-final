import { createDbApiClient } from "@ecosync/db/api";

export const dbClient = createDbApiClient("http://localhost:8080", "ecosync-jwt-secret");