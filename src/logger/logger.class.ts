import { Level } from './level'
import { Format, FormatOptions } from './format'
import { createVault, VaultOptions, IVault, Vault } from './vault'
import { ILogger } from './logger.interface'
import { LogContext } from './log-context.class'

export type LoggerOptions = {
  level: Level
  format: FormatOptions
  vault: VaultOptions | VaultOptions[]
}

export class Logger implements ILogger {
  vaults: IVault[]

  constructor(_options: Partial<LoggerOptions>) {
    const options = {
      level: _options.level ?? Level.Info,
      format: _options.format ?? {
        kind: Format.JSON,
        timestamp: true,
        pretty: true,
        depth: 3n,
      },
      vault: _options.vault ?? {
        kind: Vault.Console,
      },
    }
    this.vaults = this.prepareVaults(options)
  }

  // Attributes
  tag(tag: string): ILogger {
    const context = new LogContext(this)
    return context.tag(tag)
  }

  data(data: any): ILogger {
    const context = new LogContext(this)
    return context.data(data)
  }

  // Severity logging

  error(message: any, meta: object = {}): void {
    this.log(message, Level.Error, meta)
  }

  warn(message: any, meta: object = {}): void {
    this.log(message, Level.Warn, meta)
  }

  info(message: any, meta: object = {}): void {
    this.log(message, Level.Info, meta)
  }

  debug(message: any, meta: object = {}): void {
    this.log(message, Level.Debug, meta)
  }

  trace(message: any, meta: object = {}): void {
    this.log(message, Level.Trace, meta)
  }

  private log(message: any, level: Level, meta: object = {}): void {
    this.vaults.map((vault) => vault.store({ message, level, ...meta }))
  }

  // Helpers
  private prepareVaults(options: LoggerOptions): IVault[] {
    const vaultConfigs = options.vault instanceof Array ? options.vault : [options.vault]
    return vaultConfigs.map((config) =>
      createVault({
        ...config,
        level: config.level ?? options.level,
        format: (config.format ?? options.format)!,
      })
    )
  }
}
