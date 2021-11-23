import { ILogger, LoggerOutput } from './logger.interface'

export class LogContext<LogFormat,Logger extends ILogger<LogFormat>> implements ILogger<LogFormat> {

    logger: Logger
    meta: { [key: string]: any }
  
    constructor(logger: Logger) {
      this.logger = logger
      this.meta = {}
    }
  
    tag(tag: string): LogContext<LogFormat,Logger> {
      this.meta['tag'] = tag
      return this
    }

    data(data: any): LogContext<LogFormat,Logger> {
      this.meta['data'] = data
      return this
    }
  
    error(message: any, meta: object = {}): LoggerOutput<LogFormat> {
      this.meta = { ...this.meta, ...meta }
      return this.logger.error(message, this.meta)
    }
  
    warn(message: any, meta: object = {}): LoggerOutput<LogFormat> {
      this.meta = { ...this.meta, ...meta }
      return this.logger.warn(message, this.meta)
    }
  
    info(message: any, meta: object = {}): LoggerOutput<LogFormat> {
      this.meta = { ...this.meta, ...meta }
      return this.logger.info(message, this.meta)
    }
  
    debug(message: any, meta: object = {}): LoggerOutput<LogFormat> {
      this.meta = { ...this.meta, ...meta }
      return this.logger.debug(message, this.meta)
    }
  
    trace(message: any, meta: object = {}): LoggerOutput<LogFormat> {
      this.meta = { ...this.meta, ...meta }
      return this.logger.trace(message, this.meta)
    }
}
