import { StatsCard } from "@/components/card";
import MainListing from "./listing";
import { cubeClient, dbClient } from "@/client";

export default async function IndexPage() {
  const data = await dbClient.transportation.getAll();
  const stats = await cubeClient.getTransportationStats();

  return (
    <>
      <div className="mb-6">
        <h1 className="font-semibold text-lg">Overview</h1>
      </div>
      <div className="grid grid-cols-9 gap-4 xl:gap-6">
        <StatsCard
          title={"Total Capacity"}
          value={stats.landfill.total_capacity_tonnes + " Tons"}
        />
        <StatsCard
          title={"Total Volume"}
          value={stats.transportation.total_volume + " Tons"}
        />
        <StatsCard
          title={"Total Dumped"}
          value={stats.transportation.count + " Times"}
        />
      </div>
      <MainListing data={data} />
    </>
  );
}
