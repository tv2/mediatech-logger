import { Level } from './level'
import { Format, FormatOptions } from './format'
import { createVault, VaultOptions, Vault, VaultKind } from './vault'
import { Logger } from './logger.interface'
import { LogContext } from './log-context.class'

export type LoggerBaseOptions = {
  level: Level
  format: FormatOptions
  vault: VaultOptions | VaultOptions[]
}

export class LoggerBase implements Logger {
  vaults: Vault[]

  constructor(_options: Partial<LoggerBaseOptions>) {
    const options: LoggerBaseOptions = {
      level: _options.level ?? Level.info,
      format: _options.format ?? {
        kind: Format.JSON,
        timestamp: true,
        pretty: true,
        depth: 3n,
      },
      vault: _options.vault ?? {
        kind: VaultKind.Console,
      },
    }
    this.vaults = this.prepareVaults(options)
  }

  // Level
  setLevel = (level: Level): void => {
    this.vaults.forEach((vault) => vault.setLevel(level))
  }

  // Attributes
  tag = (tag: string): Logger => {
    const context = new LogContext(this)
    return context.tag(tag)
  }

  data = (data: any): Logger => {
    const context = new LogContext(this)
    return context.data(data)
  }

  meta = (meta: object): Logger => {
    const context = new LogContext(this)
    return context.meta(meta)
  }

  // Severity logging

  error = (message: any, meta: object = {}): void => {
    this.log(message, Level.error, meta)
  }

  warn = (message: any, meta: object = {}): void => {
    this.log(message, Level.warn, meta)
  }

  info = (message: any, meta: object = {}): void => {
    this.log(message, Level.info, meta)
  }

  debug = (message: any, meta: object = {}): void => {
    this.log(message, Level.debug, meta)
  }

  trace = (message: any, meta: object = {}): void => {
    this.log(message, Level.trace, meta)
  }

  private log(message: any, level: Level, meta: object = {}): void {
    this.vaults.forEach((vault) => vault.store({ message, level, ...meta }))
  }

  // Helpers
  private prepareVaults(options: LoggerBaseOptions): Vault[] {
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
