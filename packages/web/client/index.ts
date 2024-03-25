import { EcosyncDbClient } from "@ecosync/client";
import { EcosyncDatabase } from "@ecosync/db";

const db = new EcosyncDatabase();
export const dbClient = new EcosyncDbClient({ db });

