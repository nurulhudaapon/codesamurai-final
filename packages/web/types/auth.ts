import { Entity } from "./prisma";

export type SessionData = Pick<
  Entity.users,
  "id" | "email" | "first_name" | "last_name" | "phone" | "state"
> & {
  permissions: string[];
  expired_at?: Date;
};
