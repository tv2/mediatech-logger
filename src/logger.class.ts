import { LogContext } from './log-context.class'
import { ILogger, LoggerOutput } from './logger.interface'
import { isValidLogLevel, LogLevel } from './log-level'
import { Format, applyFormat, FormatOptions } from './format'
import { createVault, IVault, Vault, VaultOptions } from './vault'

export type LoggerOptions<LogFormat> = {
  level: LogLevel
  format: FormatOptions<LogFormat>
  vault: VaultOptions
}

export class Logger<LogFormat> implements ILogger<LogFormat> {

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
  tag(tag: string): LogContext<LogFormat,Logger<LogFormat>> {
    const logContext = new LogContext<LogFormat,Logger<LogFormat>>(this)
    return logContext.tag(tag)
  }

  data(data: any): LogContext<LogFormat,Logger<LogFormat>> {
    const logContext = new LogContext<LogFormat,Logger<LogFormat>>(this)
    return logContext.data(data)
  }

  error(message: any, meta: object = {}): LoggerOutput<LogFormat> {
    return this.log(message, LogLevel.Error, meta)
  }

  warn(message: any, meta: object = {}): LoggerOutput<LogFormat> {
    return this.log(message, LogLevel.Warn, meta)
  }

  info(message: any, meta: object = {}): LoggerOutput<LogFormat> {
    return this.log(message, LogLevel.Info, meta)
  }

  debug(message: any, meta: object = {}): LoggerOutput<LogFormat> {
    return this.log(message, LogLevel.Debug, meta)
  }

  trace(message: any, meta: object = {}): LoggerOutput<LogFormat> {
    return this.log(message, LogLevel.Trace, meta)
  }

  private log(message: any, level: LogLevel, meta: object = {}): LoggerOutput<LogFormat> {
    if (!isValidLogLevel(level, this.options.level)) {
      return 
    }
    const result = applyFormat({ message, level, ...meta }, this.options.format)
    return this.vault.store(result)
  }
}
