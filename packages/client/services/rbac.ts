import type { EcosyncDatabase } from "@ecosync/db";



/**
* ## Role-Based Access Control (RBAC) Endpoints
    - `/rbac/roles` - For defining and managing roles.
    - `/rbac/permission` - For defining and managing permission.
    - `/rbac/roles/{roleId}/permission` - For assigning permission to a role.
    - `/rbac/users/{userId}/roles` - For assigning roles to a user (System Admin access). By default, after user creation, the role is unassigned. This role should not have any access. The user can only login and update their profile with this role. 
*/
export class EcosyncRbacService {
  #client: EcosyncDatabase["client"];

  constructor({ client }: { client: EcosyncDatabase["client"] }) {
    this.#client = client;
  }

  // Getting RBAC Data
  /**
   * /rbac/roles - For defining and managing roles.
   * @returns Roles
   */
  getRoles() {
    return this.#client.role.findMany();
  }

  /**
   * /rbac/permission - For defining and managing permission.
   * @returns Permissions
   */
  getPermissions() {
    return this.#client.permission.findMany();
  }

  /**
   * /rbac/roles/{roleId}/permission - For assigning permission to a role.
   * @param roleId Role ID
   * @returns Role Permissions
   */
  getRolePermissions(roleId: string) {
    return this.#client.role_permission.findMany({
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
    return this.#client.user.findMany({
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
    return this.#client.role.create({
      data: {
        slug: data.slug,
        title: data.title,
      },
    });
  }

  /**
   * /rbac/permission - For defining and managing permission.
   * @param data Permission Data
   * @returns Permission
   */
  createPermission(data: { slug: string; title: string }) {
    return this.#client.permission.create({
      data: {
        slug: data.slug,
        title: data.title,
      },
    });
  }

  /**
   * /rbac/roles/{roleId}/permission - For assigning permission to a role.
   * @param roleId Role ID
   * @param permissionId Permission ID
   * @returns Role Permission
   */
  createRolePermission(roleId: string, permissionId: string) {
    return this.#client.role_permission.create({
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
    return this.#client.user.update({
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
    return this.#client.role.update({
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
   * /rbac/permission - For defining and managing permission.
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
    return this.#client.permission.update({
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
    return this.#client.role.delete({
      where: {
        id: roleId,
      },
    });
  }

  /**
   * /rbac/permission - For defining and managing permission.
   * @param permissionId Permission ID
   * @returns Permission
   */
  deletePermission(permissionId: string) {
    return this.#client.permission.delete({
      where: {
        id: permissionId,
      },
    });
  }

  /**
   * /rbac/roles/{roleId}/permission - For assigning permission to a role.
   * @param rolePermissionId Role Permission ID
   * @returns Role Permission
   */
  deleteRolePermission(rolePermissionId: string) {
    return this.#client.role_permission.delete({
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
    return this.#client.user.update({
      data: {
        role_id: null,
      },
      where: {
        id: userId,
      },
    });
  }
}
