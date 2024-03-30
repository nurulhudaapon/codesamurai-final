import MainListing from "./listing";
import { dbClient } from "@/client";

export default async function IndexPage() {
  const data = await dbClient.transportation.getAll();
  
  return <MainListing data={data} />;
}
