"use client";
import Button from "@/components/button";
import { Icon } from "@/components/icon";
import { Badge } from "@/components/chip";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/table";
import { Toggle } from "@/components/toggle";
import { useState } from "react";
import * as Entity from "@prisma/client";
import { v4 as uuid } from "uuid";
import Link from "next/link";
import { DatabaseEntity } from "@ecosync/db";

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

  /*
 filteredData: {
    attachments: string[] | null;
    created_at: string;
    created_by_user_id: string | null;
    description: string;
    id: string;
    latitude: number | null;
    longitude: number | null;
    status: "reported" | "in_progress" | "resolved" | null;
    title: string;
    type: string;
    updated_at: string;
  }*/

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

      <div>
        {filteredData.map((issue) => (
          <div className="flex flex-col bg-white rounded-md shadow-md p-4 my-4">
            <div className="flex justify-between items-center">
              <h1 className="text-lg font-bold">{issue.title}</h1>
              <div>{issue.status}</div>
            </div>
            <p className="text-sm text-gray-500 mt-2">{issue.description}</p>
            <div className="flex justify-between mt-4">
              <div className="flex items-center">
                {/* <Icon>
            <ChevronLeft />
          </Icon> */}
                <span className="text-sm ml-2">
                  Reported: {issue.created_at}
                </span>
              </div>
              <div className="flex items-center">
                <span className="text-sm">Updated: {issue.updated_at}</span>
                {/* <Icon>
            <ChevronRight />
          </Icon> */}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
