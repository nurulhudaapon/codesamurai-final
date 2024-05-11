import { StatsCard } from "@/components/card";
import { cubeClient, dbApiClient, dbClient } from "@/client";
import { Helpers } from "@ecosync/utils";
import { IssueCardList } from "./listing";

export default async function IndexPage() {
  const { data } = await dbApiClient
    .from("issue")
    .select("*", { count: "exact" })
    .order("created_at", { ascending: false })
    .limit(50);
  const stats = await cubeClient.getIssueStats();

  return (
    <>
      <div className="mb-6">
        <h1 className="font-semibold text-lg">Issue Overview</h1>
      </div>
      <div className="grid grid-cols-12 gap-4 xl:gap-6">
        <StatsCard
          title={"Today"}
          value={
            stats.today.count +
            Helpers.String.pluralize(" issue", stats.today.count)
          }
        />
        <StatsCard
          title={"Total"}
          value={
            stats.total.count +
            Helpers.String.pluralize(" issue", stats.total.count)
          }
        />
        <StatsCard
          title={"Reviewed"}
          value={
            stats.reviewed.count +
            Helpers.String.pluralize(" issue", stats.reviewed.count)
          }
        />
        <StatsCard
          title={"Flagged"}
          value={
            stats.flagged.count +
            Helpers.String.pluralize(" issue", stats.flagged.count)
          }
        />
      </div>
      <IssueCardList data={data || []} />
    </>
  );
}

export const dynamic = "force-dynamic";
