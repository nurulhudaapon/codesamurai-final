import { type EcosyncDatabase } from "@ecosync/db";
import { nameToSlug } from "../utils/slug";


/**
 * ## Role entity related CRUD Operations
 */
export class EcosyncRoleService {
  #client: ReturnType<EcosyncDatabase["client"]>;

  constructor({ client }: { client: ReturnType<EcosyncDatabase["client"]> }) {
    this.#client = client;
  }

  getWithPermissions = async () => {
    return this.#client.roles.findMany({
      include: {
        role_permissions: {
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
    permissions: string[];
  }) => {
    return this.#client.roles.create({
      data: {
        title: role.name,
        slug: nameToSlug(role.name),
        role_permissions: {
          createMany: {
            data: role.permissions.map((id) => ({
              permission_id: id,
            })),
          },
        },
      },
    });
  };

  addPermission = async (role: string, permission: string) => {
    return this.#client.role_permissions.createMany({
      data: {
        role_id: role,
        permission_id: permission,
      },
    });
  };

  removePermission = async (role: string, permission: string) => {
    return this.#client.role_permissions.deleteMany({
      where: {
        role_id: role,
        permission_id: permission,
      },
    });
  };
}
