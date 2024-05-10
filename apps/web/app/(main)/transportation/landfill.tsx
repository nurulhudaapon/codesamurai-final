"use client";
import { notify } from "@/components/toast";
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
  updateTransportation,
} from "./server";
import { useEffect, useState } from "react";
import { Table } from "@/components/table";
import { Utils } from "@/utils";
import { TransportationModal } from "./modal";
import { Entity } from "@/types/prisma";
import { Download } from "lucide-react";

export type TransportatioProps = {
  currentUserId: string;
  landfills: Entity.landfill | null;
  transportations: getAllTransportationStatsType;
};

export default function LandFill({
  transportations: trans,
  currentUserId,
  landfills,
}: TransportatioProps) {
  const [transportations, setTransportations] = useState(trans);

  const fetchTransportations = async () => {
    const data = await getAllTransportationStats();
    setTransportations(() => data);
  };

  const actionHandler = async (id: string, transportationData: any) => {
    await updateTransportation(id, {
      ...transportationData,
      padding: false,
      departure_time: new Date(),
    })
      .then(() => {
        fetchTransportations();
        notify.success("Transportation updated successfully");
      })
      .catch((e) => {
        notify.error(e.message);
      });
  };

  return (
    <>
      <div className="flex flex-col">
        <div className="mb-5">
          <h1 className="text-lg font-bold">LandFill Management</h1>
          {landfills && (
            <div className="mt-1">
              <h1 className="font-samibold">Name: {landfills.name}</h1>
              <h1 className="font-samibold">
                LandFill Capacity: {landfills.capacity_tonnes} tons
              </h1>
              <p>Manager Id: {landfills.created_by_user_id}</p>
            </div>
          )}
        </div>
        <Table>
          <TableHead>
            <TableRow>
              <TableHeader>STS Name- Source Of Waste</TableHeader>
              <TableHeader>Vehicle Number</TableHeader>
              <TableHeader>Volume of Waste</TableHeader>
              <TableHeader>Deperture</TableHeader>
              <TableHeader>Arrival</TableHeader>
              <TableHeader>Action - Status</TableHeader>
              <TableHeader>Distance</TableHeader>
            </TableRow>
          </TableHead>
          <TableBody>
            {transportations
              .filter(
                (item) => currentUserId == item.landfill?.created_by_user_id //TODO: landfill.manager_id
              )
              .map((item, idx) => (
                <TableRow key={idx}>
                  <TableCell>{item.sts?.name}</TableCell>
                  <TableCell>
                    {item.vehicle.number} - {item.vehicle.type}
                  </TableCell>
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
                  <TableCell>
                    <ActionCheckBox
                      checked={!item.padding}
                      onChange={() => actionHandler(item.id, item)}
                    />
                  </TableCell>
                  <TableCell>{item.distance} km</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>

        {/* Billing... */}
        <div className="mt-20">
          <div className="mb-5">
            <h1 className="text-lg font-bold">
              Billing Information of each transportation
            </h1>
          </div>
          <Table>
            <TableHead>
              <TableRow>
                <TableHeader>Vehicle Number</TableHeader>
                <TableHeader>Vehicle Capacity</TableHeader>
                <TableHeader>Volume of Waste</TableHeader>
                <TableHeader>Cost</TableHeader>
                <TableHeader>Distance Travel</TableHeader>
                <TableHeader>Arrival Time</TableHeader>
                {/* <TableHeader>Download Slip</TableHeader> */}
              </TableRow>
            </TableHead>
            <TableBody>
              {transportations
                .filter(
                  (item) =>
                    currentUserId == item.landfill?.created_by_user_id &&
                    !item.padding //TODO: landfill.manager_id
                )
                .map((item, idx) => {
                  var capacity = 0;
                  if (item.vehicle.capacity == "fifteen_ton") capacity = 15;
                  else if (item.vehicle.capacity == "seven_ton") capacity = 7;
                  else if (item.vehicle.capacity == "five_ton") capacity = 5;
                  else if (item.vehicle.capacity == "three_ton") capacity = 3;

                  const unloadedCostRate = 0.5;
                  const loadedCostRate = 1.2;

                  var totalCost = unloadedCostRate * item.distance;
                  totalCost +=
                    (item.volume / capacity) *
                    (loadedCostRate - unloadedCostRate) *
                    item.distance;

                  return (
                    <TableRow key={idx}>
                      <TableCell>
                        {item.vehicle.number} - {item.vehicle.type}
                      </TableCell>
                      <TableCell>{item.vehicle.capacity}</TableCell>
                      <TableCell>{item.volume} tons</TableCell>
                      <TableCell>{totalCost.toFixed(2)}</TableCell>
                      <TableCell>{item.distance} km</TableCell>
                      <TableCell>
                        {item.arrival_time &&
                          Utils.Time.formatDateTime(item.arrival_time)}
                      </TableCell>
                      {/* <TableCell>
                        <div className="flex justify-center items-center mr-8">
                          <Download size={16} />
                        </div>
                      </TableCell> */}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  );
}

const ActionCheckBox = ({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <div className="flex items-center px-4 border border-gray-200 rounded dark:border-gray-700">
      <input
        onChange={onChange}
        checked={checked}
        disabled={checked}
        id="bordered-checkbox-2"
        type="checkbox"
        value=""
        name="bordered-checkbox"
        style={{ cursor: checked ? "not-allowed" : "pointer" }}
        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
      />
      <label
        htmlFor="bordered-checkbox-2"
        className="w-full py-4 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
      >
        {checked ? "Recevied" : "Not Recevied"}
      </label>
    </div>
  );
};
