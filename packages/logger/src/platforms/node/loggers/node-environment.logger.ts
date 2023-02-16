import { NodeEnvironmentService } from '../services/node-environment-service'
import { EnvironmentLogger } from '../../../loggers'
import { Vault } from '../../../vault'

export class NodeEnvironmentLogger extends EnvironmentLogger {

  constructor(vaults: Vault[]) {
    const nodeEnvironmentService = new NodeEnvironmentService()
    const environment = nodeEnvironmentService.getEnvironment()
    const level = nodeEnvironmentService.getLevel()

    super(vaults, environment, level)
  }

}
