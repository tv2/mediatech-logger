import { EnvironmentLogger, Vault } from '@tv2media/logger'
import { WebEnvironmentService } from '../services/web-environment-service'

export class WebEnvironmentLogger extends EnvironmentLogger {

    constructor(vaults: Vault[]) {
        const webEnvironmentService = new WebEnvironmentService()
        const environment = webEnvironmentService.getEnvironment()
        const level = webEnvironmentService.getLevel()

        super(vaults, environment, level)
    }

}
