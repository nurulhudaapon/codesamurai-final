import { z } from 'zod';
import type { Prisma } from '@prisma/client';

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////


/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const TransactionIsolationLevelSchema = z.enum(['ReadUncommitted','ReadCommitted','RepeatableRead','Serializable']);

export const UsersScalarFieldEnumSchema = z.enum(['id','created_at','updated_at','first_name','last_name','email','phone','last_login_at','password','role','state']);

export const SortOrderSchema = z.enum(['asc','desc']);

export const QueryModeSchema = z.enum(['default','insensitive']);

export const NullsOrderSchema = z.enum(['first','last']);

export const users_roleSchema = z.enum(['admin','sts']);

export type users_roleType = `${z.infer<typeof users_roleSchema>}`

export const users_stateSchema = z.enum(['active','inactive']);

export type users_stateType = `${z.infer<typeof users_stateSchema>}`

