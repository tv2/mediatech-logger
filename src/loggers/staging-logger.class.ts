import { Format, Level, Logger } from '../logger'

export type StagingLoggerOptions = {
  level?: Level
}
export class StagingLogger extends Logger {
  constructor(options: StagingLoggerOptions) {
    super({
      level: options.level ?? Level.Info,
      format: {
        kind: Format.JSON,
        timestamp: true,
      },
    })
  }
}
