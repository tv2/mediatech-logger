import { NodeEnvironmentLogger } from './node-environment.logger'
import { ConsoleVault } from '../vaults'
import { Level, PlainTextFormat, Vault } from '@tv2media/logger'

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
