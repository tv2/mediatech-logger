import { Format, Level, Logger, LoggerOptions, Vault } from '../logger'

export type LocalLoggerOptions = {
  level?: Level
  vault?: LoggerOptions['vault']
}
export class LocalLogger extends Logger {
  constructor(options: LocalLoggerOptions) {
    super({
      level: options.level ?? Level.trace,
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
