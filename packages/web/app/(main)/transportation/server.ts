"use server";

import { dbClient } from "@/client";
import { Entity } from "@/types/prisma";

export const getUsers = async () => {
  return dbClient.user.getAll();
};

export const getAllTransportation = async (target: Entity.transportation_location_type) => {
  return dbClient.transportation.getAllWithUserData({
    location_type: target
  });
};

export const createNewTransport = async (props: CreateNewTransportType) => {
  return await dbClient.transportation.create(props);
}

export const getAllSts = async () => {
  return dbClient.sts.getAll();
}

export const getAllLandfills = async () => {
  return dbClient.landfill.getAll();
}

export const getAllVehicles = async () => {
  return dbClient.vehicle.getAll();
}

export type CreateNewTransportType = Parameters<typeof dbClient.transportation.create>[0];
export type UserType = Awaited<ReturnType<typeof getUsers>>;
export type TransportationsType = Awaited<ReturnType<typeof getAllTransportation>>;
