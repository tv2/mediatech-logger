import { isDevelopment, isProduction, isStaging } from '../environment'
import { Level, LoggerOptions } from '../logger'
import { DevelopmentLogger } from './development-logger.class'
import { LocalLogger } from './local-logger.class'
import { ProductionLogger } from './production-logger.class'
import { StagingLogger } from './staging-logger.class'

export type DefaultLoggerOptions = {
  vault?: LoggerOptions['vault']
}

export const createDefaultLogger = ({ vault }: DefaultLoggerOptions = {}) => {
  const level = getLevel()
  switch (true) {
    case isProduction():
      return new ProductionLogger({ level, vault })
    case isStaging():
      return new StagingLogger({ level, vault })
    case isDevelopment():
      return new DevelopmentLogger({ level, vault })
    default:
      return new LocalLogger({ level, vault })
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
