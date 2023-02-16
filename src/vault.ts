import { Level } from './level'
import { Log } from './log'
import { Format } from './format'

export interface VaultOptions {
    level: Level,
    format: Format,
    isFormatLocked: boolean
}

export abstract class Vault {
  protected level: Level
  protected format: Format
  protected readonly isFormatLocked: boolean

  constructor({ level, format, isFormatLocked }: VaultOptions) {
    this.level = level
    this.format = format
    this.isFormatLocked = isFormatLocked
  }

    abstract store(log: Log): void

    protected shouldStore(log: Log): boolean {
      const logImportance = this.getLevelImportance(log.level)
      const logImportanceThreshold = this.getLevelImportance(this.level)
      return  logImportance >= logImportanceThreshold
    }

    private getLevelImportance(level: Level) {
      switch (level) {
      case Level.ERROR:
        return 4
      case Level.WARN:
        return 3
      case Level.INFO:
        return 2
      case Level.DEBUG:
        return 1
      case Level.TRACE:
        return 0
      }
    }

    public setLevel(level: Level): void {
      this.level = level
    }

    public setFormat(format: Format): void {
      if (this.isFormatLocked) {
        return
      }
      this.format = format
    }
}
