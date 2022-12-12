import { Level } from './level'
import { Logger } from './logger.interface'

export class LogContext implements Logger {
  private logger: Logger
  private _meta: Record<string, any>

  constructor(logger: Logger, meta?: Record<string, any>) {
    this.logger = logger
    this._meta = meta ?? {}
  }
  // Level
  setLevel = (level: Level): void => {
    this.logger.setLevel(level)
  }

  // Attributes
  tag = (tag: string): LogContext => {
    return this.meta({ tag })
  }

  data = (data: string): LogContext => {
    return this.meta({ data })
  }

  meta = (meta: object): LogContext => {
    return new LogContext(this.logger, { ...this._meta, ...meta })
  }

  // Severity logging
  error = (message: any, meta: object = {}): void => {
    return this.logger.error(message, { ...this._meta, ...meta })
  }

  warn = (message: any, meta: object = {}): void => {
    return this.logger.warn(message, { ...this._meta, ...meta })
  }

  info = (message: any, meta: object = {}): void => {
    this.logger.info(message, { ...this._meta, ...meta })
  }

  debug = (message: any, meta: object = {}): void => {
    return this.logger.debug(message, { ...this._meta, ...meta })
  }

  trace = (message: any, meta: object = {}): void => {
    return this.logger.trace(message, { ...this._meta, ...meta })
  }
}
