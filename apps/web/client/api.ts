import { PostgrestClient } from '@supabase/postgrest-js';
import * as cfetch from 'cross-fetch';
import * as jwt from 'jsonwebtoken';
import type { PostgrestClientType  } from '@ecosync/db/api';

/** Postgrest client */
export const createDbApiClient = (apiUrl: string, jwtSecret: string, useCrossFetch = true): PostgrestClientType => {
	// const jwtToken = jwt.sign({ iss: 'es', role: 'postgres' }, jwtSecret | '-');
	return new PostgrestClient(apiUrl, {
		// headers: jwtToken ? { Authorization: `Bearer ${jwtToken}` } : {},
		// fetch: !useCrossFetch ? undefined : (input, init) => {
		// 	// fetch with error logging interceptor
		// 	return cfetch.fetch(input, init).then(async (response) => {
		// 		if (!response.ok) {
		// 			console.error({
		// 				status: response.status,
		// 				statusText: response.statusText,
		// 				url: response.url,
		// 				body: await response.clone().json(),
		// 			});
		// 		}
		// 		return response;
		// 	});
		// },
	});
};