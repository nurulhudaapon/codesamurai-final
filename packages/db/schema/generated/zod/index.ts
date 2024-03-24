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

export const SortOrderSchema = z.enum(['asc','desc']);

export const QueryModeSchema = z.enum(['default','insensitive']);

export const NullsOrderSchema = z.enum(['first','last']);

export const users_stateSchema = z.enum(['active','inactive']);

export type users_stateType = `${z.infer<typeof users_stateSchema>}`

