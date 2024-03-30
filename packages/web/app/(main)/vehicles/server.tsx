"use server";
import { dbClient } from "@/client";
import { Select } from "@/components/select";
import { Entity } from "@/types/prisma";

export const getAllVehicles = async () => {
  return dbClient.vehicle.getAll();
};
export const getStss = async () => {
  return dbClient.sts.getAll();
};

export const createVehicle = async (vehicle: Entity.vehicle) => {
  return dbClient.vehicle.create(vehicle);
};

export type VehiclesType = Awaited<ReturnType<typeof getAllVehicles>>;

export async function StsSelector() {
  return (
    <Select
      name="sts_id"
      className="w-full"
      options={(await dbClient.sts.getAll()).map((sts) => ({
        value: sts.id,
        label: `Ward Number ${sts.ward_number} (${sts.capacity_tonnes} Ton)`,
      }))}
    />
  );
}
