import { EnvironmentLogger, Vault } from '@tv2media/logger'
import { NodeEnvironmentService } from '../services/node-environment-service'

export class NodeEnvironmentLogger extends EnvironmentLogger {

  constructor(vaults: Vault[]) {
    const nodeEnvironmentService = new NodeEnvironmentService()
    const environment = nodeEnvironmentService.getEnvironment()
    const level = nodeEnvironmentService.getLevel()

    super(vaults, environment, level)
  }

}
