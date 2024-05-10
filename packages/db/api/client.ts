import type { PostgrestClient } from '@supabase/postgrest-js';

import type { Database } from '../types/types';

export type PostgrestClientType = PostgrestClient<Database, 'public'>;
export type PostgrestFilterType = ReturnType<ReturnType<PostgrestClientType['from']>['select']>;
