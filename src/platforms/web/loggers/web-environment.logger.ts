import { WebEnvironmentService } from '../services/web-environment-service'
import { EnvironmentLogger } from '../../../loggers'
import { Vault } from '../../../vault'

export class WebEnvironmentLogger extends EnvironmentLogger {

    constructor(vaults: Vault[]) {
        const webEnvironmentService = new WebEnvironmentService()
        const environment = webEnvironmentService.getEnvironment()
        const level = webEnvironmentService.getLevel()

        super(vaults, environment, level)
    }

}
