// import { getAllSts } from "./server";
import { StatsCard } from "@/components/card";
import MainListing from "./main";
import { cubeClient, dbClient } from "@/client";

export default async function IndexPage() {
  const data = await dbClient.landfill.getAll();
  const transportData = await dbClient.transportation.getAll();
  // const stats = await cubeClient.getLandfillStats();
  var totalVolume = 0;
  var totalDumped = 0;
  var totalCapacity = 0;
  data.forEach((element) => {
    totalCapacity += element.capacity_tonnes;
  });
  transportData.forEach((element) => {
    // TODO: fix typo paddding -> panding
    if (!element.padding) {
      totalVolume += element.volume;
      totalDumped += 1;
    }
  });

  return (
    <>
      <div className="mb-6">
        <h1 className="font-semibold text-lg">Overview</h1>
      </div>
      <div className="grid grid-cols-9 gap-4 xl:gap-6">
        <StatsCard title={"Total Capacity"} value={totalCapacity + " Tons"} />
        <StatsCard title={"Total Volume"} value={totalVolume + " Tons"} />
        <StatsCard title={"Total Dumped"} value={totalDumped + " Times"} />
      </div>
      <MainListing data={data} />
    </>
  );
}

export const dynamic = "force-dynamic";
