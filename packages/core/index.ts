import { EcosyncLogger } from "@ecosync/logger";

const console = new EcosyncLogger({ name: "Core" }).init();

export class EcosyncCore {
  constructor() {
    console.debug("constructor");
  }
}
