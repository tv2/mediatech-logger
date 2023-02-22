import { Level } from '../../../level'
import { Environment } from '../../../environment'
import { EnvironmentService } from '../../../services/environment.service'

export class NodeEnvironmentService {

  private readonly environmentService: EnvironmentService

  constructor(environmentService: EnvironmentService) {
    this.environmentService = environmentService
  }

  public getLevel(): Level {
    const environment = this.getEnvironment()
    const fallbackLevel = this.environmentService.getEnvironmentLevel(environment)
    const rawLevel = this.getRawLevel()
    return this.environmentService.sanitizeLevel(rawLevel, fallbackLevel)
  }

  private getRawLevel(): string {
    return process.env.LOG_LEVEL?.toLowerCase() ?? ''
  }

  public getEnvironment(): Environment {
    const rawEnvironment = this.getRawEnvironment()
    return this.environmentService.sanitizeEnvironment(rawEnvironment)
  }

  private getRawEnvironment(): string {
    return process.env.NODE_ENV?.toLowerCase() ?? ''
  }

}
