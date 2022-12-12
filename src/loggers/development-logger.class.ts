import { Format, Level, LoggerBase, LoggerBaseOptions, VaultKind } from '../logger'

export type DevelopmentLoggerOptions = {
  level?: Level
  vault?: LoggerBaseOptions['vault']
}
export class DevelopmentLogger extends LoggerBase {
  constructor(options: DevelopmentLoggerOptions) {
    super({
      level: options.level ?? Level.debug,
      format: {
        kind: Format.Plaintext,
        pretty: true,
        color: true,
      },
      vault: options.vault ?? {
        kind: VaultKind.Console,
      },
    })
  }
}
