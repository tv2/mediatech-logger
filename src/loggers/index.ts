import { isDevelopment, isProduction, isStaging } from '../environment'
import { Level } from '../logger'
import { DevelopmentLogger } from './development-logger.class'
import { LocalLogger } from './local-logger.class'
import { ProductionLogger } from './production-logger.class'
import { StagingLogger } from './staging-logger.class'

export const createDefaultLogger = () => {
  const level = getLevel()
  switch (true) {
    case isProduction():
      return new ProductionLogger({ level })
    case isStaging():
      return new StagingLogger({ level })
    case isDevelopment():
      return new DevelopmentLogger({ level })
    default:
      return new LocalLogger({ level })
  }
}

function getLevel(): Level | undefined {
  switch (process.env.LOG_LEVEL?.toLowerCase()) {
    case 'error':
      return Level.Error
    case 'warn':
      return Level.Warn
    case 'info':
      return Level.Info
    case 'debug':
      return Level.Debug
    case 'trace':
      return Level.Trace
    default:
      return undefined
  }
}

export * from './production-logger.class'
export * from './staging-logger.class'
export * from './development-logger.class'
export * from './local-logger.class'
