import { getAllSts } from "./server";
import StsMain from "./main-sts";

export default async function IndexPage() {
  const STS = await getAllSts();
  return <StsMain STS={STS} />;
}
