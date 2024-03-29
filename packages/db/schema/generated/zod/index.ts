import { z } from 'zod';
import type { Prisma } from '@prisma/client';

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////


/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const TransactionIsolationLevelSchema = z.enum(['ReadUncommitted','ReadCommitted','RepeatableRead','Serializable']);

export const UsersScalarFieldEnumSchema = z.enum(['id','created_at','updated_at','first_name','last_name','email','phone','last_login_at','password','role_id','state']);

export const RolesScalarFieldEnumSchema = z.enum(['id','created_at','updated_at','slug','title']);

export const PermissionsScalarFieldEnumSchema = z.enum(['id','created_at','updated_at','slug','title']);

export const Role_permissionsScalarFieldEnumSchema = z.enum(['id','created_at','updated_at','role_id','permission_id']);

export const VehiclesScalarFieldEnumSchema = z.enum(['id','created_at','updated_at','created_by_user_id','number','type','capacity','fuel_cost_full_load','fuel_cost_empty_load']);

export const StssScalarFieldEnumSchema = z.enum(['id','created_at','updated_at','created_by_user_id','ward_number','capacity_tonnes','gps_coordinates','manager_id']);

export const Sts_dumpingsScalarFieldEnumSchema = z.enum(['id','created_at','updated_at','created_by_user_id','sts_id','vehicle_id','volume','arrival_time','departure_time']);

export const Landfill_dumpingsScalarFieldEnumSchema = z.enum(['id','created_at','updated_at','created_by_user_id','volume','arrival_time','departure_time']);

export const SortOrderSchema = z.enum(['asc','desc']);

export const QueryModeSchema = z.enum(['default','insensitive']);

export const NullsOrderSchema = z.enum(['first','last']);

export const users_stateSchema = z.enum(['active','inactive']);

export type users_stateType = `${z.infer<typeof users_stateSchema>}`

export const vehicles_typeSchema = z.enum(['open_truck','dump_truck','compactor','container_carrier']);

export type vehicles_typeType = `${z.infer<typeof vehicles_typeSchema>}`

export const vehicles_capacitySchema = z.enum(['three_ton','five_ton','seven_ton']);

export type vehicles_capacityType = `${z.infer<typeof vehicles_capacitySchema>}`

/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

/////////////////////////////////////////
// USERS SCHEMA
/////////////////////////////////////////

/**
 * @namespace Accounts
 * Represents users in the system.
 * This model stores information about users.
 */
export const usersSchema = z.object({
  /**
   * State of the user (default active).
   */
  state: users_stateSchema,
  /**
   * Unique identifier for the user.
   */
  id: z.string().uuid(),
  /**
   * Timestamp indicating when the user was created.
   */
  created_at: z.coerce.date(),
  /**
   * Timestamp indicating when the user was last updated.
   */
  updated_at: z.coerce.date(),
  /**
   * First name of the user (optional).
   */
  first_name: z.string().nullable(),
  /**
   * Last name of the user (optional).
   */
  last_name: z.string().nullable(),
  /**
   * Email address of the user.
   */
  email: z.string(),
  /**
   * Phone number of the user.
   */
  phone: z.string(),
  /**
   * Timestamp indicating when the user last logged in (optional).
   */
  last_login_at: z.coerce.date().nullable(),
  /**
   * Password associated with the user (optional).
   */
  password: z.string().nullable(),
  /**
   * Role of the user (default sts).
   */
  role_id: z.string().nullable(),
})

export type users = z.infer<typeof usersSchema>

/////////////////////////////////////////
// ROLES SCHEMA
/////////////////////////////////////////

/**
 * @namespace Accounts
 * List of roles that a user can have.
 */
export const rolesSchema = z.object({
  /**
   * Unique identifier for the role.
   */
  id: z.string().uuid(),
  /**
   * Timestamp indicating when the role was created.
   */
  created_at: z.coerce.date(),
  /**
   * Timestamp indicating when the role was last updated.
   */
  updated_at: z.coerce.date(),
  /**
   * Name/slug of the role.
   */
  slug: z.string(),
  /**
   * Title of the role.
   */
  title: z.string(),
})

export type roles = z.infer<typeof rolesSchema>

/////////////////////////////////////////
// PERMISSIONS SCHEMA
/////////////////////////////////////////

/**
 * @namespace Accounts
 * Represents the permissions that a role can have.
 */
export const permissionsSchema = z.object({
  /**
   * Unique identifier for the permission.
   */
  id: z.string().uuid(),
  /**
   * Timestamp indicating when the permission was created.
   */
  created_at: z.coerce.date(),
  /**
   * Timestamp indicating when the permission was last updated.
   */
  updated_at: z.coerce.date(),
  /**
   * Name/slug of the permission.
   */
  slug: z.string(),
  /**
   * Title of the permission.
   */
  title: z.string(),
})

export type permissions = z.infer<typeof permissionsSchema>

/////////////////////////////////////////
// ROLE PERMISSIONS SCHEMA
/////////////////////////////////////////

/**
 * @namespace Accounts
 * Represents the relationship between roles and permissions.
 */
export const role_permissionsSchema = z.object({
  /**
   * Unique identifier for the role permission.
   */
  id: z.string().uuid(),
  /**
   * Timestamp indicating when the role permission was created.
   */
  created_at: z.coerce.date(),
  /**
   * Timestamp indicating when the role permission was last updated.
   */
  updated_at: z.coerce.date(),
  /**
   * Role ID associated with the role permission.
   */
  role_id: z.string(),
  /**
   * Permission ID associated with the role permission.
   */
  permission_id: z.string(),
})

export type role_permissions = z.infer<typeof role_permissionsSchema>

/////////////////////////////////////////
// VEHICLES SCHEMA
/////////////////////////////////////////

export const vehiclesSchema = z.object({
  /**
   * Type of the vehicle.
   */
  type: vehicles_typeSchema,
  /**
   * Capacity of the vehicle.
   */
  capacity: vehicles_capacitySchema,
  /**
   * Unique identifier for the vehicle.
   */
  id: z.string().uuid(),
  /**
   * Timestamp indicating when the vehicle was created.
   */
  created_at: z.coerce.date(),
  /**
   * Timestamp indicating when the vehicle was last updated.
   */
  updated_at: z.coerce.date(),
  created_by_user_id: z.string(),
  /**
   * Vehicle number.
   */
  number: z.string(),
  /**
   * Fuel cost per Kilometer when full load.
   */
  fuel_cost_full_load: z.number().nullable(),
  /**
   * Fuel cost per Kilometer when empty load.
   */
  fuel_cost_empty_load: z.number().nullable(),
})

export type vehicles = z.infer<typeof vehiclesSchema>

/////////////////////////////////////////
// STSS SCHEMA
/////////////////////////////////////////

export const stssSchema = z.object({
  /**
   * Unique identifier for the STS.
   */
  id: z.string().uuid(),
  /**
   * Timestamp indicating when the STS was created.
   */
  created_at: z.coerce.date(),
  /**
   * Timestamp indicating when the STS was last updated.
   */
  updated_at: z.coerce.date(),
  created_by_user_id: z.string(),
  /**
   * Ward number of the STS.
   */
  ward_number: z.string(),
  /**
   * Capacity of the STS.
   */
  capacity_tonnes: z.number(),
  /**
   * GPS coordinates of the STS.
   */
  gps_coordinates: z.string(),
  /**
   * STS manager ID associated with the STS.
   */
  manager_id: z.string(),
})

export type stss = z.infer<typeof stssSchema>

/////////////////////////////////////////
// STS DUMPINGS SCHEMA
/////////////////////////////////////////

export const sts_dumpingsSchema = z.object({
  /**
   * Unique identifier for the STS entry.
   */
  id: z.string().uuid(),
  /**
   * Timestamp indicating when the STS entry was created.
   */
  created_at: z.coerce.date(),
  /**
   * Timestamp indicating when the STS entry was last updated.
   */
  updated_at: z.coerce.date(),
  /**
   * User ID associated with the landfill entry.
   */
  created_by_user_id: z.string(),
  /**
   * STS ID associated with the STS entry.
   */
  sts_id: z.string(),
  /**
   * Vehicle ID associated with the STS entry.
   */
  vehicle_id: z.string(),
  /**
   * Volume of waste.
   */
  volume: z.number(),
  /**
   * Time of arrival.
   */
  arrival_time: z.coerce.date(),
  /**
   * Time of departure.
   */
  departure_time: z.coerce.date(),
})

export type sts_dumpings = z.infer<typeof sts_dumpingsSchema>

/////////////////////////////////////////
// LANDFILL DUMPINGS SCHEMA
/////////////////////////////////////////

export const landfill_dumpingsSchema = z.object({
  /**
   * Unique identifier for the landfill entry.
   */
  id: z.string().uuid(),
  /**
   * Timestamp indicating when the landfill entry was created.
   */
  created_at: z.coerce.date(),
  /**
   * Timestamp indicating when the landfill entry was last updated.
   */
  updated_at: z.coerce.date(),
  /**
   * User ID associated with the landfill entry.
   */
  created_by_user_id: z.string(),
  /**
   * Volume of waste.
   */
  volume: z.number(),
  /**
   * Time of arrival.
   */
  arrival_time: z.coerce.date(),
  /**
   * Time of departure.
   */
  departure_time: z.coerce.date(),
})

export type landfill_dumpings = z.infer<typeof landfill_dumpingsSchema>
