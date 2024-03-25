import { EcosyncLogger } from "@ecosync/logger";
import { Schema, type EcosyncDatabase } from "@ecosync/db";
import type * as Entity from '@prisma/client';

const console = new EcosyncLogger({ name: "User Service" }).init();

/**
* ## User entity related CRUD Operations
*/
export class EcosyncUserService {
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
     * Get All Users
     * @returns {Promise<Array<Entity.users>>} A promise that resolves to an array of User objects
     */
    getAll(): Promise<Array<Entity.users>> {
        return this.#client.users.findMany();
    }

    /**
     * Get a User by ID
     * @param {string} id - The ID of the User
     * @returns {Promise<Entity.users | null>} A promise that resolves to a User object or null if not found
     */
    getById(id: string): Promise<Entity.users | null> {
        return this.#client.users.findUnique({ where: { id } })
    }

    /**
     * Create a new User
     * @param {Entity.users} userData - The data to create a new User
     * @returns {Promise<Entity.users>} A promise that resolves to the created User object
     */
    create(userData: Entity.users): Promise<Entity.users> {
        // Validate 
        const validUserData = Schema.usersSchema.parse(userData);

        // Commit
        return this.#client.users.create({ data: validUserData });
    }

    /**
     * Update a User
     * @param {string} id - The ID of the User to update
     * @param {Entity.users} userData - The data to update the User
     * @returns {Promise<Entity.users | null>} A promise that resolves to the updated User object or null if not found
     */
    update(id: string, userData: object): Promise<Entity.users | null> {
        // Validate 
        const validUserData = Schema.usersSchema.parse(userData);

        // Commit
        return this.#client.users.update({ where: { id }, data: validUserData });
    }

    /**
     * Delete a User
     * @param {string} id - The ID of the User to delete
     * @returns {Promise<Entity.users | null>} A promise that resolves to the deleted User object or null if not found
     */
    delete(id: string): Promise<Entity.users | null> {
        return this.#client.users.delete({ where: { id } });
    }
}