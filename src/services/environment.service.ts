import { Environment } from '../environment'
import { Level } from '../level'

export class EnvironmentService {

  public sanitizeEnvironment(rawEnvironment: string): Environment {
    switch (rawEnvironment.toLowerCase()) {
      case 'prod':
      case 'production':
        return Environment.PRODUCTION
      case 'stage':
      case 'staging':
        return Environment.STAGING
      case 'dev':
      case 'development':
        return Environment.DEVELOPMENT
      default:
        return Environment.LOCAL
    }
  }

  public sanitizeLevel(rawLevel: string, fallbackLevel: Level): Level {
    switch (rawLevel.toLowerCase()) {
      case 'error':
        return Level.ERROR
      case 'warn':
        return Level.WARN
      case 'info':
        return Level.INFO
      case 'debug':
        return Level.DEBUG
      case 'trace':
        return Level.TRACE
      default:
        return fallbackLevel
    }
  }

  public getEnvironmentLevel(environment: Environment): Level {
    switch (environment) {
      case Environment.PRODUCTION:
        return Level.WARN
      case Environment.STAGING:
        return Level.INFO
      case Environment.DEVELOPMENT:
        return Level.DEBUG
      case Environment.LOCAL:
        return Level.TRACE
    }
  }

}
