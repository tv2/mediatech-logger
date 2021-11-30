import { ILogger } from './logger.interface'

export class LogContext implements ILogger {
  logger: ILogger
  meta: Record<string, any>

  constructor(logger: ILogger) {
    this.logger = logger
    this.meta = {}
  }

  // Attributes
  tag(tag: string): LogContext {
    this.updateMeta({ tag })
    return this
  }

  data(data: string): LogContext {
    this.updateMeta({ data })
    return this
  }

  // Severity logging
  error(message: any, meta: object = {}): void {
    this.updateMeta(meta)
    return this.logger.error(message, this.meta)
  }

  warn(message: any, meta: object = {}): void {
    this.updateMeta(meta)
    return this.logger.warn(message, this.meta)
  }

  info(message: any, meta: object = {}): void {
    this.updateMeta(meta)
    return this.logger.info(message, this.meta)
  }

  debug(message: any, meta: object = {}): void {
    this.updateMeta(meta)
    return this.logger.debug(message, this.meta)
  }

  trace(message: any, meta: object = {}): void {
    this.updateMeta(meta)
    return this.logger.trace(message, this.meta)
  }

  // Helpers
  private updateMeta(meta: object) {
    this.meta = { ...this.meta, ...meta }
  }
}
