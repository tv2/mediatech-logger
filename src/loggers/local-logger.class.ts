import { Format } from '../format'
import { LogLevel } from '../log-level'
import { Logger } from '../logger.class'

export type LocalLoggerOptions = {
    level?: LogLevel
}
export class LocalLogger extends Logger<{ [key: string]: any }> {
    constructor(options: LocalLoggerOptions) {
        super({
            level: options.level ?? LogLevel.Trace,
            format: {
                kind: Format.Plaintext
            }
        })
    }
}