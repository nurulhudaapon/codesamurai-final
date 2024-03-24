import { EcosyncLogger } from "@ecosync/logger";
import { EcosyncDatabase } from "@ecosync/db";

const console = new EcosyncLogger({ name: "DbClient" }).init();

export class EcosyncDbClient {
    #db: EcosyncDatabase;
    #client: ReturnType<EcosyncDatabase['client']>;

    constructor({
        db
    }:
        {
            db: EcosyncDatabase
        }
    ) {
        console.log('EcosyncClient constructor');
        this.#db = db;
        this.#client = this.#db.client();
    }

    getUsers() {
        return this.#client.users.findMany();
    }
}