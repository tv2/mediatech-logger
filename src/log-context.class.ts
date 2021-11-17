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
  
    error(message: any, meta: object) {
      this.logger.error(message, this.meta)
      this.meta = { ...this.meta, ...meta }
    }
  
    warn(message: any, meta: object) {
      this.logger.warn(message, this.meta)
      this.meta = { ...this.meta, ...meta }
    }
  
    info(message: any, meta: object) {
      this.logger.info(message, this.meta)
      this.meta = { ...this.meta, ...meta }
    }
  
    debug(message: any, meta: object) {
      this.logger.debug(message, this.meta)
      this.meta = { ...this.meta, ...meta }
    }
  
    trace(message: any, meta: object) {
      this.logger.trace(message, this.meta)
      this.meta = { ...this.meta, ...meta }
    }
}