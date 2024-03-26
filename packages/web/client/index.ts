import { EcosyncDbClient } from "@ecosync/client";
import { EcosyncCubeClient } from "@ecosync/cube";
import { EcosyncDatabase } from "@ecosync/db";

const db = new EcosyncDatabase();

export const dbClient = new EcosyncDbClient({ db });
export const cubeClient = new EcosyncCubeClient({
    graphQlUrl: process.env.NEXT_PUBLIC_CUBEJS_GRAPHQL_API
})