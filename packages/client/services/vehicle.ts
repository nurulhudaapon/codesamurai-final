import { EcosyncLogger } from "@ecosync/logger";
import { Schema, type EcosyncDatabase } from "@ecosync/db";
import type * as Entity from "@prisma/client";

const console = new EcosyncLogger({ name: "Vehicle Service" }).init();

/**
 * ## Vehicle entity related CRUD Operations
 */
export class EcosyncVehicleService {
  #client: EcosyncDatabase["client"];

  constructor({ client }: { client: EcosyncDatabase["client"] }) {
    this.#client = client;
  }

  /**
   * Get All Vehicle
   * @returns {Promise<Array<Entity.vehicle>>} A promise that resolves to an array of Vehicle objects
   */
  getAll(): Promise<Array<Entity.vehicle>> {
    return this.#client.vehicle.findMany();
  }

  /**
   * Get a Vehicle by ID
   * @param {string} id - The ID of the Vehicle
   * @returns {Promise<Entity.vehicle | null>} A promise that resolves to a Vehicle object or null if not found
   */
  getById(id: string): Promise<Entity.vehicle | null> {
    return this.#client.vehicle.findUnique({ where: { id } });
  }

  /**
   * Create a new Vehicle
   * @param {Entity.vehicle} vehicleData - The data to create a new Vehicle
   * @returns {Promise<Entity.vehicle>} A promise that resolves to the created Vehicle object
   */
  create(vehicleData: Entity.vehicle): Promise<Entity.vehicle> {
    console.log({vehicleData})
    // Validate
    const validVehicleData = Schema.vehicleSchema.parse(vehicleData);

    // Commit
    return this.#client.vehicle.create({ data: validVehicleData });
  }

  /**
   * Update a Vehicle
   * @param {string} id - The ID of the Vehicle to update
   * @param {Entity.vehicle} vehicleData - The data to update the Vehicle
   * @returns {Promise<Entity.vehicle | null>} A promise that resolves to the updated Vehicle object or null if not found
   */
  update(id: string, vehicleData: object): Promise<Entity.vehicle | null> {
    // Validate
    const validVehicleData = Schema.vehicleSchema.parse(vehicleData);

    // Commit
    return this.#client.vehicle.update({
      where: { id },
      data: validVehicleData,
    });
  }

  /**
   * Delete a Vehicle
   * @param {string} id - The ID of the Vehicle to delete
   * @returns {Promise<Entity.vehicle | null>} A promise that resolves to the deleted Vehicle object or null if not found
   */
  delete(id: string): Promise<Entity.vehicle | null> {
    return this.#client.vehicle.delete({ where: { id } });
  }
}
