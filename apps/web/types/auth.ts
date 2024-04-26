import { Entity } from "./prisma";

export type SessionData = Pick<
  Entity.user,
  "id" | "email" | "first_name" | "last_name" | "phone" | "state"
> & {
  permission: string[];
  expired_at?: Date;
};
