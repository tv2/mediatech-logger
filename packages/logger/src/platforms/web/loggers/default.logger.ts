import { WebEnvironmentLogger } from './web-environment.logger'
import { ConsoleVault } from '../vaults'
import { Level } from '../../../level'
import { PlainTextFormat } from '../../../formats'

export class DefaultLogger extends WebEnvironmentLogger {

    constructor(maybeVaults?: []) {
        const vaults = maybeVaults ?? [
            new ConsoleVault({
                level: Level.TRACE,
                format: new PlainTextFormat(),
                isFormatLocked: false,
            })
        ]
        super(vaults)
    }

}
