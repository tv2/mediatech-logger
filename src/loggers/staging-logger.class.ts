import { Format } from '../format'
import { LogLevel } from '../log-level'
import { Logger } from '../logger.class'

export type StagingLoggerOptions = {
    level?: LogLevel
}
export class StagingLogger extends Logger<{ [key: string]: any }> {
    constructor(options: StagingLoggerOptions) {
        super({
            level: options.level ?? LogLevel.Info,
            format: {
                kind: Format.JSON,
                timestamp: true,
            }
        })
    }
}