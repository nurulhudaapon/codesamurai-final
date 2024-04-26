"use server";

import { dbClient } from "@/client";
import bcrypt from "bcryptjs";

export const createPassword = async (props: {
  email: string;
  password: string;
}) => {
  const password = bcrypt.hashSync(props.password, 10);
  return dbClient.user.updatePassword(props.email, password);
};
