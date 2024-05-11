"use server";
import { dbApiClient, dbClient } from "@/client";
import { Entity } from "@/types/prisma";
import { DatabaseEntity } from "@ecosync/db";

export const getAll = async () => {
  return dbClient.landfill.getAll();
};

export const getById = async (id: string) => {
  return dbClient.landfill.getById(id);
};

export const create = async (data: Entity.landfill) => {
  return dbClient.landfill.create(data);
};

export const updateIssue = async (id: string, issue: Partial<DatabaseEntity['issue']>) => {
  return dbApiClient.from('issue').update(issue).eq('id', id).single();
};


export type VehiclesType = Awaited<ReturnType<typeof getAll>>;

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
