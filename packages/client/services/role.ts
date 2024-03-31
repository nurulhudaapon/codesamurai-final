import { type EcosyncDatabase } from "@ecosync/db";
import { nameToSlug } from "../utils/slug";

/**
 * ## Role entity related CRUD Operations
 */
export class EcosyncRoleService {
  #client: EcosyncDatabase["client"];

  constructor({ client }: { client: EcosyncDatabase["client"] }) {
    this.#client = client;
  }

  /**
   * Get All Roles
   * @returns {Promise<Array<Entity.role>>} A promise that resolves to an array of Role objects
   */
  getAll = async () => {
    return this.#client.role.findMany();
  };

  /**
   * Get All Roles with Permissions
   * @returns {Promise<Array<Entity.role>>} A promise that resolves to an array of Role objects
   */
  getWithPermissions = async () => {
    return this.#client.role.findMany({
      include: {
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
    });
  };

  /**
   * Create role by name and permissions
   * @param {string} name - Role Name
   * @param {string[]} permission - Permission IDs
   * @returns {Promise<Entity.role>} A promise that resolves to a Role object
   */
  createWithPermissions = async (role: {
    name: string;
    permission: string[];
  }) => {
    return this.#client.role.create({
      data: {
        title: role.name,
        slug: nameToSlug(role.name),
        role_permission: {
          createMany: {
            data: role.permission.map((id) => ({
              permission_id: id,
            })),
          },
        },
      },
    });
  };

  /**
   * Add permission to a role
   * @param {string} roll - Role Name
   * @param {string} permission - Permission ID
   * @returns {Promise<Entity.role>} A promise that resolves to a Role object
   */
  addPermission = async (role: string, permission: string) => {
    return this.#client.role_permission.createMany({
      data: {
        role_id: role,
        permission_id: permission,
      },
    });
  };

  /**
   * Remove permission from a role
   * @param {string} roll - Role Name
   * @param {string} permission - Permission ID
   * @returns {Promise<Entity.role>} A promise that resolves to a Role object
   */
  removePermission = async (role: string, permission: string) => {
    return this.#client.role_permission.deleteMany({
      where: {
        role_id: role,
        permission_id: permission,
      },
    });
  };
}
