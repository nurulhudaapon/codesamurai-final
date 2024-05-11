"use client";

import { DatabaseEntity } from "@ecosync/db";
import { Search } from "lucide-react";
import { useState } from "react";
import { updateIssue } from "./server";
import Button from "@/components/button";
import { Icon } from "@/components/icon";
import { RoutePlanner } from "@/components/routePlanner";

export const CollectionPlanCardList = ({
  data,
}: {
  data: DatabaseEntity["collection_plan"][];
}) => {
  const [search, setSearch] = useState<string>("");

  const filteredData = data.filter((data) =>
    JSON.stringify(data)
      .toLowerCase()
      .includes(search?.toLowerCase() || "")
  );

  return (
    <div className="flex flex-col">
      <h1 className="text-lg font-bold my-4">Collection Planning</h1>
      <a href="/collection/new">
        <Button className="pl-3">
          <Icon name="Plus" />
          Create Plan
        </Button>
      </a>
      <div className="flex justify-between items-center mb-5">
        <div className="flex flex-row relative">
          <input
            type="text"
            placeholder="Search"
            className="border pl-10 p-2 rounded-md w-96"
            onChange={(e) => setSearch(e.target.value)}
          />
          <Search className="absolute top-2 left-2" />
        </div>
      </div>

      <div className="grid grid-cols-10 gap-4 xl:gap-6">
        {filteredData.map((data) => (
          <CollectionPlanCard data={data} />
        ))}
      </div>
    </div>
  );
};

const CollectionPlanCard = ({
  data,
}: {
  data: DatabaseEntity["collection_plan"];
}) => {
  const handleUpdateIssue = async (
    id: string,
    issue: Partial<DatabaseEntity["issue"]>
  ) => {
    await updateIssue(id, issue);
    // reload the data
    window.location.reload();
  };

  const locations = JSON.parse(data.area_of_collection);

  return (
    <div className="col-span-full rounded-md border border-solid text-white p-4 shadow-sm md:col-span-6 lg:col-span-3 w-full max-w-md bg-white shadow-lg rounded-lg overflow-hidden mx-auto mb-4">
      <p className="text-black">
        Duration: {data.collection_duration} days
        <br />
        Number of Laborers: {data.num_laborers}
        <br />
        Number of Vans: {data.num_vans}
        <br />
        Expected Weight of Daily Solid Waste: {
          data.expected_weight_per_day
        }{" "}
        tonnes
        <br />
      </p>
      <RoutePlanner location={locations} />
      {/* <Button>Generate</Button> */}
    </div>
  );
};
