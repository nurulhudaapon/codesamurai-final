import { EcosyncLogger } from "@ecosync/logger";
import type { EcosyncDatabase } from "@ecosync/db";

const console = new EcosyncLogger({ name: "RBAC" }).init();

/**
* ## Role-Based Access Control (RBAC) Endpoints
    - `/rbac/roles` - For defining and managing roles.
    - `/rbac/permissions` - For defining and managing permissions.
    - `/rbac/roles/{roleId}/permissions` - For assigning permissions to a role.
    - `/rbac/users/{userId}/roles` - For assigning roles to a user (System Admin access). By default, after user creation, the role is unassigned. This role should not have any access. The user can only login and update their profile with this role. 
*/
export class EcosyncRbacService {
  #client: ReturnType<EcosyncDatabase["client"]>;

  constructor({ client }: { client: ReturnType<EcosyncDatabase["client"]> }) {
    this.#client = client;
  }

  // Getting RBAC Data
  /**
   * /rbac/roles - For defining and managing roles.
   * @returns Roles
   */
  getRoles() {
    return this.#client.roles.findMany();
  }

  /**
   * /rbac/permissions - For defining and managing permissions.
   * @returns Permissions
   */
  getPermissions() {
    return this.#client.permissions.findMany();
  }

  /**
   * /rbac/roles/{roleId}/permissions - For assigning permissions to a role.
   * @param roleId Role ID
   * @returns Role Permissions
   */
  getRolePermissions(roleId: string) {
    return this.#client.role_permissions.findMany({
      where: {
        role_id: roleId,
      },
    });
  }

  /**
   * /rbac/users/{userId}/roles - For assigning roles to a user (System Admin access).
   * @param userId User ID
   * @returns User Roles
   */

  getUserRoles(userId: string) {
    return this.#client.users.findMany({
      where: {
        id: userId,
      },
      select: {
        role: true,
      },
    });
  }

  // Setting RBAC Data
  /**
   * /rbac/roles - For defining and managing roles.
   * @param data Role Data
   * @returns Role
   */
  createRole(data: { slug: string; title: string }) {
    return this.#client.roles.create({
      data: {
        slug: data.slug,
        title: data.title,
      },
    });
  }

  /**
   * /rbac/permissions - For defining and managing permissions.
   * @param data Permission Data
   * @returns Permission
   */
  createPermission(data: { slug: string; title: string }) {
    return this.#client.permissions.create({
      data: {
        slug: data.slug,
        title: data.title,
      },
    });
  }

  /**
   * /rbac/roles/{roleId}/permissions - For assigning permissions to a role.
   * @param roleId Role ID
   * @param permissionId Permission ID
   * @returns Role Permission
   */
  createRolePermission(roleId: string, permissionId: string) {
    return this.#client.role_permissions.create({
      data: {
        role_id: roleId,
        permission_id: permissionId,
      },
    });
  }

  /**
   * /rbac/users/{userId}/roles - For assigning roles to a user (System Admin access).
   * @param userId User ID
   * @param roleId Role ID
   * @returns User Role
   */
  assignUserRole(userId: string, roleId: string) {
    return this.#client.users.update({
      data: {
        role_id: roleId,
      },
      where: {
        id: userId,
      },
    });
  }

  // Updating RBAC Data

  /**
   * /rbac/roles - For defining and managing roles.
   * @param roleId Role ID
   * @param data Role Data
   * @returns Role
   */
  updateRole(
    roleId: string,
    data: {
      slug: string;
      title: string;
    },
  ) {
    return this.#client.roles.update({
      data: {
        slug: data.slug,
        title: data.title,
      },
      where: {
        id: roleId,
      },
    });
  }

  /**
   * /rbac/permissions - For defining and managing permissions.
   * @param permissionId Permission ID
   * @param data Permission Data
   * @returns Permission
   */

  updatePermission(
    permissionId: string,
    data: {
      slug: string;
      title: string;
    },
  ) {
    return this.#client.permissions.update({
      data: {
        slug: data.slug,
        title: data.title,
      },
      where: {
        id: permissionId,
      },
    });
  }

  // Deleting RBAC Data

  /**
   * /rbac/roles - For defining and managing roles.
   * @param roleId Role ID
   * @returns Role
   */
  deleteRole(roleId: string) {
    return this.#client.roles.delete({
      where: {
        id: roleId,
      },
    });
  }

  /**
   * /rbac/permissions - For defining and managing permissions.
   * @param permissionId Permission ID
   * @returns Permission
   */

  deletePermission(permissionId: string) {
    return this.#client.permissions.delete({
      where: {
        id: permissionId,
      },
    });
  }

  /**
   * /rbac/roles/{roleId}/permissions - For assigning permissions to a role.
   * @param rolePermissionId Role Permission ID
   * @returns Role Permission
   */
  deleteRolePermission(rolePermissionId: string) {
    return this.#client.role_permissions.delete({
      where: {
        id: rolePermissionId,
      },
    });
  }

  /**
   * /rbac/users/{userId}/roles - For assigning roles to a user (System Admin access).
   * @param userId User ID
   * @returns User Role
   */

  unassignUserRole(userId: string) {
    return this.#client.users.update({
      data: {
        role_id: null,
      },
      where: {
        id: userId,
      },
    });
  }
}
