import { Logger } from './logger'
import { Log } from './log'
import { Level } from './level'
import { Vault } from './vault'
import { MetadataLoggerContext } from './metadata-logger-context'

export class LoggerBase extends Logger {

  protected readonly vaults: Vault[]

  constructor(vaults: Vault[]) {
    super()
    this.vaults = vaults
  }

  public error(message: unknown, metadata: object = {}): void {
    this.log(message, Level.ERROR, metadata)
  }

  public warn(message: unknown, metadata: object = {}): void {
    this.log(message, Level.WARN, metadata)
  }

  public info(message: unknown, metadata: object = {}): void {
    this.log(message, Level.INFO, metadata)
  }

  public debug(message: unknown, metadata: object = {}): void {
    this.log(message, Level.DEBUG, metadata)
  }

  public trace(message: unknown, metadata: object = {}): void  {
    this.log(message, Level.TRACE, metadata)
  }

  private log(message: unknown, level: Level, metadata: object): void {
    const log: Log = {
      ...metadata,
      level,
      message,
    }
    this.vaults.forEach(vault => vault.store(log))
  }

  public metadata(metadata: object): Logger {
    return new MetadataLoggerContext(this, metadata)
  }

  public tag(tag: string): Logger {
    return this.metadata({ tag })
  }

  public data(data: unknown): Logger {
    return this.metadata({ data })
  }

  public setLevel(level: Level): void {
    this.vaults.forEach(vault => vault.setLevel(level))
  }

}
