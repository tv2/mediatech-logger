import { Level } from '../../../level'
import { Environment } from '../../../environment'

export class NodeEnvironmentService {

  public getLevel(): Level {
    const rawLevel = this.getRawLevel()
    switch (rawLevel) {
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
        return this.getEnvironmentLevel()
    }
  }

  private getRawLevel(): string {
    return process.env.LOG_LEVEL?.toLowerCase() ?? ''
  }

  public getEnvironmentLevel(): Level {
    const environment = this.getEnvironment()
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

  public getEnvironment(): Environment {
    const rawEnvironment = process.env.NODE_ENV?.toLowerCase()
    switch (rawEnvironment) {
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

}