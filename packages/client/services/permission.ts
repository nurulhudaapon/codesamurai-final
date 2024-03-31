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

  /**
   * Get All Permissions
   * @returns {Promise<Array<Entity.permission>>} A promise that resolves to an array of Landfill objects
   */
  getAll(): Promise<Array<Entity.permission>> {
    return this.#client.permission.findMany();
  }

  /**
   * Create permission by name
   * @param {string} name - Permission Name
   * @returns {Promise<Entity.permission>} A promise that resolves to a Permission object
   */
  create(name: string) {
    return this.#client.permission.create({
      data: {
        title: name,
        slug: nameToSlug(name),
      },
    });
  }
}
