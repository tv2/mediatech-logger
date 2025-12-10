import { WebEnvironmentService } from '../services/web-environment-service'
import { EnvironmentLogger } from '../../../loggers'
import { Vault } from '../../../vault'
import {LogEnhancer} from '../../../log-enhancer'

export class WebEnvironmentLogger extends EnvironmentLogger {

  constructor(vaults: Vault[], logEnhancers: LogEnhancer[] = []) {
    const webEnvironmentService = new WebEnvironmentService()
    const environment = webEnvironmentService.getEnvironment()
    const level = webEnvironmentService.getLevel()

    super(vaults, logEnhancers, environment, level)
  }

}
