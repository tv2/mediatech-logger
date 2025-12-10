import { NodeEnvironmentService } from '../services/node-environment-service'
import { Vault } from '../../../vault'
import { EnvironmentLogger } from '../../../loggers'
import { LogEnhancer } from '../../../log-enhancer'

export class NodeEnvironmentLogger extends EnvironmentLogger {

  constructor(vaults: Vault[], logEnhancers: LogEnhancer[] = []) {
    const nodeEnvironmentService = new NodeEnvironmentService()
    const environment = nodeEnvironmentService.getEnvironment()
    const level = nodeEnvironmentService.getLevel()

    super(vaults, logEnhancers, environment, level)
  }

}
