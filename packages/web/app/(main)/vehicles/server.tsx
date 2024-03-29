"use server";
import { dbClient } from "@/client";
import * as Entity from "@prisma/client";

export const getVehicles = async () => {
  return dbClient.vehicle.getAll();
};

export const addVehicle = async (data: Entity.vehicles) => {
  return await dbClient.vehicle.create(data);
};

export type VehiclesType = Awaited<ReturnType<typeof getVehicles>>;
export type CreateVehicleType = Awaited<ReturnType<typeof addVehicle>>;
