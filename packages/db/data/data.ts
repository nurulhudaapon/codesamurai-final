import { v4 as uuid } from 'uuid';

const now = new Date().toISOString();

//======== Initial Data ========
export const users = [
	{
		id: uuid(),
		email: 'admin@ecosync.gov.bd',
		phone: '+8801000000000',
		first_name: 'Default',
		last_name: 'Admin',
		status: 'active',
		role: 'admin',
		password: 'HASHED_PASSWORD',
		created_at: now,
		updated_at: now,
	}
];
