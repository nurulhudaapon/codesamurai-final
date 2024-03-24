import Image from "next/image";
import styles from "./page.module.css";
import { EcosyncDatabase } from "@ecosync/db";
import { EcosyncDbClient } from "@ecosync/client";

const db = new EcosyncDatabase();
const client = new EcosyncDbClient({ db });

export default async function Home() {
  const users = await client.getUsers();
  console.log(users)

  return (
    <main className={styles.main}>
      <pre>{
        JSON.stringify(users, null, 2)
      }</pre>
    </main>
  );
}
