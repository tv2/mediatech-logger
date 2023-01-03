import { isDevelopment, isProduction, isStaging } from '../environment'
import { Level, LoggerBaseOptions } from '../logger'
import { DevelopmentLogger } from './development-logger.class'
import { LocalLogger } from './local-logger.class'
import { ProductionLogger } from './production-logger.class'
import { StagingLogger } from './staging-logger.class'

export type DefaultLoggerOptions = {
  vault?: LoggerBaseOptions['vault']
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
      return Level.error
    case 'warn':
      return Level.warn
    case 'info':
      return Level.info
    case 'debug':
      return Level.debug
    case 'trace':
      return Level.trace
    default:
      return undefined
  }
}

export * from './production-logger.class'
export * from './staging-logger.class'
export * from './development-logger.class'
export * from './local-logger.class'
