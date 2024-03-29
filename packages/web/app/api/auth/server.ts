import { dbClient } from "@/client";
import type { SessionData } from "@/types/auth";
import * as bcrypt from "bcryptjs";

export const login = async (user: { email: string; password: string }) => {
  const existingUser = await dbClient.user.getUserByEmailWithPermissions(
    user.email
  );

  if (!existingUser?.id) {
    throw new Error("User not found!");
  }

  const password = existingUser?.password;

  if (!password) {
    throw new Error("Invalid user!");
  }

  const isPasswordValid = await bcrypt.compare(user.password, password);

  if (!isPasswordValid) {
    throw new Error("Invalid password!");
  }

  const userData: SessionData = {
    id: existingUser.id,
    email: existingUser.email,
    first_name: existingUser.first_name,
    last_name: existingUser.last_name,
    phone: existingUser.phone,
    state: existingUser.state,
    permissions:
      existingUser.role?.role_permissions.map((p) => p.permission.slug) || []
  };

  return userData;
};

export const getPermissions = async (user: { email: string }) => {
  const existingUser = await dbClient.user.getUserByEmailWithPermissions(
    user.email
  );

  if (!existingUser?.id) {
    throw new Error("User not found!");
  }

  return existingUser.role?.role_permissions.map((p) => p.permission.slug) || [];
}