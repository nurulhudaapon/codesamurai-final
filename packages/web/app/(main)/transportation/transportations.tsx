"use client";

import Button from "@/components/button";
import { Icon } from "@/components/icon";
import {
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  TableCell,
} from "@/components/table";
import {
  getAllTransportationStats,
  getAllTransportationStatsType,
} from "./server";
import { useState } from "react";
import { Table } from "@/components/table";
import { Utils } from "@/utils";
import { TransportationModal } from "./modal";
import { Entity } from "@/types/prisma";

export type TransportatioProps = {
  currentUserId: string;
  stss: Entity.sts[];
  landfills: Entity.landfill[];
  vehicles: Entity.vehicle[];
  transportations: getAllTransportationStatsType;
};

export default function Transportations({
  transportations: trans,
  currentUserId,
  vehicles,
  landfills,
  stss,
}: TransportatioProps) {
  const [transportations, setTransportations] = useState(trans);
  const [modal, setModal] = useState(false);

  const fetchTransportations = async () => {
    const data = await getAllTransportationStats();
    setTransportations(data);
  };

  return (
    <>
      <div className="flex flex-col">
        <div className="flex justify-between items-center mb-5">
          <p className="text-lg font-bold">Transportation</p>
          <Button onClick={() => setModal(true)} className="pl-3">
            <Icon name="Plus" />
            Add New Transportation
          </Button>
        </div>
        <Table>
          <TableHead>
            <TableRow>
              <TableHeader>STS Name</TableHeader>
              <TableHeader>Vehicle Number</TableHeader>
              <TableHeader>Destination</TableHeader>
              <TableHeader>Weight of waste</TableHeader>
              <TableHeader>Deperture</TableHeader>
              <TableHeader>Arrival</TableHeader>
              <TableHeader>Distance</TableHeader>
              <TableHeader>Status - on the way?</TableHeader>
            </TableRow>
          </TableHead>
          <TableBody>
            {transportations.map((item, idx) => (
              <TableRow key={idx}>
                <TableCell>{item.sts?.name}</TableCell>
                <TableCell>
                  {item.vehicle.number} - {item.vehicle.type}
                </TableCell>
                <TableCell>{item.landfill?.name}</TableCell>
                <TableCell>{item.volume} tons</TableCell>
                <TableCell>
                  {item.arrival_time &&
                    Utils.Time.formatDateTime(item.arrival_time)}
                </TableCell>
                <TableCell>
                  {item.padding
                    ? "--:--"
                    : item.departure_time &&
                      Utils.Time.formatDateTime(item.departure_time)}
                </TableCell>
                <TableCell>{item.distance} km</TableCell>
                <TableCell>{item.padding ? "Yes" : "No"}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      {modal && (
        <TransportationModal
          currentUserId={currentUserId}
          stss={stss}
          landfills={landfills}
          vehicles={vehicles}
          onClose={() => setModal(false)}
          triggerUpdate={fetchTransportations}
        />
      )}
    </>
  );
}
