import { Format, Level, LoggerBase, LoggerBaseOptions, VaultKind } from '../logger'

export type StagingLoggerOptions = {
  level?: Level
  vault?: LoggerBaseOptions['vault']
}
export class StagingLogger extends LoggerBase {
  constructor(options: StagingLoggerOptions) {
    super({
      level: options.level ?? Level.info,
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
