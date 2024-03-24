import { EcosyncLogger } from '@ecosync/logger';
import { InitData } from '../data';
import { getPrismaClient } from './client';

const console = new EcosyncLogger({ name: "Database" }).init();

export const main = async () => {
	console.log('\n\n\n🪫 Seeding database...');
	const prismaClient = await getPrismaClient();

	// ==== Initialize Data ==== //
	// Wait 3 seconds to make sure the database is ready
	await new Promise((resolve) => setTimeout(resolve, 3000));
	for (const resource in InitData) {
		// eslint-disable-next-line
		// @ts-ignore
		const response = await prismaClient[resource as keyof typeof prisma].createMany({
			data: InitData[resource as keyof typeof InitData],
			skipDuplicates: true,
		});

		console.log(String(`✅ Seeded | Count: ${response?.count}] -> \x1b[32m${resource} \x1b[0m`));
	}
};

main()
	.then(() => console.log('🔋 Done seeding database!\n\n\n'))
	.catch((e) => console.error(' ❌ Error seeding database', e));
