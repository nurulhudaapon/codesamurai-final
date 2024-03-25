import { EcosyncLogger } from "@ecosync/logger";
import { EcosyncDatabase } from "@ecosync/db";
import { EcosyncRbacService } from "./services/rbac";
import { EcosyncUserService } from "./services/user";

const console = new EcosyncLogger({ name: "DbClient" }).init();

export class EcosyncDbClient {
    // ==== Private Thingy ==== //
    #db: EcosyncDatabase;
    #client: ReturnType<EcosyncDatabase['client']>;

    // ==== Public Services ==== //
    rbac: EcosyncRbacService;
    user: EcosyncUserService;
    
    constructor({
        db
    }:
        {
            db: EcosyncDatabase
        }
    ) {
        // Private Thingy
        this.#db = db;
        this.#client = this.#db.client();

        // Public Services
        this.rbac = new EcosyncRbacService({ client: this.#client })
        this.user = new EcosyncUserService({ client: this.#client })
    }
}