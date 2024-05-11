import { getServerAuthSession } from "@/utils/auth";
import { EcosyncDbClient } from "@ecosync/client";
import { EcosyncCubeClient } from "@ecosync/cube";
import { EcosyncDatabase } from "@ecosync/db";
import { createDbApiClient } from "./api";

let db: EcosyncDatabase = null!;
if (!db) db = new EcosyncDatabase();

export const dbClient = new EcosyncDbClient({ db });
export const cubeClient = new EcosyncCubeClient({
  tokenGetter: async () => {
    const session = await getServerAuthSession();
    // return session;

    return "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MTE0ODE5MjYsImV4cCI6MTkxMTU2ODMyNn0.fgCWcMbI8vwtWazlJvPUbva2PgbSs-xDbPMazv2BiFI";
  },
  graphQlUrl: process.env.NEXT_PUBLIC_CUBEJS_GRAPHQL_API || "",
});

export const dbApiClient = createDbApiClient(process.env.DATABASE_API_URL || process.env.NEXT_PUBLIC_DATABASE_API_URL, process.env.AUTH_JWT_SECRET | 'dfd');