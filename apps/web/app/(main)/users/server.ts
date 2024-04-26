"use server";

import { dbClient } from "@/client";

export const getUsers = async () => {
  return dbClient.user.getAll();
};

export const createUser = async (data: CreateNewUserType) => {
  return dbClient.user.create(data);
};

export const getRoles = async () => {
  return dbClient.role.getAll();
};

export const updateUserRole = async (userId: string, roleId: string) => {
  return dbClient.user.updateRole(userId, roleId);
};


export type CreateNewUserType = Parameters<typeof dbClient.user.create>[0];
export type UsersType = Awaited<ReturnType<typeof getUsers>>;
export type RolesType = Awaited<ReturnType<typeof getRoles>>;
