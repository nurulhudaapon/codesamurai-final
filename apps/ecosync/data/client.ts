import { PostgrestClient } from '@supabase/postgrest-js';
// import * as cfetch from 'cross-fetch';
// import * as jwt from 'jsonwebtoken';
import type { PostgrestClientType  } from '@ecosync/db/api';

/** Postgrest client */
export const createDbApiClient = (apiUrl: string, jwtSecret: string,): PostgrestClientType => {
	return new PostgrestClient(apiUrl, {
		// headers: jwtToken ? { Authorization: `Bearer ${jwtToken}` } : {},
	});
};

export const dbClient = createDbApiClient("http://localhost:8080", "ecosync-jwt-secret");