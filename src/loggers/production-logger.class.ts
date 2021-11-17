import { Format } from '../format'
import { LogLevel } from '../log-level'
import { Logger } from '../logger.class'

export class ProductionLogger extends Logger<{ [key: string]: any }> {
    constructor() {
        super({
            level: LogLevel.Warn,
            format: {
                kind: Format.JSON
            }
        })
    }
}