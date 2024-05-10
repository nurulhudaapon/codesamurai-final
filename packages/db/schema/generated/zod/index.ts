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

export const StsScalarFieldEnumSchema = z.enum(['id','name','created_at','updated_at','created_by_user_id','ward_number','capacity_tonnes','latitude','longitude','manager_id']);

export const LandfillScalarFieldEnumSchema = z.enum(['id','name','created_at','updated_at','created_by_user_id','capacity_tonnes','latitude','longitude','opens_at','closes_at']);

export const TransportationScalarFieldEnumSchema = z.enum(['id','created_at','updated_at','created_by_user_id','sts_id','landfill_id','vehicle_id','volume','arrival_time','departure_time','padding','distance','location_type']);

export const IssueScalarFieldEnumSchema = z.enum(['id','title','description','type','attachments','created_at','updated_at','created_by_user_id','latitude','longitude']);

export const PostScalarFieldEnumSchema = z.enum(['id','content','type','attachments','created_at','updated_at','created_by_user_id']);

export const Contractor_companyScalarFieldEnumSchema = z.enum(['id','name','contract_id','registration_id','registration_date','tin','contact_number','workforce_size','payment_per_tonnage','required_amount_per_day','contract_duration','area_of_collection','sts_id']);

export const User_contractor_companyScalarFieldEnumSchema = z.enum(['user_id','contractor_company_id']);

export const Workforce_logScalarFieldEnumSchema = z.enum(['id','type','workforce_id','created_at','updated_at']);

export const WorkforceScalarFieldEnumSchema = z.enum(['id','full_name','dob','hired_at','job_title','payment_rate','contact_information','contractor_id','assigned_collection_route']);

export const SortOrderSchema = z.enum(['asc','desc']);

export const QueryModeSchema = z.enum(['default','insensitive']);

export const NullsOrderSchema = z.enum(['first','last']);

export const user_stateSchema = z.enum(['active','inactive']);

export type user_stateType = `${z.infer<typeof user_stateSchema>}`

export const workforce_log_typeSchema = z.enum(['start','end']);

export type workforce_log_typeType = `${z.infer<typeof workforce_log_typeSchema>}`

export const post_typeSchema = z.enum(['event','announcement','post']);

export type post_typeType = `${z.infer<typeof post_typeSchema>}`

export const transportation_location_typeSchema = z.enum(['sts','landfill']);

export type transportation_location_typeType = `${z.infer<typeof transportation_location_typeSchema>}`

export const vehicle_typeSchema = z.enum(['open_truck','dump_truck','compactor','container_carrier']);

export type vehicle_typeType = `${z.infer<typeof vehicle_typeSchema>}`

export const vehicle_capacitySchema = z.enum(['three_ton','five_ton','seven_ton','fifteen_ton']);

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
  name: z.string(),
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
// LANDFILL SCHEMA
/////////////////////////////////////////

export const landfillSchema = z.object({
  /**
   * Unique identifier for the STS.
   */
  id: z.string().uuid(),
  /**
   * Name of the landfill
   */
  name: z.string(),
  /**
   * Timestamp indicating when the STS was created.
   */
  created_at: z.coerce.date(),
  updated_at: z.coerce.date(),
  created_by_user_id: z.string(),
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
   * Operational time
   */
  opens_at: z.string(),
  closes_at: z.string(),
})

export type landfill = z.infer<typeof landfillSchema>

/////////////////////////////////////////
// TRANSPORTATION SCHEMA
/////////////////////////////////////////

export const transportationSchema = z.object({
  /**
   * Type of the location.
   */
  location_type: transportation_location_typeSchema.nullable(),
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
  sts_id: z.string().nullable(),
  /**
   * Landfill ID where the wast is dumped
   */
  landfill_id: z.string().nullable(),
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
  arrival_time: z.coerce.date().nullable(),
  /**
   * Time of departure.
   */
  departure_time: z.coerce.date().nullable(),
  padding: z.boolean(),
  /**
   * Distance from the STS to the landfill.
   */
  distance: z.number(),
})

export type transportation = z.infer<typeof transportationSchema>

/////////////////////////////////////////
// ISSUE SCHEMA
/////////////////////////////////////////

export const issueSchema = z.object({
  /**
   * Unique identifier for the STS.
   */
  id: z.string().uuid(),
  /**
   * Title of the issue
   */
  title: z.string(),
  description: z.string(),
  /**
   * Type of the issue - overflowing bins, littering, illegal dumping, or damaged infrastructure.
   */
  type: z.string(),
  /**
   * Attachments of the issue
   */
  attachments: z.string().array(),
  /**
   * Timestamp indicating when the report was issued
   */
  created_at: z.coerce.date(),
  updated_at: z.coerce.date(),
  created_by_user_id: z.string().nullable(),
  /**
   * GPS coordinates of the STS.
   */
  latitude: z.number(),
  /**
   * GPS coordinates of the STS.
   */
  longitude: z.number(),
})

export type issue = z.infer<typeof issueSchema>

/////////////////////////////////////////
// POST SCHEMA
/////////////////////////////////////////

export const postSchema = z.object({
  /**
   * Type of the post: event, announcement, post
   */
  type: post_typeSchema,
  /**
   * Unique identifier for the STS.
   */
  id: z.string().uuid(),
  /**
   * Content of the post
   */
  content: z.string(),
  /**
   * Attachments of the post
   */
  attachments: z.string().array(),
  /**
   * Timestamp indicating when the post was made
   */
  created_at: z.coerce.date(),
  updated_at: z.coerce.date(),
  created_by_user_id: z.string().nullable(),
})

export type post = z.infer<typeof postSchema>

/////////////////////////////////////////
// CONTRACTOR COMPANY SCHEMA
/////////////////////////////////////////

export const contractor_companySchema = z.object({
  /**
   * Unique identifier for the contractor company.
   */
  id: z.string().uuid(),
  /**
   * Name of the company
   */
  name: z.string(),
  /**
   * Contract ID
   */
  contract_id: z.string(),
  /**
   * Registration ID
   */
  registration_id: z.string(),
  /**
   * Registration Date
   */
  registration_date: z.coerce.date(),
  /**
   * TIN of the company
   */
  tin: z.string(),
  /**
   * Contact number
   */
  contact_number: z.string(),
  /**
   * Workforce size
   */
  workforce_size: z.number().int(),
  /**
   * Payment per tonnage of waste
   */
  payment_per_tonnage: z.number(),
  /**
   * The required amount of waste per day
   */
  required_amount_per_day: z.number(),
  /**
   * Contract duration
   */
  contract_duration: z.string(),
  /**
   * Area of collection
   */
  area_of_collection: z.string(),
  /**
   * Designated STS
   */
  sts_id: z.string(),
})

export type contractor_company = z.infer<typeof contractor_companySchema>

/////////////////////////////////////////
// USER CONTRACTOR COMPANY SCHEMA
/////////////////////////////////////////

/**
 * @namespace Workforce
 * Represents the relation between user and contractor company.
 */
export const user_contractor_companySchema = z.object({
  /**
   * User ID associated with the user contractor company.
   */
  user_id: z.string(),
  /**
   * Contractor company ID associated with the user contractor company.
   */
  contractor_company_id: z.string(),
})

export type user_contractor_company = z.infer<typeof user_contractor_companySchema>

/////////////////////////////////////////
// WORKFORCE LOG SCHEMA
/////////////////////////////////////////

export const workforce_logSchema = z.object({
  /**
   * Type of log: start, end
   */
  type: workforce_log_typeSchema,
  /**
   * Unique identifier for the STS.
   */
  id: z.string().uuid(),
  /**
   * Workforce ID
   */
  workforce_id: z.string(),
  /**
   * Timestamp indicating when the post was made
   */
  created_at: z.coerce.date(),
  updated_at: z.coerce.date(),
})

export type workforce_log = z.infer<typeof workforce_logSchema>

/////////////////////////////////////////
// WORKFORCE SCHEMA
/////////////////////////////////////////

export const workforceSchema = z.object({
  /**
   * Unique identifier for the STS.
   */
  id: z.string().uuid(),
  /**
   * Full name of the workforce
   */
  full_name: z.string(),
  /**
   * Date of Birth
   */
  dob: z.coerce.date(),
  /**
   * Date of Hire
   */
  hired_at: z.coerce.date(),
  /**
   * Job Title
   */
  job_title: z.string(),
  /**
   * Payment rate per hour
   */
  payment_rate: z.number(),
  /**
   * Contact Information
   */
  contact_information: z.string(),
  /**
   * Contractor ID
   */
  contractor_id: z.string(),
  /**
   * Assigned Collection Route
   */
  assigned_collection_route: z.string(),
})

export type workforce = z.infer<typeof workforceSchema>
