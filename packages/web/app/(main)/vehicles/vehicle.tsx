"use client";
import Button from "@/components/button";
import { Icon } from "@/components/icon";
import { Badge } from "@/components/chip";
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
import VehicleModel from "./add-modal";
import {} from "./server";
import { getServerAuthSession } from "@/utils/auth";

const tableHeaders = [
  "Vehicle Number",
  "Vehicle Type",
  "Capacity",
  "Fuel Cost - Fully Loaded",
  "Fuel Cost - Unloaded",
];
const data = [
  {
    id: 1,
    number: "1234",
    type: "Open Truck",
    capacity: "3 T",
    fuelCostFullyLoaded: 10,
    fuelCostUnloaded: 50,
  },
  {
    id: 2,
    number: "1235",
    type: "Dump Truck",
    capacity: "5 T",
    fuelCostFullyLoaded: 15,
    fuelCostUnloaded: 10,
  },
  {
    id: 3,
    number: "1236",
    type: "Compactor",
    capacity: "7 T",
    fuelCostFullyLoaded: 20,
    fuelCostUnloaded: 15,
  },
  {
    id: 4,
    number: "1237",
    type: "Container Carrier",
    capacity: "3 T",
    fuelCostFullyLoaded: 10,
    fuelCostUnloaded: 5,
  },
  {
    id: 5,
    number: "1238",
    type: "Open Truck",
    capacity: "5 T",
    fuelCostFullyLoaded: 15,
    fuelCostUnloaded: 10,
  },
  {
    id: 6,
    number: "1239",
    type: "Dump Truck",
    capacity: "7 T",
    fuelCostFullyLoaded: 20,
    fuelCostUnloaded: 15,
  },
  {
    id: 7,
    number: "1240",
    type: "Compactor",
    capacity: "3 T",
    fuelCostFullyLoaded: 10,
    fuelCostUnloaded: 5,
  },
  {
    id: 8,
    number: "1241",
    type: "Container Carrier",
    capacity: "5 T",
    fuelCostFullyLoaded: 15,
    fuelCostUnloaded: 10,
  },
  {
    id: 9,
    number: "1242",
    type: "Open Truck",
    capacity: "7 T",
    fuelCostFullyLoaded: 20,
    fuelCostUnloaded: 15,
  },
  {
    id: 10,
    number: "1243",
    type: "Dump Truck",
    capacity: "3 T",
    fuelCostFullyLoaded: 10,
    fuelCostUnloaded: 5,
  },
];

const VehiclesPage = ({ currentUserId }: { currentUserId: string }) => {
  const [isVehicleModel, setIsVehicleModal] = useState<boolean>(false);
  // const [Vehicles, setVehicles] = useState<Vehicle[]>([]);

  // useEffect(() => {
  //   fetchRoles();
  //   fetchPermissions();
  // }, []);

  // const fetchRoles = () => {
  //   getRoles().then((data) => {
  //     setAddVehicleModal(data);
  //   });
  // };

  return (
    <div>
      <div className="flex justify-between items-center mb-5">
        <p className="text-lg font-bold">Manage Vehicles</p>
        <Button onClick={() => setIsVehicleModal(true)} className="pl-3">
          <Icon name="Plus" />
          Add New Vehicles
        </Button>
      </div>
      <Table>
        <TableHead>
          <TableRow>
            {tableHeaders.map((header, idx) => (
              <TableHeader key={idx}>{header}</TableHeader>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((vehicle, idx) => (
            <TableRow key={idx}>
              <TableCell>{vehicle.number}</TableCell>
              <TableCell>{vehicle.type}</TableCell>
              <TableCell>{vehicle.capacity}</TableCell>
              <TableCell>{vehicle.fuelCostFullyLoaded} Per KM</TableCell>
              <TableCell>{vehicle.fuelCostUnloaded} Per KM</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {isVehicleModel && (
        <VehicleModel
          // permissions={permissions}
          onClose={() => setIsVehicleModal(false)}
          // triggerUpdate={fetchRoles}
          userId={currentUserId}
        />
      )}
    </div>
  );
};

export default VehiclesPage;
