import { Format } from '../format'
import { LogLevel } from '../log-level'
import { Logger } from '../logger.class'

export type ProductionLoggerOptions = {
    level?: LogLevel
}
export class ProductionLogger extends Logger<{ [key: string]: any }> {
    constructor(options: ProductionLoggerOptions) {
        super({
            level: options.level ?? LogLevel.Warn,
            format: {
                kind: Format.JSON,
                timestamp: true,
            }
        })
    }
}