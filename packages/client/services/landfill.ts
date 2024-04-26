import { Schema, type EcosyncDatabase } from "@ecosync/db";
import type * as Entity from "@prisma/client";



/**
 * ## Landfill entity related CRUD Operations
 */
export class EcosyncLandfillService {
  #client: EcosyncDatabase["client"];

  constructor({ client }: { client: EcosyncDatabase["client"] }) {
    this.#client = client;
  }

  /**
   * Get All Landfills
   * @returns {Promise<Array<Entity.landfill>>} A promise that resolves to an array of Landfill objects
   */
  getAll(): Promise<Array<Entity.landfill>> {
    //return manager info as well
    return this.#client.landfill.findMany(
      { 
        orderBy: { created_at: "desc" },
      }
    );
  }

  /**
   * Get a Landfill by ID
   * @param {string} id - The ID of the Landfill
   * @returns {Promise<Entity.landfill | null>} A promise that resolves to a Landfill object or null if not found
   */
  getById(id: string): Promise<Entity.landfill | null> {
    return this.#client.landfill.findUnique({ where: { id } });
  }

    /**
   * Get a Landfill by ID
   * @param {string} id - The ID of the Landfill
   * @returns {Promise<Entity.landfill | null>} A promise that resolves to a Landfill object or null if not found
   */
    getByCreatedUser(id: string): Promise<Entity.landfill | null> {
      return this.#client.landfill.findFirst({ where: { created_by_user_id: id } });
    }
  
  /**
   * Create a new Landfill
   * @param {Entity.landfill} landfillData - The data to create a new Landfill
   * @returns {Promise<Entity.landfill>} A promise that resolves to the created Landfill object
   */
  create(landfillData: Entity.landfill): Promise<Entity.landfill> {
    // Validate
    const validLandfillData = Schema.landfillSchema.parse(landfillData);

    // Commit
    return this.#client.landfill.create({ data: validLandfillData});
  }

  /**
   * Update a Landfill
   * @param {string} id - The ID of the Landfill to update
   * @param {Entity.landfill} landfillData - The data to update the Landfill
   * @returns {Promise<Entity.landfill | null>} A promise that resolves to the updated Landfill object or null if not found
   */
  update(id: string, landfillData: object): Promise<Entity.landfill | null> {
    // Validate
    const validLandfillData = Schema.landfillSchema.parse(landfillData);

    // Commit
    return this.#client.landfill.update({ where: { id }, data: validLandfillData });
  }

  /**
   * Delete a Landfill
   * @param {string} id - The ID of the Landfill to delete
   * @returns {Promise<Entity.landfill | null>} A promise that resolves to the deleted Landfill object or null if not found
   */
  delete(id: string): Promise<Entity.landfill | null> {
    return this.#client.landfill.delete({ where: { id } });
  }
}
