import { Format } from '../format'
import { LogLevel } from '../log-level'
import { Logger } from '../logger.class'

export class DevelopmentLogger extends Logger<{ [key: string]: any }> {
    constructor() {
        super({
            level: LogLevel.Debug,
            format: {
                kind: Format.Plaintext
            }
        })
    }
}