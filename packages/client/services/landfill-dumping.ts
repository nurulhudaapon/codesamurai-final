import { EcosyncLogger } from "@ecosync/logger";
import { Schema, type EcosyncDatabase } from "@ecosync/db";
import type * as Entity from "@prisma/client";

const console = new EcosyncLogger({ name: "Landfill-Dumping Service" }).init();

/**
 * ## Landfill Dumping entity related CRUD Operations
 */
export class EcosyncLandfillDumpingService {
  #client: ReturnType<EcosyncDatabase["client"]>;

  constructor({ client }: { client: ReturnType<EcosyncDatabase["client"]> }) {
    this.#client = client;
  }

  /**
   * Get All LandfillDumpings
   * @returns {Promise<Array<Entity.landfill_dumpings>>} A promise that resolves to an array of LandfillDumping objects
   */
  getAll(): Promise<Array<Entity.landfill_dumpings>> {
    return this.#client.landfill_dumpings.findMany();
  }

  /**
   * Get a LandfillDumping by ID
   * @param {string} id - The ID of the LandfillDumping
   * @returns {Promise<Entity.landfilldumpings | null>} A promise that resolves to a LandfillDumping object or null if not found
   */
  getById(id: string): Promise<Entity.landfill_dumpings | null> {
    return this.#client.landfill_dumpings.findUnique({ where: { id } });
  }

  /**
   * Create a new LandfillDumping
   * @param {Entity.landfilldumpings} landfilldumpingData - The data to create a new LandfillDumping
   * @returns {Promise<Entity.landfilldumpings>} A promise that resolves to the created LandfillDumping object
   */
  create(
    landfilldumpingData: Entity.landfill_dumpings,
  ): Promise<Entity.landfill_dumpings> {
    // Validate
    const validLandfillDumpingData =
      Schema.landfill_dumpingsSchema.parse(landfilldumpingData);

    // Commit
    return this.#client.landfill_dumpings.create({
      data: validLandfillDumpingData,
    });
  }

  /**
   * Update a LandfillDumping
   * @param {string} id - The ID of the LandfillDumping to update
   * @param {Entity.landfill_dumpings} landfilldumpingData - The data to update the LandfillDumping
   * @returns {Promise<Entity.landfill_dumpings | null>} A promise that resolves to the updated LandfillDumping object or null if not found
   */
  update(
    id: string,
    landfilldumpingData: object,
  ): Promise<Entity.landfill_dumpings | null> {
    // Validate
    const validLandfillDumpingData =
      Schema.landfill_dumpingsSchema.parse(landfilldumpingData);

    // Commit
    return this.#client.landfill_dumpings.update({
      where: { id },
      data: validLandfillDumpingData,
    });
  }

  /**
   * Delete a LandfillDumping
   * @param {string} id - The ID of the LandfillDumping to delete
   * @returns {Promise<Entity.landfill_dumpings | null>} A promise that resolves to the deleted LandfillDumping object or null if not found
   */
  delete(id: string): Promise<Entity.landfill_dumpings | null> {
    return this.#client.landfill_dumpings.delete({ where: { id } });
  }
}
