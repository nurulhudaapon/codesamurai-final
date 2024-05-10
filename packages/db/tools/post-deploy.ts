import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const main = async () => {
	console.log('\n\n\n🪫 Restarting DB API...');
	const result = await prisma.$executeRaw`NOTIFY pgrst, 'reload schema';`;
	return result;
};

main()
	.then((result) => console.log('🔋 Done restarting DB API!\n\n\n'))
	.catch((e) => console.error(' ❌ Error restarting DB API', e));
