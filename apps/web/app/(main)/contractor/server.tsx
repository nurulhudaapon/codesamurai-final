"use server";
import { dbClient } from "@/client";
import { Entity } from "@/types/prisma";

export const getAllSts = async () => {
  return dbClient.sts.getAll();
};

export type VehiclesType = Awaited<ReturnType<typeof getAllSts>>;

export async function StsSelector() {
  return (
    <select name="sts_id">
      {(await dbClient.sts.getAll()).map((sts, idx) => (
        <option key={idx} value={sts.id}>
          {sts.ward_number} ({sts.capacity_tonnes} Ton)
        </option>
      ))}
    </select>
  );
}
