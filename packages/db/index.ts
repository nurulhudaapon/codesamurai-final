import { EcosyncLogger } from "@ecosync/logger";

const console = new EcosyncLogger({ name: "Database" }).init();

export class EcosyncDatabase {
    constructor() {
        console.log('EcosyncDatabase constructor');
    }
    init() {
        console.log('EcosyncDatabase init');
        return 'Test'
    }
}