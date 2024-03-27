"use server";

import { dbClient } from "@/client";

export const getRoles = async () => {
  return dbClient.role.getRolesWithPermissions();
};

export const getPermissions = async () => {
  return dbClient.permission.getAll();
};

export const createNewRole = async (role: {
  name: string;
  permissions: string[];
}) => {
  return await dbClient.role.createWithPermissions(role);
};

export const addPermission = async (role: string, permission: string) => {
  return await dbClient.role.addPermission(role, permission);
};

export const removePermission = async (role: string, permission: string) => {
  return await dbClient.role.removePermission(role, permission);
};

export const createPermission = async (name: string) => {
  return await dbClient.permission.create(name);
}

export type RolesWithPermissionType = Awaited<ReturnType<typeof getRoles>>;
export type PermissionsType = Awaited<ReturnType<typeof getPermissions>>;
export type CreateRoleType = Awaited<ReturnType<typeof createNewRole>>;
