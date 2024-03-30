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

const tableHeaders = [
  "Ward Number",
  "Capacity",
  "Latitude",
  "Longitude",
  "Manager ID",
];

const StsMain = ({ STS }: { STS: Entity.sts[] }) => {
  const [search, setSearch] = useState<string>("");
  const newSTS = STS.filter((data) =>
    JSON.stringify(data)
      .toLowerCase()
      .includes(search?.toLowerCase() || "")
  );

  return (
    <div className="flex flex-col">
      <h1 className="text-lg font-bold my-4">
        Manage Secondary Transfer Stations
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
        <a href="/sts/new">
          <Button className="pl-3">
            <Icon name="Plus" />
            Add New STS
          </Button>
        </a>
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
            {newSTS.map((item, idx) => (
              <TableRow key={idx}>
                <TableCell>{item.ward_number}</TableCell>
                <TableCell>{item.capacity_tonnes} tons</TableCell>
                <TableCell>{item.latitude}</TableCell>
                <TableCell>{item.longitude}</TableCell>
                <TableCell>{item.manager_id}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="flex justify-end my-4 gap-1">
          <button>
            <div className="bg-green-600 rounded-sm text-white">
              <ChevronLeft />
            </div>
          </button>
          <button>
            <div className="bg-green-600 rounded-sm text-white">
              <ChevronRight />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default StsMain;
