import { EcosyncDatabase } from "@ecosync/db";
import { EcosyncLandfillService } from "./services/landfill";
import { EcosyncPermissionService } from "./services/permission";
import { EcosyncRbacService } from "./services/rbac";
import { EcosyncRoleService } from "./services/role";
import { EcosyncStsService } from "./services/sts";
import { EcosyncTransportationService } from "./services/transportation";
import { EcosyncUserService } from "./services/user";
import { EcosyncVehicleService } from "./services/vehicle";



export class EcosyncDbClient {

  // ==== Private Thingy ==== //
  #client: EcosyncDatabase["client"];
  #db: EcosyncDatabase;

  // ==== Public Services ==== //
  landfill: EcosyncLandfillService;
  permission: EcosyncPermissionService;
  rbac: EcosyncRbacService;
  role: EcosyncRoleService;
  sts: EcosyncStsService;
  transportation: EcosyncTransportationService;
  user: EcosyncUserService;
  vehicle: EcosyncVehicleService;

  constructor({ db }: { db: EcosyncDatabase }) {

    // Private Thingy
    this.#db = db;
    this.#client = this.#db.client;

    // Public Services
    this.landfill = new EcosyncLandfillService({ client: this.#client });
    this.permission = new EcosyncPermissionService({ client: this.#client });
    this.rbac = new EcosyncRbacService({ client: this.#client });
    this.role = new EcosyncRoleService({ client: this.#client });
    this.sts = new EcosyncStsService({ client: this.#client });
    this.transportation = new EcosyncTransportationService({ client: this.#client });
    this.user = new EcosyncUserService({ client: this.#client });
    this.vehicle = new EcosyncVehicleService({ client: this.#client });
  }
}
