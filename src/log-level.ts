export enum LogLevel {
  Error,
  Warn,
  Info,
  Debug,
  Trace,
}

/**
 * Checks if a level should be logged, given the master log level.
 * @param level The level to be determined if is valid to log.
 * @param masterLevel The level to test against.
 * @returns Whether the level is a valid level to log.
 */
export function isValidLogLevel(level: LogLevel, masterLevel: LogLevel): boolean {
  return level <= masterLevel
}