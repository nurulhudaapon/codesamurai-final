import { PostgrestClient } from '@supabase/postgrest-js';
import * as cfetch from 'cross-fetch';
import * as jwt from 'jsonwebtoken';
import type { Database } from '../types/types';

export type PostgrestClientType = PostgrestClient<Database, 'public'>;
export type PostgrestFilterType = ReturnType<ReturnType<PostgrestClientType['from']>['select']>;