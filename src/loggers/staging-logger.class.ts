import { Format, Level, Logger, LoggerOptions, Vault } from '../logger'

export type StagingLoggerOptions = {
  level?: Level
  vault?: LoggerOptions['vault']
}
export class StagingLogger extends Logger {
  constructor(options: StagingLoggerOptions) {
    super({
      level: options.level ?? Level.info,
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
