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
   * Get All Transportations
   * @returns {Promise<Array<Entity.transportation>>} A promise that resolves to an array of Transportation objects
   */
  getAll(): Promise<Array<Entity.transportation>> {
    return this.#client.transportation.findMany();
  }

  /**
   * Get All Transportations with user details
   */
  getAllWithUserData(where: Entity.Prisma.transportationFindManyArgs['where'] = {}) {
    return this.#client.transportation.findMany({
      where,
      include: {
        creator: true,
        landfill: true,
        sts: true,
        vehicle: true,
      }
    });
  }

  /**
   * Get a Transportation by ID
   * @param {string} id - The ID of the Transportation
   * @returns {Promise<Entity.transportations | null>} A promise that resolves to a Transportation object or null if not found
   */
  getById(id: string): Promise<Entity.transportation | null> {
    return this.#client.transportation.findUnique({ where: { id } });
  }

  /**
   * Create a new Transportation
   * @param {Entity.transportations} transportationData - The data to create a new Transportation
   */
  create(
    data: Entity.Prisma.transportationCreateArgs['data'],
  ) {
    // Validate
    const validTransportationData = Schema.transportationSchema.pick({
      sts_id: true,
      landfill_id: data.landfill_id ? true : undefined,
      created_by_user_id: true,
      arrival_time: true,
      departure_time: true,
      vehicle_id: true,
      volume: true,
    }).parse(data);

    // Commit
    return this.#client.transportation.create({
      data: {
        ...validTransportationData,
        location_type: validTransportationData.sts_id ? "sts" : "landfill",
      },
    });
  }

  /**
   * Update a Transportation
   * @param {string} id - The ID of the Transportation to update
   * @param {Entity.transportation} transportationData - The data to update the Transportation
   * @returns {Promise<Entity.transportation | null>} A promise that resolves to the updated Transportation object or null if not found
   */
  update(
    id: string,
    transportationData: object,
  ): Promise<Entity.transportation | null> {
    // Validate
    const validTransportationData =
      Schema.transportationSchema.parse(transportationData);

    // Commit
    return this.#client.transportation.update({
      where: { id },
      data: validTransportationData,
    });
  }

  /**
   * Delete a Transportation
   * @param {string} id - The ID of the Transportation to delete
   * @returns {Promise<Entity.transportation | null>} A promise that resolves to the deleted Transportation object or null if not found
   */
  delete(id: string): Promise<Entity.transportation | null> {
    return this.#client.transportation.delete({ where: { id } });
  }
}
