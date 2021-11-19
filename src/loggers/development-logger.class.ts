import { Format } from '../format'
import { LogLevel } from '../log-level'
import { Logger } from '../logger.class'

export type DevelopmentLoggerOptions = {
    level?: LogLevel
}
export class DevelopmentLogger extends Logger<{ [key: string]: any }> {
    constructor(options: DevelopmentLoggerOptions) {
        super({
            level: options.level ?? LogLevel.Debug,
            format: {
                kind: Format.Plaintext
            }
        })
    }
}