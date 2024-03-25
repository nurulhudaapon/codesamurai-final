import { EcosyncLogger } from "@ecosync/logger";
import { Schema, type EcosyncDatabase } from "@ecosync/db";
import type * as Entity from '@prisma/client';

const console = new EcosyncLogger({ name: "Sts Service" }).init();

/**
* ## Sts entity related CRUD Operations
*/
export class EcosyncStsService {
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
     * Get All Stss
     * @returns {Promise<Array<Entity.stss>>} A promise that resolves to an array of Sts objects
     */
    getAll(): Promise<Array<Entity.stss>> {
        return this.#client.stss.findMany();
    }

    /**
     * Get a Sts by ID
     * @param {string} id - The ID of the Sts
     * @returns {Promise<Entity.stss | null>} A promise that resolves to a Sts object or null if not found
     */
    getById(id: string): Promise<Entity.stss | null> {
        return this.#client.stss.findUnique({ where: { id } })
    }

    /**
     * Create a new Sts
     * @param {Entity.stss} stsData - The data to create a new Sts
     * @returns {Promise<Entity.stss>} A promise that resolves to the created Sts object
     */
    create(stsData: Entity.stss): Promise<Entity.stss> {
        // Validate 
        const validStsData = Schema.stssSchema.parse(stsData);

        // Commit
        return this.#client.stss.create({ data: validStsData });
    }

    /**
     * Update a Sts
     * @param {string} id - The ID of the Sts to update
     * @param {Entity.stss} stsData - The data to update the Sts
     * @returns {Promise<Entity.stss | null>} A promise that resolves to the updated Sts object or null if not found
     */
    update(id: string, stsData: object): Promise<Entity.stss | null> {
        // Validate 
        const validStsData = Schema.stssSchema.parse(stsData);

        // Commit
        return this.#client.stss.update({ where: { id }, data: validStsData });
    }

    /**
     * Delete a Sts
     * @param {string} id - The ID of the Sts to delete
     * @returns {Promise<Entity.stss | null>} A promise that resolves to the deleted Sts object or null if not found
     */
    delete(id: string): Promise<Entity.stss | null> {
        return this.#client.stss.delete({ where: { id } });
    }
}