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
  "Name",
  "Capacity",
  "Latitude",
  "Longitude",
  "Operational Time",
];

const MainListing = ({ data }: { data: Entity.landfill[] }) => {
  const [search, setSearch] = useState<string>("");

  const filteredData = data.filter((data) =>
    JSON.stringify(data)
      .toLowerCase()
      .includes(search?.toLowerCase() || "")
  );

  return (
    <div className="flex flex-col">
      <h1 className="text-lg font-bold my-4">
        Manage Landfills
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
        <Link href="/landfill/new">
          <Button className="pl-3">
            <Icon name="Plus" />
            Add New Landfill
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
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.capacity_tonnes} tons</TableCell>
                <TableCell>{item.latitude}</TableCell>
                <TableCell>{item.longitude}</TableCell>
                <TableCell>{item.opens_at} - {item.closes_at}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default MainListing;
