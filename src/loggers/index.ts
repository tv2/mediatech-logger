import { isDevelopment, isProduction, isStaging } from "../environment"
import { LogLevel } from "../log-level"
import { DevelopmentLogger } from "./development-logger.class"
import { LocalLogger } from "./local-logger.class"
import { ProductionLogger } from "./production-logger.class"
import { StagingLogger } from "./staging-logger.class"

export const createDefaultLogger = (() => {
    const level = getLogLevel()
    switch (true) {
        case isProduction(): return new ProductionLogger({ level })
        case isStaging(): return new StagingLogger({ level })
        case isDevelopment(): return new DevelopmentLogger({ level })
        default: return new LocalLogger({ level })
    }
})

function getLogLevel(): LogLevel | undefined {
    switch (process.env.LOG_LEVEL?.toLowerCase()) {
        case 'error': return LogLevel.Error
        case 'warn': return LogLevel.Warn
        case 'info': return LogLevel.Info
        case 'debug': return LogLevel.Debug
        case 'trace': return LogLevel.Trace
        default: return undefined
    }
}

export * from './production-logger.class'
export * from './staging-logger.class'
export * from './development-logger.class'
export * from './local-logger.class'
