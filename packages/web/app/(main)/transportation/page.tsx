import { StatsCard } from "@/components/card";
import { cubeClient, dbClient } from "@/client";

export default async function IndexPage() {
  const data = await dbClient.transportation.getAll();
  const stats = await cubeClient.getTransportationStats();

  const way = stats?.data.way?.[0]?.transportation
  const transported = stats?.data.dumped?.[0].transportation;

  return (
    <>
      <div className="mb-6">
        <h1 className="font-semibold text-lg">Overview</h1>
      </div>
      <div className="grid grid-cols-6 gap-4 xl:gap-6">
        <StatsCard
          title={"On the way"}
          value={`${way.total_volume || 0} Tons | ${way.count || 0} Vehicles`}
        />
        <StatsCard
          title={"Transported"}
          value={`${transported.total_volume || 0} Tons | ${transported.count || 0} Vehicles`}
        />

      </div>
    </>
  );
}

export const dynamic = "force-dynamic";