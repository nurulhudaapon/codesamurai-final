import { getAllSts } from "./server";
import StsMain from "./main";
import { StatsCard } from "@/components/card";
import { cubeClient } from "@/client";
import { ST } from "next/dist/shared/lib/utils";

export default async function IndexPage() {
  const STS = await getAllSts();
  var capacity_sts = 0;
  STS.map((sts) => {
    capacity_sts += sts.capacity_tonnes;
  });

  return (
    <>
      <div className="mb-6">
        <h1 className="font-semibold text-lg">Overview</h1>
      </div>
      <div className="flex gap-4">
        <StatsCard
          title={"Total Secondary Transport Stations"}
          value={STS.length}
        />
        <StatsCard
          title={"Total STS Capacity"}
          value={capacity_sts + " Tons"}
        />
        {/* <StatsCard title={"Total Waste Disposed"} value={" Times"} /> */}
      </div>
      <StsMain STS={STS} />
    </>
  );
}

export const dynamic = "force-dynamic";
