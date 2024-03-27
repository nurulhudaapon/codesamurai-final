import { EcosyncLogger } from "@ecosync/logger";
import { EcosyncDatabase } from "@ecosync/db";
import { EcosyncRbacService } from "./services/rbac";
import { EcosyncUserService } from "./services/user";
import { EcosyncVehicleService } from "./services/vehicle";
import { EcosyncStsDumpingService } from "./services/sts-dumping";
import { EcosyncLandfillDumpingService } from "./services/landfill-dumping";
import { EcosyncRoleService } from "./services/role";
import { EcosyncPermissionService } from "./services/permission";

const console = new EcosyncLogger({ name: "DbClient" }).init();

export class EcosyncDbClient {
  // ==== Private Thingy ==== //
  #db: EcosyncDatabase;
  #client: ReturnType<EcosyncDatabase["client"]>;

  // ==== Public Services ==== //
  rbac: EcosyncRbacService;
  user: EcosyncUserService;
  vehicle: EcosyncVehicleService;
  stsDumping: EcosyncStsDumpingService;
  landfillDumping: EcosyncLandfillDumpingService;
  role: EcosyncRoleService;
  permission: EcosyncPermissionService;

  constructor({ db }: { db: EcosyncDatabase }) {
    // Private Thingy
    this.#db = db;
    this.#client = this.#db.client();

    // Public Services
    this.rbac = new EcosyncRbacService({ client: this.#client });
    this.user = new EcosyncUserService({ client: this.#client });
    this.vehicle = new EcosyncVehicleService({ client: this.#client });
    this.stsDumping = new EcosyncStsDumpingService({ client: this.#client });
    this.landfillDumping = new EcosyncLandfillDumpingService({
      client: this.#client,
    });
    this.role = new EcosyncRoleService({ client: this.#client });
    this.permission = new EcosyncPermissionService({ client: this.#client });
  }
}
