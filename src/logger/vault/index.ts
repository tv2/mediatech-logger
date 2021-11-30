import { IVault, VaultBaseOptions } from './interface'
export * from './interface'

import * as ConsoleVault from './console.vault'
import * as FileVault from './file.vault'

export enum Vault {
  Console,
  File,
}

export type VaultOptions = (
  | ({ kind: Vault.Console } & ConsoleVault.Options)
  | ({ kind: Vault.File } & FileVault.Options)
) &
  Partial<VaultBaseOptions>

export function createVault(options: Required<VaultOptions>): IVault {
  switch (options.kind) {
    case Vault.Console:
      return new ConsoleVault.ConsoleVault(options)
    case Vault.File:
      return new FileVault.FileVault(options)
  }
}
