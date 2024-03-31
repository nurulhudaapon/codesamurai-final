"use server";
import { dbClient } from "@/client";
import { Entity } from "@/types/prisma";

export const getAllSts = async () => {
  return dbClient.sts.getAll();
};

export const getStsById = async (id: string) => {
  return dbClient.sts.getById(id);
};

export const createSts = async (stsData: Entity.sts) => {
  return dbClient.sts.create(stsData);
};

export const getUserByEmail = async (email: string) => {
  return dbClient.user.getByEmail(email);
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
