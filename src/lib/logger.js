import log from "loglevel";
log.setLevel(process.env.NODE_ENV === "production" ? "info" : "debug");

export function logger(moduleName = "OT") {
  return {
    debug: (...args) => log.debug(`[${moduleName}]`, ...args),
    info: (...args) => log.info(`[${moduleName}]`, ...args),
    warn: (...args) => log.warn(`[${moduleName}]`, ...args),
    error: (...args) => log.error(`[${moduleName}]`, ...args),
  };
}

export default log;
