import { Format, Level, Logger, LoggerOptions, Vault } from '../logger'

export type DevelopmentLoggerOptions = {
  level?: Level
  vault?: LoggerOptions['vault']
}
export class DevelopmentLogger extends Logger {
  constructor(options: DevelopmentLoggerOptions) {
    super({
      level: options.level ?? Level.Debug,
      format: {
        kind: Format.Plaintext,
        pretty: true,
      },
      vault: options.vault ?? {
        kind: Vault.Console,
      },
    })
  }
}
