import type * as Entity from "@prisma/client";
import bcrypt from "bcryptjs";
import { v4 as uuid } from "uuid";

const now = new Date();

const password = bcrypt.hashSync("password", 10);

//======== Initial Data ========

const roles: Entity.roles[] = [
  {
    id: uuid(),
    slug: "admin",
    title: "Admin",
    created_at: now,
    updated_at: now,
  },
  {
    id: uuid(),
    slug: "sts_manager",
    title: "STS Manager",
    created_at: now,
    updated_at: now,
  },
  {
    id: uuid(),
    slug: "landfill_manager",
    title: "Landfill Manager",
    created_at: now,
    updated_at: now,
  },
];

const permissions: Entity.permissions[] = [
  {
    id: uuid(),
    slug: "manage_users",
    title: "Manage Users",
    created_at: now,
    updated_at: now,
  },
  {
    id: uuid(),
    slug: "manage_roles",
    title: "Manage Roles",
    created_at: now,
    updated_at: now,
  },
  {
    id: uuid(),
    slug: "manage_permissions",
    title: "Manage Permissions",
    created_at: now,
    updated_at: now,
  },
];

const role_permissions: Entity.role_permissions[] = permissions.map(
  (permission) => {
    return {
      id: uuid(),
      role_id: roles[0].id,
      permission_id: permission.id,
      created_at: now,
      updated_at: now,
    };
  }
);

const users: Entity.users[] = [
  {
    id: uuid(),
    email: "admin@ecosync.gov.bd",
    phone: "+8801000000000",
    first_name: "Default",
    last_name: "Admin",
    state: "active",
    password: password,
    created_at: now,
    updated_at: now,
    last_login_at: null,
    role_id: roles[0].id,
  },
  {
    id: uuid(),
    email: "sts.manager@ecosync.gov.bd",
    phone: "+8801000000000",
    first_name: "STS",
    last_name: "Manager",
    state: "active",
    password: password,
    created_at: now,
    updated_at: now,
    last_login_at: null,
    role_id: roles[1].id,
  },
  {
    id: uuid(),
    email: "landfill.manager@ecosync.gov.bd",
    phone: "+8801000000000",
    first_name: "Landfill",
    last_name: "Manager",
    state: "active",
    password: password,
    created_at: now,
    updated_at: now,
    last_login_at: null,
    role_id: roles[2].id,
  },
];

export const InitData = {
  permissions,
  roles,
  role_permissions,
  users,
};
