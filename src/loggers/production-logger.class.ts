import { Format, Level, Logger, LoggerOptions, Vault } from '../logger'

export type ProductionLoggerOptions = {
  level?: Level
  vault?: LoggerOptions['vault']
}
export class ProductionLogger extends Logger {
  constructor(options: ProductionLoggerOptions) {
    super({
      level: options.level ?? Level.warn,
      format: {
        kind: Format.JSON,
        timestamp: true,
      },
      vault: options.vault ?? {
        kind: Vault.Console,
      },
    })
  }
}
