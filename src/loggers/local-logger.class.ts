import { Format, Level, Logger } from '../logger'

export type LocalLoggerOptions = {
  level?: Level
}
export class LocalLogger extends Logger {
  constructor(options: LocalLoggerOptions) {
    super({
      level: options.level ?? Level.Trace,
      format: {
        kind: Format.Plaintext,
        pretty: true,
      },
    })
  }
}
