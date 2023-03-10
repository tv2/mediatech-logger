import { NodeEnvironmentLogger } from './node-environment.logger'
import { ConsoleVault } from '../vaults'
import { Vault } from '../../../vault'
import { PlainTextFormat } from '../../../formats'
import { Level } from '../../../level'

export class DefaultLogger extends NodeEnvironmentLogger {

  constructor(maybeVaults?: Vault[]) {
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
