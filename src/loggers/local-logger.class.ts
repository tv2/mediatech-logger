import { Format, Level, LoggerBase, LoggerBaseOptions, VaultKind } from '../logger'

export type LocalLoggerOptions = {
  level?: Level
  vault?: LoggerBaseOptions['vault']
}
export class LocalLogger extends LoggerBase {
  constructor(options: LocalLoggerOptions) {
    super({
      level: options.level ?? Level.trace,
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
