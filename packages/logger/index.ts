import kleur from "kleur";

type EcosyncLoggerConfig = {
  name: string;
};

export class EcosyncLogger {
  #config: EcosyncLoggerConfig;

  constructor(config: EcosyncLoggerConfig) {
    this.#config = config;
  }

  /**
   * Override the console object within the module scope
   */
  init() {
    const LOG_LEVEL_PREFIX = {
      debug: kleur.bold().white().bgBlack("DEBUG"),
      log: kleur.bold().cyan().bgBlack("LOG"),
      warn: kleur.bold().yellow().bgBlack("WARN"),
      error: kleur.bold().red().bgBlack("ERROR"),
      info: kleur.bold().blue().bgBlack("INFO"),
    };

    const brandTxt = `[${kleur.bold().white().bgBlack("Ecosync")}/${kleur.italic(this.#config.name.toLowerCase())}]:`;

    const originalConsole = globalThis.console;
    const console: typeof globalThis.console = {
      ...globalThis.console,
      debug: (...msgs: unknown[]): void => originalConsole.debug(LOG_LEVEL_PREFIX.debug, brandTxt, ...msgs),
      log: (...msgs: unknown[]): void => originalConsole.log(LOG_LEVEL_PREFIX.log, brandTxt, ...msgs),
      warn: (...msgs: unknown[]): void => originalConsole.warn(LOG_LEVEL_PREFIX.warn, brandTxt, ...msgs),
      error: (...msgs: unknown[]): void => originalConsole.error(LOG_LEVEL_PREFIX.error, brandTxt, ...msgs),
      info: (...msgs: unknown[]): void => originalConsole.info(LOG_LEVEL_PREFIX.info, brandTxt, ...msgs),
    };

    return console;
  }
}
