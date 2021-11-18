import { isDevelopment, isProduction, isStaging } from "../environment"
import { DevelopmentLogger } from "./development-logger.class"
import { LocalLogger } from "./local-logger.class"
import { ProductionLogger } from "./production-logger.class"
import { StagingLogger } from "./staging-logger.class"

export const createDefaultLogger = (() => {
    switch (true) {
        case isProduction(): return new ProductionLogger()
        case isStaging(): return new StagingLogger()
        case isDevelopment(): return new DevelopmentLogger()
        default: return new LocalLogger()
    }
})

export * from './production-logger.class'
export * from './staging-logger.class'
export * from './development-logger.class'
export * from './local-logger.class'