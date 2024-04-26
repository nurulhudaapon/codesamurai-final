// types/next-auth.d.ts

import { LoginResponse } from "../app/api/auth/server";
import { AuthUserType, JwtPayloadType } from "./auth";

declare module "next-auth" {
  type Session = SessionData
  type User = SessionData;
}

declare module "next-auth/jwt" {
  type JWT = SessionData;
}
