import { PrismaClient } from '@prisma/client';


export const getPrismaClient = async () => {
	return new PrismaClient();
};
