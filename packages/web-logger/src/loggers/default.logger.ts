import { WebEnvironmentLogger } from './web-environment.logger'
import { ConsoleVault } from '../vaults'
import { Level, PlainTextFormat } from '@tv2media/logger'

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
