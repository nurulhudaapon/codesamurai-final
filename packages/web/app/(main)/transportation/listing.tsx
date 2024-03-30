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

const tableHeaders = [
  "Time",
  "Volume",
  "Departure Time",
  "Arrival Time",
];

const MainListing = ({ data }: { data: Entity.transportation[] }) => {
  const [search, setSearch] = useState<string>("");

  const filteredData = data.filter((data) =>
    JSON.stringify(data)
      .toLowerCase()
      .includes(search?.toLowerCase() || "")
  );

  return (
    <div className="flex flex-col">
      <h1 className="text-lg font-bold my-4">
        Manage Transportation
      </h1>
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
        <Link href="/transportation/new">
          <Button className="pl-3">
            <Icon name="Plus" />
            Add New Transportation
          </Button>
        </Link>
      </div>

      <div>
        <Table>
          <TableHead>
            <TableRow>
              {tableHeaders.map((header, idx) => (
                <TableHeader key={idx}>{header}</TableHeader>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.map((item, idx) => (
              <TableRow key={idx}>
                <TableCell>{item.created_at.toLocaleString()}</TableCell>
                <TableCell>{item.volume} tons</TableCell>
                <TableCell>{item.departure_time.toLocaleString()}</TableCell>
                <TableCell>{item.arrival_time?.toLocaleString() || '-'}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="flex justify-end my-4 gap-2">
          <button>
            <div className="bg-green-600 p-1 rounded-sm text-white">
              <ChevronLeft />
            </div>
          </button>
          <button>
            <div className="bg-green-600 p-1 rounded-sm text-white">
              <ChevronRight />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MainListing;
