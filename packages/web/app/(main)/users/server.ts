"use server";

import { dbClient } from "@/client";

export const getUsers = async () => {
  return dbClient.user.getAll();
};

export const createUser = async (user: {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
}) => {
  return dbClient.user.create({
    data: user,
  });
};

export const getRoles = async () => {
  return dbClient.role.getAll();
};

export const updateUserRole = async (userId: string, roleId: string) => {
  return dbClient.user.updateRole(userId, roleId);
};

export type UsersType = Awaited<ReturnType<typeof getUsers>>;
export type RolesType = Awaited<ReturnType<typeof getRoles>>;
