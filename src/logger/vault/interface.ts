import { FormatOptions } from '../format'
import { Level } from '../level'
import { Log } from '../log'

export interface IVault {
  format: FormatOptions
  level: Level
  store(log: Log): void
}

export type VaultBaseOptions = {
  format: FormatOptions
  level: Level
}
