import { Level } from '../../../level'
import { Environment } from '../../../environment'
import { EnvironmentService } from '../../../services/environment.service'

export class WebEnvironmentService {

  private readonly environmentService: EnvironmentService

  constructor(environmentService: EnvironmentService = new EnvironmentService()) {
    this.environmentService = environmentService
  }

  public getLevel(): Level {
    const environment = this.getEnvironment()
    const fallbackLevel = this.environmentService.getEnvironmentLevel(environment)
    const rawLevel = this.getRawLevel()
    return this.environmentService.sanitizeLevel(rawLevel, fallbackLevel)
  }

  public getEnvironment(): Environment {
    const rawEnvironment = this.getRawEnvironment()
    return this.environmentService.sanitizeEnvironment(rawEnvironment)
  }

  private getRawEnvironment(): string {
    return window.env?.ENV?.toLowerCase() ?? ''

  }

  private getRawLevel(): string {
    return window.env?.LOG_LEVEL?.toLowerCase() ?? ''
  }

}
