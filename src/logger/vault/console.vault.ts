import { IVault, VaultBaseOptions } from './interface'
import { FormatOptions, applyFormat } from '../format'
import { Level, isValidLevel } from '../level'
import { Log } from '../log'

export type Options = {}

export class ConsoleVault implements IVault {
  format: FormatOptions
  level: Level

  constructor(options: Options & VaultBaseOptions) {
    this.format = options.format
    this.level = options.level
  }

  setLevel(level: Level) {
    this.level = level
  }

  store(log: Log): void {
    if (isValidLevel(log.level, this.level)) {
      const formattedLog = applyFormat(log, this.format)
      process.stdout.write(formattedLog + '\n')
    }
  }
}
