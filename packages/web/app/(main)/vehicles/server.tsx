"use server";
import { dbClient } from "@/client";

export const getVehicles = async () => {
  return dbClient.vehicle.getAll();
};
export const getStss = async () => {
  return dbClient.sts.getAll();
};

export type VehiclesType = Awaited<ReturnType<typeof getVehicles>>;

export async function StsSelector() {
  return <select
    name="sts_id"
  >
    {
      (await dbClient.sts.getAll()).map(sts => (
        <option value={sts.id}>{sts.ward_number} ({sts.capacity_tonnes} Ton)</option>

      ))
    }
  </select>
}