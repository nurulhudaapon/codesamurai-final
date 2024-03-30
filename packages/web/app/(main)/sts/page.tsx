import { getAllSts } from "./server";
import StsMain from "./main";

export default async function IndexPage() {
  const STS = await getAllSts();
  return <StsMain STS={STS} />;
}
