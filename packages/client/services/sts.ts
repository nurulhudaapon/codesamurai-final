import { EcosyncLogger } from "@ecosync/logger";
import { Schema, type EcosyncDatabase } from "@ecosync/db";
import type * as Entity from "@prisma/client";

const console = new EcosyncLogger({ name: "Sts Service" }).init();

/**
 * ## Sts entity related CRUD Operations
 */
export class EcosyncStsService {
  #client: EcosyncDatabase["client"];

  constructor({ client }: { client: EcosyncDatabase["client"] }) {
    this.#client = client;
  }

  /**
   * Get All Stss
   * @returns {Promise<Array<Entity.sts>>} A promise that resolves to an array of Sts objects
   */
  getAll(): Promise<Array<Entity.sts>> {
    return this.#client.sts.findMany();
  }

  /**
   * Get a Sts by ID
   * @param {string} id - The ID of the Sts
   * @returns {Promise<Entity.sts | null>} A promise that resolves to a Sts object or null if not found
   */
  getById(id: string): Promise<Entity.sts | null> {
    return this.#client.sts.findUnique({ where: { id } });
  }

  /**
   * Create a new Sts
   * @param {Entity.sts} stsData - The data to create a new Sts
   * @returns {Promise<Entity.sts>} A promise that resolves to the created Sts object
   */
  create(stsData: Entity.sts): Promise<Entity.sts> {
    // Validate
    const validStsData = Schema.stsSchema.parse(stsData);

    // Commit
    return this.#client.sts.create({ data: validStsData });
  }

  /**
   * Update a Sts
   * @param {string} id - The ID of the Sts to update
   * @param {Entity.sts} stsData - The data to update the Sts
   * @returns {Promise<Entity.sts | null>} A promise that resolves to the updated Sts object or null if not found
   */
  update(id: string, stsData: object): Promise<Entity.sts | null> {
    // Validate
    const validStsData = Schema.stsSchema.parse(stsData);

    // Commit
    return this.#client.sts.update({ where: { id }, data: validStsData });
  }

  /**
   * Delete a Sts
   * @param {string} id - The ID of the Sts to delete
   * @returns {Promise<Entity.sts | null>} A promise that resolves to the deleted Sts object or null if not found
   */
  delete(id: string): Promise<Entity.sts | null> {
    return this.#client.sts.delete({ where: { id } });
  }
}
