import { EcosyncLogger } from "@ecosync/logger";

const console = new EcosyncLogger({ name: "DbClient" }).init();

export class EcosyncDbClient {
    constructor() {
        console.log('EcosyncClient constructor');
    }

    getUsers() {
        return []
    }
}