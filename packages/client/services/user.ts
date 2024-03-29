import { EcosyncLogger } from "@ecosync/logger";
import { Schema, type EcosyncDatabase } from "@ecosync/db";
import type * as Entity from "@prisma/client";

const console = new EcosyncLogger({ name: "User Service" }).init();

/**
 * ## User entity related CRUD Operations
 */
export class EcosyncUserService {
  #client: EcosyncDatabase["client"];

  constructor({ client }: { client: EcosyncDatabase["client"] }) {
    this.#client = client;
  }

  /**
   * Get All User
   * @returns {Promise<Array<Entity.user>>} A promise that resolves to an array of User objects
   */
  getAll(): Promise<Array<Entity.user>> {
    return this.#client.user.findMany();
  }

  /**
   * Get a User by ID
   * @param {string} id - The ID of the User
   * @returns {Promise<Entity.user | null>} A promise that resolves to a User object or null if not found
   */
  getById(id: string): Promise<Entity.user | null> {
    return this.#client.user.findUnique({ where: { id } });
  }

  /**
   * Get a User by Email
   * @param {string} email - The email of the User
   */
  getUserByEmailWithPermissions(email: string) {
    const res = this.#client.user.findFirst({
      where: {
        email,
      },
      select: {
        email: true,
        id: true,
        first_name: true,
        last_name: true,
        phone: true,
        state: true,
        password: true,
        role: {
          select: {
            role_permission: {
              select: {
                permission: {
                  select: {
                    slug: true,
                  },
                },
              },
            },
          },
        },
      },
    });
    return res;
  }

  /**
   * Create a new User
   * @param {Entity.user} userData - The data to create a new User
   * @returns {Promise<Entity.user>} A promise that resolves to the created User object
   */
  create(userData: Entity.user): Promise<Entity.user> {
    // Validate
    const validUserData = Schema.userSchema.parse(userData);

    // Commit
    return this.#client.user.create({ data: validUserData });
  }

  /**
   * Update a User
   * @param {string} id - The ID of the User to update
   * @param {Entity.user} userData - The data to update the User
   * @returns {Promise<Entity.user | null>} A promise that resolves to the updated User object or null if not found
   */
  update(id: string, userData: object): Promise<Entity.user | null> {
    // Validate
    const validUserData = Schema.userSchema.parse(userData);

    // Commit
    return this.#client.user.update({ where: { id }, data: validUserData });
  }

  /**
   * Delete a User
   * @param {string} id - The ID of the User to delete
   * @returns {Promise<Entity.user | null>} A promise that resolves to the deleted User object or null if not found
   */
  delete(id: string): Promise<Entity.user | null> {
    return this.#client.user.delete({ where: { id } });
  }
}
