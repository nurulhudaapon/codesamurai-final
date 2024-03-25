import Image from "next/image";
import { EcosyncDatabase } from "@ecosync/db";
import { EcosyncDbClient } from "@ecosync/client";
import { Log } from "./client";

const db = new EcosyncDatabase();
const client = new EcosyncDbClient({ db });

export default async function Home() {
  const users = await client.user.getAll();

  return (
    <main>
      <Log data={users} />
      <pre>{
        JSON.stringify(users, null, 2)
      }</pre>
    </main>
  );
}
