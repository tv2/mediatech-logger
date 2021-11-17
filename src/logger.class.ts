import { LogContext } from './log-context.class'
import { ILogger } from './logger.interface'
import { isValidLogLevel, LogLevel } from './log-level'
import { Format, applyFormat, FormatOptions } from './format'
import { createVault, IVault, Vault, VaultOptions } from './vault'

export type LoggerOptions<LogFormat> = {
  level: LogLevel
  format: FormatOptions<LogFormat>
  vault: VaultOptions
}
export class Logger<LogFormat> implements ILogger {

  private options: LoggerOptions<LogFormat>
  private vault: IVault<LogFormat | string>

  constructor(options: Partial<LoggerOptions<LogFormat>>) {
    this.options = { 
      ...{
        level: LogLevel.Debug,
        format: {
          kind: Format.JSON,
          depth: 3n,
        },
        vault: {
          kind: Vault.Console,
        }
      },
       ...options
    }
    this.vault = createVault(this.options.vault)
  }

  /**
   * Adds a tag to a log context.
   * @param tag The tag to add to meta
   * @returns A log context with the tag
   */
  tag(tag: string): LogContext<Logger<LogFormat>> {
    const logContext = new LogContext<Logger<LogFormat>>(this)
    return logContext.tag(tag)
  }

  error(data: any, meta: object = {}): void {
    this.log(data, LogLevel.Error, meta)
  }

  warn(data: any, meta: object = {}): void {
    this.log(data, LogLevel.Warn, meta)
  }

  info(data: any, meta: object = {}): void {
    this.log(data, LogLevel.Info, meta)
  }

  debug(data: any, meta: object = {}): void {
    this.log(data, LogLevel.Debug, meta)
  }

  trace(data: any, meta: object = {}): void {
    this.log(data, LogLevel.Trace, meta)
  }

  private log(data: any, level: LogLevel, meta: object = {}): void {
    if (!isValidLogLevel(level, this.options.level)) {
      return
    }
    const result = applyFormat({ data, level, ...meta }, this.options.format)
    this.vault.store(result)
  }
}