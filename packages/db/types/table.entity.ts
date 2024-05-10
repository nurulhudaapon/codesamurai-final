import type { Database, Enums, Tables } from './types';

export type DatabaseTable = Database['public']['Tables'];
type DatabaseView = Database['public']['Views'];
type DatabaseTableAndViews = DatabaseTable;

export type DatabaseEnum = Database['public']['Enums'];
export type DatabaseEntity<TTransactionType extends 'update' | 'insert' | 'select' = 'select'> = {
	[K in keyof DatabaseTableAndViews]: DatabaseTableAndViews[K][TTransactionType extends 'update'
		? 'Update'
		: TTransactionType extends 'insert'
			? 'Insert'
			: 'Row'];
};
