import { NodeEnvironmentService } from '../services/node-environment-service'
import { Vault } from '../../../vault'
import { EnvironmentLogger } from '../../../loggers'

export class NodeEnvironmentLogger extends EnvironmentLogger {

  constructor(vaults: Vault[]) {
    const nodeEnvironmentService = new NodeEnvironmentService()
    const environment = nodeEnvironmentService.getEnvironment()
    const level = nodeEnvironmentService.getLevel()

    super(vaults, environment, level)
  }

}
