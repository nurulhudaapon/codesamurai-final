import { z } from 'zod';
import type { Prisma } from '@prisma/client';

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////


/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const TransactionIsolationLevelSchema = z.enum(['ReadUncommitted','ReadCommitted','RepeatableRead','Serializable']);

export const UserScalarFieldEnumSchema = z.enum(['id','created_at','updated_at','first_name','last_name','email','phone','last_login_at','password','role_id','state']);

export const RoleScalarFieldEnumSchema = z.enum(['id','created_at','updated_at','slug','title']);

export const PermissionScalarFieldEnumSchema = z.enum(['id','created_at','updated_at','slug','title']);

export const Role_permissionScalarFieldEnumSchema = z.enum(['id','created_at','updated_at','role_id','permission_id']);

export const VehicleScalarFieldEnumSchema = z.enum(['id','created_at','updated_at','created_by_user_id','sts_id','number','type','capacity','loaded_cost','unloaded_cost']);

export const StsScalarFieldEnumSchema = z.enum(['id','created_at','updated_at','created_by_user_id','ward_number','capacity_tonnes','latitude','longitude','manager_id']);

export const Sts_entryScalarFieldEnumSchema = z.enum(['id','created_at','updated_at','created_by_user_id','sts_id','vehicle_id','volume','arrival_time','departure_time']);

export const Landfill_entryScalarFieldEnumSchema = z.enum(['id','created_at','updated_at','created_by_user_id','volume','arrival_time','departure_time']);

export const SortOrderSchema = z.enum(['asc','desc']);

export const QueryModeSchema = z.enum(['default','insensitive']);

export const NullsOrderSchema = z.enum(['first','last']);

export const user_stateSchema = z.enum(['active','inactive']);

export type user_stateType = `${z.infer<typeof user_stateSchema>}`

export const vehicle_typeSchema = z.enum(['open_truck','dump_truck','compactor','container_carrier']);

export type vehicle_typeType = `${z.infer<typeof vehicle_typeSchema>}`

export const vehicle_capacitySchema = z.enum(['three_ton','five_ton','seven_ton']);

export type vehicle_capacityType = `${z.infer<typeof vehicle_capacitySchema>}`

/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

/////////////////////////////////////////
// USER SCHEMA
/////////////////////////////////////////

/**
 * @namespace Accounts
 * Represents user in the system.
 * This model stores information about user.
 */
export const userSchema = z.object({
  /**
   * State of the user (default active).
   */
  state: user_stateSchema,
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

export type user = z.infer<typeof userSchema>

/////////////////////////////////////////
// ROLE SCHEMA
/////////////////////////////////////////

/**
 * @namespace Accounts
 * List of role that a user can have.
 */
export const roleSchema = z.object({
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

export type role = z.infer<typeof roleSchema>

/////////////////////////////////////////
// PERMISSION SCHEMA
/////////////////////////////////////////

/**
 * @namespace Accounts
 * Represents the permission that a role can have.
 */
export const permissionSchema = z.object({
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

export type permission = z.infer<typeof permissionSchema>

/////////////////////////////////////////
// ROLE PERMISSION SCHEMA
/////////////////////////////////////////

/**
 * @namespace Accounts
 * Represents the relationship between role and permission.
 */
export const role_permissionSchema = z.object({
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

export type role_permission = z.infer<typeof role_permissionSchema>

/////////////////////////////////////////
// VEHICLE SCHEMA
/////////////////////////////////////////

export const vehicleSchema = z.object({
  /**
   * Type of the vehicle.
   */
  type: vehicle_typeSchema,
  /**
   * Capacity of the vehicle.
   */
  capacity: vehicle_capacitySchema,
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
  sts_id: z.string(),
  /**
   * Vehicle number.
   */
  number: z.string(),
  /**
   * Fuel cost per Kilometer when full load.
   */
  loaded_cost: z.number().nullable(),
  /**
   * Fuel cost per Kilometer when empty load.
   */
  unloaded_cost: z.number().nullable(),
})

export type vehicle = z.infer<typeof vehicleSchema>

/////////////////////////////////////////
// STS SCHEMA
/////////////////////////////////////////

export const stsSchema = z.object({
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
  latitude: z.number(),
  longitude: z.number(),
  /**
   * STS manager ID associated with the STS.
   */
  manager_id: z.string(),
})

export type sts = z.infer<typeof stsSchema>

/////////////////////////////////////////
// STS ENTRY SCHEMA
/////////////////////////////////////////

export const sts_entrySchema = z.object({
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

export type sts_entry = z.infer<typeof sts_entrySchema>

/////////////////////////////////////////
// LANDFILL ENTRY SCHEMA
/////////////////////////////////////////

export const landfill_entrySchema = z.object({
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

export type landfill_entry = z.infer<typeof landfill_entrySchema>
