// import { getAllSts } from "./server";
import { StatsCard } from "@/components/card";
import MainListing from "./listing";
import { cubeClient, dbClient } from "@/client";
import { Helpers } from "@ecosync/utils";

export default async function IndexPage() {
  // const data = await dbClient

  return (
    <>
      <div className="mb-6">
        <h1 className="font-semibold text-lg">Issue Overview</h1>
      </div>
      <div className="grid grid-cols-6 gap-4 xl:gap-6">
        {/* <StatsCard title={"Today"} value={totalCapacity + Helpers.String.pluralize(" issue", totalCapacity)} />
        <StatsCard title={"Total"} value={totalVolume + Helpers.String.pluralize(" issue", totalVolume)} />
        <StatsCard title={"Reviewed"} value={totalDumped + Helpers.String.pluralize(" issue", totalDumped)} />
        <StatsCard title={"Flagged"} value={totalDumped + Helpers.String.pluralize(" issue", totalDumped)} /> */}
      </div>
      {/* <MainListing data={data} /> */}
    </>
  );
}

export const dynamic = "force-dynamic";
