export * from "./schema";
export * from './types/table.entity';
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
