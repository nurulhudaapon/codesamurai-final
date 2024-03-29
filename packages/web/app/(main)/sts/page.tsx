import { getAllSTS } from "./server";
import StsMain from "./main-sts";

export default async function IndexPage() {
  const STS = await getAllSTS();
  return <StsMain STS={STS} />;
}
