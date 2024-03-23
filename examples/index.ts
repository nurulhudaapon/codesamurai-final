import { EcosyncDbClient } from "@ecosync/client";
import { EcosyncDatabase } from "@ecosync/db";

const client = new EcosyncDbClient();
const db = new EcosyncDatabase();

const result = db.init();
const users = client.getUsers();
