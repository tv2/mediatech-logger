import { Format, Level, LoggerBase, LoggerBaseOptions, VaultKind } from '../logger'

export type ProductionLoggerOptions = {
  level?: Level
  vault?: LoggerBaseOptions['vault']
}
export class ProductionLogger extends LoggerBase {
  constructor(options: ProductionLoggerOptions) {
    super({
      level: options.level ?? Level.warn,
      format: {
        kind: Format.JSON,
        timestamp: true,
      },
      vault: options.vault ?? {
        kind: VaultKind.Console,
      },
    })
  }
}
