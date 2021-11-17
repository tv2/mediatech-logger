import { isDevelop } from "./environment"
import { LogContext } from './log-context.class'
import { ILogger } from './logger.interface'
import { LogLevels } from "./logLevels"

enum DefaultFormat {
  json,
  plaintext,
}

export type LoggerOptions = {
  level: LogLevels
  format: Format
  time: boolean
  colour: boolean
  depth: number
}

type Format = DefaultFormat | (() => void)

const defaultOptions: LoggerOptions = {
  level: LogLevels.debug,
  format: DefaultFormat.json,
  time: true,
  colour: false,
  depth: 3
}
class Logger implements ILogger {

  private options: LoggerOptions

  constructor(options: Partial<LoggerOptions>) {
    this.options = { ...defaultOptions, ...options }
  }

  tag(tag: string): ILogger {
    const logContext = new LogContext<Logger>(this)
    return logContext.tag(tag)
  }

  error(data: any) {
    this.log(data, LogLevels.error)
  }

  warn(data: any) {
    this.log(data, LogLevels.warning)
  }

  info(data: any, meta: object = {}) {
    this.log(data, LogLevels.info, meta)
  }

  debug(data: any) {
    this.log(data, LogLevels.debug)
  }

  trace(data: any) {
    this.log(data, LogLevels.trace)
  }

  private log(data: any, logLevel: LogLevels, meta: object = {}) {
    if (this.options.level > logLevel) {

    }
    console.log({ message: data, ...meta })
  }
}



class DevLogger extends Logger {
  constructor() {
    super({
      level: LogLevels.trace,
      format: DefaultFormat.plaintext,
      colour: false
    })
  } 
}