import { PostgrestClient } from "@supabase/postgrest-js";
// import * as cfetch from 'cross-fetch';
// import * as jwt from 'jsonwebtoken';
import type { PostgrestClientType } from "@ecosync/db/api";
import { Platform } from "react-native";

/** Postgrest client */
export const createDbApiClient = (
  apiUrl: string,
  jwtSecret: string
): PostgrestClientType => {
  return new PostgrestClient(apiUrl, {
    // headers: jwtToken ? { Authorization: `Bearer ${jwtToken}` } : {},
  });
};

const baseUrl = Platform.select({
  android: "http://192.168.240.131",
  web: "http://localhost:8080",
});

export const dbClient = createDbApiClient(baseUrl || "", "ecosync-jwt-secret");
