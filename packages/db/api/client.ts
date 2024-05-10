import { PostgrestClient } from '@supabase/postgrest-js';
import * as cfetch from 'cross-fetch';
import * as jwt from 'jsonwebtoken';
import type { Database } from '../types/types';

export type PostgrestClientType = PostgrestClient<Database, 'public'>;
export type PostgrestFilterType = ReturnType<ReturnType<PostgrestClientType['from']>['select']>;




/** Postgrest client */
export const createDbClient = (apiUrl: string, jwtSecret: string, useCrossFetch = true): PostgrestClientType => {
	const jwtToken = jwt.sign({ iss: 'lr', role: 'postgres' }, jwtSecret);
	return new PostgrestClient(apiUrl, {
		headers: jwtToken ? { Authorization: `Bearer ${jwtToken}` } : {},
		fetch: !useCrossFetch ? undefined : (input, init) => {
			// fetch with error logging interceptor
			return cfetch.fetch(input, init).then(async (response) => {
				if (!response.ok) {
					console.error({
						status: response.status,
						statusText: response.statusText,
						url: response.url,
						body: await response.clone().json(),
					});
				}
				return response;
			});
		},
	});
};