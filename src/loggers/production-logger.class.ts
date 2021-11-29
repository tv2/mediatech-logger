import { Format, Level, Logger } from '../logger'

export type ProductionLoggerOptions = {
  level?: Level
}
export class ProductionLogger extends Logger {
  constructor(options: ProductionLoggerOptions) {
    super({
      level: options.level ?? Level.Warn,
      format: {
        kind: Format.JSON,
        timestamp: true,
      },
    })
  }
}
