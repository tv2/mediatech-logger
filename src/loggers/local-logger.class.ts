import { Format } from '../format'
import { LogLevel } from '../log-level'
import { Logger } from '../logger.class'

export class LocalLogger extends Logger<{ [key: string]: any }> {
    constructor() {
        super({
            level: LogLevel.Trace,
            format: {
                kind: Format.Plaintext
            }
        })
    }
}