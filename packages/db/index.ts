export * from "./schema";

import { EcosyncLogger } from "@ecosync/logger";
import { getPrismaClient } from "./client";

const console = new EcosyncLogger({ name: "Database" }).init();

export class EcosyncDatabase {
  #client: ReturnType<typeof getPrismaClient>;

  constructor() {
    this.#client = getPrismaClient();
  }

  get client () {
    return this.#client;
  }
}
