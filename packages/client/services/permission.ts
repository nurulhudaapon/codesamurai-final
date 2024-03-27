import { EcosyncLogger } from "@ecosync/logger";
import { Schema, type EcosyncDatabase } from "@ecosync/db";
import type * as Entity from "@prisma/client";
import { nameToSlug } from "../utils/slug";

const console = new EcosyncLogger({ name: "Permission Service" }).init();

/**
 * ## Permission entity related CRUD Operations
 */
export class EcosyncPermissionService {
  #client: ReturnType<EcosyncDatabase["client"]>;

  constructor({ client }: { client: ReturnType<EcosyncDatabase["client"]> }) {
    this.#client = client;
  }

  getAll(): Promise<Array<Entity.permissions>> {
    return this.#client.permissions.findMany();
  }

  create(name: string) {
    return this.#client.permissions.create({
      data: {
        title: name,
        slug: nameToSlug(name),
      },
    });
  }
}
