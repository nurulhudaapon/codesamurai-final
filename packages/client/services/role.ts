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

  addPermission = async (role: string, permission: string) => {
    return this.#client.role_permission.createMany({
      data: {
        role_id: role,
        permission_id: permission,
      },
    });
  };

  removePermission = async (role: string, permission: string) => {
    return this.#client.role_permission.deleteMany({
      where: {
        role_id: role,
        permission_id: permission,
      },
    });
  };
}
