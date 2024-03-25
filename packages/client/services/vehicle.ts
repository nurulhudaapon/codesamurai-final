import { EcosyncLogger } from "@ecosync/logger";
import { Schema, type EcosyncDatabase } from "@ecosync/db";
import type * as Entity from '@prisma/client';

const console = new EcosyncLogger({ name: "Vehicle Service" }).init();

/**
* ## Vehicle entity related CRUD Operations
*/
export class EcosyncVehicleService {
    #client: ReturnType<EcosyncDatabase['client']>;

    constructor({
        client
    }:
        {
            client: ReturnType<EcosyncDatabase['client']>
        }
    ) {
        this.#client = client;
    }

    /**
     * Get All Vehicles
     * @returns {Promise<Array<Entity.vehicles>>} A promise that resolves to an array of Vehicle objects
     */
    getAll(): Promise<Array<Entity.vehicles>> {
        return this.#client.vehicles.findMany();
    }

    /**
     * Get a Vehicle by ID
     * @param {string} id - The ID of the Vehicle
     * @returns {Promise<Entity.vehicles | null>} A promise that resolves to a Vehicle object or null if not found
     */
    getById(id: string): Promise<Entity.vehicles | null> {
        return this.#client.vehicles.findUnique({ where: { id } })
    }

    /**
     * Create a new Vehicle
     * @param {Entity.vehicles} vehicleData - The data to create a new Vehicle
     * @returns {Promise<Entity.vehicles>} A promise that resolves to the created Vehicle object
     */
    create(vehicleData: Entity.vehicles): Promise<Entity.vehicles> {
        // Validate 
        const validVehicleData = Schema.vehiclesSchema.parse(vehicleData);

        // Commit
        return this.#client.vehicles.create({ data: validVehicleData });
    }

    /**
     * Update a Vehicle
     * @param {string} id - The ID of the Vehicle to update
     * @param {Entity.vehicles} vehicleData - The data to update the Vehicle
     * @returns {Promise<Entity.vehicles | null>} A promise that resolves to the updated Vehicle object or null if not found
     */
    update(id: string, vehicleData: object): Promise<Entity.vehicles | null> {
        // Validate 
        const validVehicleData = Schema.vehiclesSchema.parse(vehicleData);

        // Commit
        return this.#client.vehicles.update({ where: { id }, data: validVehicleData });
    }

    /**
     * Delete a Vehicle
     * @param {string} id - The ID of the Vehicle to delete
     * @returns {Promise<Entity.vehicles | null>} A promise that resolves to the deleted Vehicle object or null if not found
     */
    delete(id: string): Promise<Entity.vehicles | null> {
        return this.#client.vehicles.delete({ where: { id } });
    }
}