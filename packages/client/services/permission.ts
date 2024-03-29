import { type EcosyncDatabase } from "@ecosync/db";
import type * as Entity from "@prisma/client";
import { nameToSlug } from "../utils/slug";


/**
 * ## Permission entity related CRUD Operations
 */
export class EcosyncPermissionService {
  #client: EcosyncDatabase["client"];

  constructor({ client }: { client: EcosyncDatabase["client"] }) {
    this.#client = client;
  }

  getAll(): Promise<Array<Entity.permission>> {
    return this.#client.permission.findMany();
  }

  create(name: string) {
    return this.#client.permission.create({
      data: {
        title: name,
        slug: nameToSlug(name),
      },
    });
  }
}
