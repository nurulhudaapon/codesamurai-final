// import { getAllSts } from "./server";
import MainListing from "./main";
import { dbClient } from "@/client";

export default async function IndexPage() {
  const data = await dbClient.landfill.getAll();
  
  return <MainListing data={data} />;
}
