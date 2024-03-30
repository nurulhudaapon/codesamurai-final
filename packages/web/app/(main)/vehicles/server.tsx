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
export type StssType = Awaited<ReturnType<typeof getStss>>;
