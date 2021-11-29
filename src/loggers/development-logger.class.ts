import { Format, Level, Logger } from '../logger'

export type DevelopmentLoggerOptions = {
  level?: Level
}
export class DevelopmentLogger extends Logger {
  constructor(options: DevelopmentLoggerOptions) {
    super({
      level: options.level ?? Level.Debug,
      format: {
        kind: Format.Plaintext,
        pretty: true,
      },
    })
  }
}
