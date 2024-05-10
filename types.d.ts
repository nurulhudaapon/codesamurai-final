// Env Variables

declare namespace NodeJS {
  export interface ProcessEnv {
    NODE_ENV: "development" | "production";
    AUTH_JWT_SECRET: string;
    DATABASE_API_URL: string;
  }
}
