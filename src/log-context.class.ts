import { ILogger } from './logger.interface'

export class LogContext<Logger extends ILogger> implements ILogger {

    logger: Logger
    meta: { [key: string]: any }
  
    constructor(logger: Logger) {
      this.logger = logger
      this.meta = {}
    }
  
    tag(tag: string): LogContext<Logger> {
      this.meta['tag'] = tag
      return this
    }

    data(data: any): LogContext<Logger> {
      this.meta['data'] = data
      return this
    }
  
    error(message: any, meta: object = {}): void {
      this.meta = { ...this.meta, ...meta }
      this.logger.error(message, this.meta)
    }
  
    warn(message: any, meta: object = {}): void {
      this.meta = { ...this.meta, ...meta }
      this.logger.warn(message, this.meta)
    }
  
    info(message: any, meta: object = {}): void {
      this.meta = { ...this.meta, ...meta }
      this.logger.info(message, this.meta)
    }
  
    debug(message: any, meta: object = {}): void {
      this.meta = { ...this.meta, ...meta }
      this.logger.debug(message, this.meta)
    }
  
    trace(message: any, meta: object = {}): void {
      this.meta = { ...this.meta, ...meta }
      this.logger.trace(message, this.meta)
    }
}
