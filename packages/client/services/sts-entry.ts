import { EcosyncLogger } from "@ecosync/logger";
import { Schema, type EcosyncDatabase } from "@ecosync/db";
import type * as Entity from "@prisma/client";

const console = new EcosyncLogger({ name: "StsDumping Service" }).init();

/**
 * ## StsDumping entity related CRUD Operations
 */
export class EcosyncStsDumpingService {
  #client: EcosyncDatabase["client"];

  constructor({ client }: { client: EcosyncDatabase["client"] }) {
    this.#client = client;
  }

  /**
   * Get All StsDumpings
   * @returns {Promise<Array<Entity.stsdumpings>>} A promise that resolves to an array of StsDumping objects
   */
  getAll(): Promise<Array<Entity.sts_entry>> {
    return this.#client.sts_entry.findMany();
  }

  /**
   * Get a StsDumping by ID
   * @param {string} id - The ID of the StsDumping
   * @returns {Promise<Entity.stsdumpings | null>} A promise that resolves to a StsDumping object or null if not found
   */
  getById(id: string): Promise<Entity.sts_entry | null> {
    return this.#client.sts_entry.findUnique({ where: { id } });
  }

  /**
   * Create a new StsDumping
   * @param {Entity.stsdumpings} stsdumpingData - The data to create a new StsDumping
   * @returns {Promise<Entity.stsdumpings>} A promise that resolves to the created StsDumping object
   */
  create(stsdumpingData: Entity.sts_entry): Promise<Entity.sts_entry> {
    // Validate
    const validStsDumpingData = Schema.sts_entrySchema.parse(stsdumpingData);

    // Commit
    return this.#client.sts_entry.create({ data: validStsDumpingData });
  }

  /**
   * Update a StsDumping
   * @param {string} id - The ID of the StsDumping to update
   * @param {Entity.sts_entry} stsdumpingData - The data to update the StsDumping
   * @returns {Promise<Entity.sts_entry | null>} A promise that resolves to the updated StsDumping object or null if not found
   */
  update(
    id: string,
    stsdumpingData: object,
  ): Promise<Entity.sts_entry | null> {
    // Validate
    const validStsDumpingData = Schema.sts_entrySchema.parse(stsdumpingData);

    // Commit
    return this.#client.sts_entry.update({
      where: { id },
      data: validStsDumpingData,
    });
  }

  /**
   * Delete a StsDumping
   * @param {string} id - The ID of the StsDumping to delete
   * @returns {Promise<Entity.sts_entry | null>} A promise that resolves to the deleted StsDumping object or null if not found
   */
  delete(id: string): Promise<Entity.sts_entry | null> {
    return this.#client.sts_entry.delete({ where: { id } });
  }
}
