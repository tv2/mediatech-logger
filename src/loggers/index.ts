import { isDevelopment, isLocal, isProduction, isStage } from "../environment"
import { DevelopmentLogger } from "./development-logger.class"
import { LocalLogger } from "./local-logger.class"
import { ProductionLogger } from "./production-logger.class"
import { StageLogger } from "./stage-logger.class"

export const createDefaultLogger = (() => {
    switch (true) {
        case isProduction: return new ProductionLogger()
        case isStage: return new StageLogger()
        case isDevelopment: return new DevelopmentLogger()
        case isLocal: return new LocalLogger()
        default: throw new Error('Unkown environment for logging.')
    }
})

export * from './production-logger.class'
export * from './stage-logger.class'
export * from './development-logger.class'
export * from './local-logger.class'
