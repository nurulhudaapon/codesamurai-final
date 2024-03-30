import { EcosyncLogger } from "@ecosync/logger";
import { Schema, type EcosyncDatabase } from "@ecosync/db";
import type * as Entity from "@prisma/client";

const console = new EcosyncLogger({ name: "Landfill-Dumping Service" }).init();

/**
 * ## Landfill Dumping entity related CRUD Operations
 */
export class EcosyncTransportationService {
  #client: EcosyncDatabase["client"];

  constructor({ client }: { client: EcosyncDatabase["client"] }) {
    this.#client = client;
  }

  /**
   * Get All LandfillDumpings
   * @returns {Promise<Array<Entity.transportation>>} A promise that resolves to an array of LandfillDumping objects
   */
  getAll(): Promise<Array<Entity.transportation>> {
    return this.#client.transportation.findMany();
  }

  /**
   * Get a LandfillDumping by ID
   * @param {string} id - The ID of the LandfillDumping
   * @returns {Promise<Entity.landfilldumpings | null>} A promise that resolves to a LandfillDumping object or null if not found
   */
  getById(id: string): Promise<Entity.transportation | null> {
    return this.#client.transportation.findUnique({ where: { id } });
  }

  /**
   * Create a new LandfillDumping
   * @param {Entity.landfilldumpings} landfilldumpingData - The data to create a new LandfillDumping
   * @returns {Promise<Entity.landfilldumpings>} A promise that resolves to the created LandfillDumping object
   */
  create(
    landfilldumpingData: Entity.transportation,
  ): Promise<Entity.transportation> {
    // Validate
    const validLandfillDumpingData =
      Schema.landfill_entrySchema.parse(landfilldumpingData);

    // Commit
    return this.#client.transportation.create({
      data: validLandfillDumpingData,
    });
  }

  /**
   * Update a LandfillDumping
   * @param {string} id - The ID of the LandfillDumping to update
   * @param {Entity.transportation} landfilldumpingData - The data to update the LandfillDumping
   * @returns {Promise<Entity.transportation | null>} A promise that resolves to the updated LandfillDumping object or null if not found
   */
  update(
    id: string,
    landfilldumpingData: object,
  ): Promise<Entity.transportation | null> {
    // Validate
    const validLandfillDumpingData =
      Schema.transportationSchema.parse(landfilldumpingData);

    // Commit
    return this.#client.transportation.update({
      where: { id },
      data: validLandfillDumpingData,
    });
  }

  /**
   * Delete a LandfillDumping
   * @param {string} id - The ID of the LandfillDumping to delete
   * @returns {Promise<Entity.transportation | null>} A promise that resolves to the deleted LandfillDumping object or null if not found
   */
  delete(id: string): Promise<Entity.transportation | null> {
    return this.#client.transportation.delete({ where: { id } });
  }
}
