import { EcosyncLogger } from '@ecosync/logger';
import { InitData } from '../data';
import { getPrismaClient } from '../client';

const console = new EcosyncLogger({ name: "Database" }).init();

export const main = async () => {
	console.log('🪫 Seeding database...');
	const prismaClient = getPrismaClient();

	// ==== Initialize Data ==== //
	for (const resource in InitData) {
		// eslint-disable-next-line
		// @ts-ignore
		const response = await prismaClient[resource as keyof typeof prisma].createMany({
			data: InitData[resource as keyof typeof InitData],
			skipDuplicates: true,
		});

		// Wait 200ms


		console.log(String(`✅ Seeded | Count: ${response?.count}] -> \x1b[32m${resource} \x1b[0m`));
	}
};

await main()
	.then(() => console.log('🔋 Done seeding database!\n\n\n'))
	.catch((e) => console.error(' ❌ Error seeding database', e));
