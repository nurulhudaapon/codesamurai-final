import { getAllSts } from "./server";
import StsMain from "./main";
import { StatsCard } from "@/components/card";
import { cubeClient } from "@/client";

export default async function IndexPage() {
  const STS = await getAllSts();
  const stats = await cubeClient.getStsStats();

  return (
    <>
      <div className="mb-6">
        <h1 className="font-semibold text-lg">Overview</h1>
      </div>
      <div className="grid grid-cols-9 gap-4 xl:gap-6">
        <StatsCard
          title={"Total Capacity"}
          value={stats.sts?.total_capacity_tonnes + " Tons"}
        />
        <StatsCard
          title={"Total Volume Disposed"}
          value={stats.transportation?.total_volume + " Tons"}
        />
        <StatsCard
          title={"Total Waste Disposed"}
          value={stats.transportation?.count + " Times"}
        />
      </div>
      <StsMain STS={STS} />
      </>
  );
}

export const dynamic = "force-dynamic";