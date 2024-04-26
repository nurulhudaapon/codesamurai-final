export * from "./schema";

import { getPrismaClient } from "./client";



export class EcosyncDatabase {
  #client: ReturnType<typeof getPrismaClient>;

  constructor() {
    this.#client = getPrismaClient();
  }

  get client () {
    return this.#client;
  }
}
