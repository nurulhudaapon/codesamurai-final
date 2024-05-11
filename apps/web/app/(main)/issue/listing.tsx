"use client";
import { DatabaseEntity } from "@ecosync/db";
import { Helpers } from "@ecosync/utils";
import { CheckCheckIcon, Search } from "lucide-react";
import { useState } from "react";
import { updateIssue } from "./server";

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
        {filteredData.map((issue) => (
          <IssueCard issue={issue} />
        ))}
      </div>
    </div>
  );
};

const IssueCard = ({ issue }: { issue: DatabaseEntity["issue"] }) => {
  const handleUpdateIssue = async (
    id: string,
    issue: Partial<DatabaseEntity["issue"]>
  ) => {
    await updateIssue(id, issue);
    // reload the data
    window.location.reload();
  };
  return (
    <div className="col-span-full rounded-md border border-solid text-white p-4 shadow-sm md:col-span-6 lg:col-span-3 w-full max-w-md bg-white shadow-lg rounded-lg overflow-hidden mx-auto mb-4">
      {issue.attachments?.[0] && (
        <img
          className="w-full h-56 object-cover object-center"
          src={issue.attachments?.[0]}
          alt="Issue"
        />
      )}
      <div className="px-6 py-4">
        <div className="font-bold text-gray-800 text-xl mb-2">
          {issue.title}
        </div>
        <p className="text-gray-700 text-base">{issue.description}</p>
        <p className="text-gray-500 text-bold mt-2 text-sm">
          {Helpers.Time.formatToDateTime(issue.created_at)}
        </p>
      </div>
      <div className="px-6 py-4">
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
          {Helpers.String.toTitleCase(issue.type || "")}
        </span>
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
          {Helpers.String.toTitleCase(issue.status || "")}
        </span>
      </div>
      <hr />
      <div className="flex self-end align-end justify-around flex-row mt-4">
        <span className="inline-block bg-gray-100 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
          {(issue.status === "reviewed" || issue.status === "resolved") ? (
            <span className="text-blue-500">Reviewed</span>
          ) : (
            <button
              onClick={() =>
                handleUpdateIssue(issue.id, { status: "reviewed" })
              }
              className="text-blue-500"
            >
              Mark as Reviewed
            </button>
          )}
        </span>

        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 ">
          {issue.status === "resolved" ? (
            <span className="text-green-500">Resolved</span>
          ) : (
            <button
              onClick={() =>
                handleUpdateIssue(issue.id, { status: "resolved" })
              }
              className="text-green-500"
            >
              Mark as Resolved
            </button>
          )}
        </span>
      </div>
    </div>
  );
};
