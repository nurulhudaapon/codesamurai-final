"use server";

import { cubeClient, dbClient } from "@/client";
import { Entity } from "@/types/prisma";


export const getAllTransportationStats = async () => {
  return await dbClient.transportation.getAll();
}

export const getAllContractors = async () => {
  // return await dbClient.contractor.getAll();
}

export const updateTransportation = async (id: string, transportationData: Entity.transportation) => {
  return await dbClient.transportation.update(id, transportationData);
}

export type getAllTransportationStatsType = Awaited<ReturnType<typeof getAllTransportationStats>>;

//----------------------  end ----------------------------


export const getUsers = async () => {
  return dbClient.user.getAll();
};

export const getAllTransportation = async (
  target: Entity.transportation_location_type
) => {
  const transportations = await dbClient.transportation.getAllWithUserData({
    location_type: target,
  });

  const transportationStats = await cubeClient.getTransportationTableStats({
    transportationIds: transportations.map((t) => t.id),
  });

  console.log(JSON.stringify({
    transportationStats
  }, null, 2))

  const transportationWithStats = transportations.map(t => ({
    ...(transportationStats?.data?.cube?.find(ts => ts.transportation.id === t.id)?.transportation || {}),
    ...t
  }))


  return transportationWithStats;
};

export const createNewTransport = async (props: CreateNewTransportType) => {
  return await dbClient.transportation.create(props);
};

export const getAllSts = async () => {
  return dbClient.sts.getAll();
};

export const getAllLandfills = async () => {
  return dbClient.landfill.getAll();
};

export const getLandByCreatedUser = async (id: string) => {
  return dbClient.landfill.getByCreatedUser(id);
}

export const getAllVehicles = async () => {
  return dbClient.vehicle.getAll();
};

export type CreateNewTransportType = Parameters<
  typeof dbClient.transportation.create
>[0];
export type UserType = Awaited<ReturnType<typeof getUsers>>;
export type TransportationsType = Awaited<
  ReturnType<typeof getAllTransportation>
>;
