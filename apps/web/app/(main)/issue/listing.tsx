"use client";
import { DatabaseEntity } from "@ecosync/db";
import { Search } from "lucide-react";
import { useState } from "react";

export const IssueCardList = ({
  data,
}: {
  data: DatabaseEntity["issue"][];
}) => {
  const [search, setSearch] = useState<string>("");

  const filteredData = data.filter((data) =>
    JSON.stringify(data)
      .toLowerCase()
      .includes(search?.toLowerCase() || "")
  );

  return (
    <div className="flex flex-col">
      <h1 className="text-lg font-bold my-4">Monitor Issues</h1>
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

      <div className="grid grid-cols-12 gap-4 xl:gap-6">
        {
          filteredData.map((issue) => (
            <IssueCard issue={issue} />
          ))
        }
      </div>
    </div>
  );
};



const IssueCard = ({ issue }: { issue: DatabaseEntity['issue']}) => {
  return (
    <div className="col-span-full rounded-md border border-solid text-white p-4 shadow-sm md:col-span-6 lg:col-span-3 w-full max-w-md bg-white shadow-lg rounded-lg overflow-hidden mx-auto mb-4">
      {issue.attachments?.[0] && <img className="w-full h-56 object-cover object-center" src={issue.attachments?.[0]} alt="Issue" />}
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{issue.title}</div>
        <p className="text-gray-700 text-base">{issue.description}</p>
      </div>
      <div className="px-6 py-4">
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
          {issue.type}
        </span>
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
          {issue.status}
        </span>
      </div>
    </div>
  );
};
