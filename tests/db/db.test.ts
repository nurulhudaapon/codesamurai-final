import { createDbClient } from "@ecosync/db/api";

const dbClient = createDbClient(process.env.DATABASE_API_URL, process.env.AUTH_JWT_SECRET);


const vehicleData = await dbClient.from('vehicle').select("*");

console.log(vehicleData);