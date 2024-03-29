import * as Entity from "@prisma/client";
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
    slug: "manage_vehicles",
    title: "Manage Vehicles",
    created_at: now,
    updated_at: now,
  },
  {
    id: uuid(),
    slug: "manage_sts",
    title: "Manage STS",
    created_at: now,
    updated_at: now,
  },
  {
    id: uuid(),
    slug: "view_monitor",
    title: "View Monitor",
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

const vehicles: Entity.vehicles[] = [
  {
    id: uuid(),
    number: "1234",
    type: Entity.vehicles_type.open_truck,
    capacity: Entity.vehicles_capacity.three_ton,
    fuel_cost_full_load: 10,
    fuel_cost_empty_load: 50,
    created_by_user_id: users[0].id,
    created_at: now,
    updated_at: now,
  },
  {
    id: uuid(),
    number: "1235",
    type: Entity.vehicles_type.dump_truck,
    capacity: Entity.vehicles_capacity.five_ton,
    fuel_cost_full_load: 15,
    fuel_cost_empty_load: 10,
    created_by_user_id: users[0].id,
    created_at: now,
    updated_at: now,
  },
  {
    id: uuid(),
    number: "1236",
    type: Entity.vehicles_type.compactor,
    capacity: Entity.vehicles_capacity.seven_ton,
    fuel_cost_full_load: 20,
    fuel_cost_empty_load: 15,
    created_by_user_id: users[0].id,
    created_at: now,
    updated_at: now,
  }
]

export const InitData = {
  permissions,
  roles,
  role_permissions,
  users,
  vehicles,
};
