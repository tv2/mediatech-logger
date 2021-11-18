import { Format } from '../format'
import { LogLevel } from '../log-level'
import { Logger } from '../logger.class'

export class StagingLogger extends Logger<{ [key: string]: any }> {
    constructor() {
        super({
            level: LogLevel.Info,
            format: {
                kind: Format.JSON,
                timestamp: true,
            }
        })
    }
}