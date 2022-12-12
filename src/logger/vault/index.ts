import { Vault, VaultBaseOptions } from './interface'
export * from './interface'

import * as ConsoleVault from './console.vault'
import * as FileVault from './file.vault'

export enum VaultKind {
  Console,
  File,
}

export type VaultOptions = (
  | ({ kind: VaultKind.Console } & ConsoleVault.Options)
  | ({ kind: VaultKind.File } & FileVault.Options)
) &
  Partial<VaultBaseOptions>

export function createVault(options: Required<VaultOptions>): Vault {
  switch (options.kind) {
    case VaultKind.Console:
      return new ConsoleVault.ConsoleVault(options)
    case VaultKind.File:
      return new FileVault.FileVault(options)
  }
}
