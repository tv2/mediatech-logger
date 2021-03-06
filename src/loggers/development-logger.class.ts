import { Format, Level, Logger, LoggerOptions, Vault } from '../logger'

export type DevelopmentLoggerOptions = {
  level?: Level
  vault?: LoggerOptions['vault']
}
export class DevelopmentLogger extends Logger {
  constructor(options: DevelopmentLoggerOptions) {
    super({
      level: options.level ?? Level.debug,
      format: {
        kind: Format.Plaintext,
        pretty: true,
        color: true,
      },
      vault: options.vault ?? {
        kind: Vault.Console,
      },
    })
  }
}
