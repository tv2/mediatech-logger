export interface IVault<T> {
    options: VaultOptions
    store(log: T): void
}

export type VaultOptions = {
    kind: Vault
}

export enum Vault {
    Console
}

export function createVault<T>(options: VaultOptions): IVault<T> {
    switch (options.kind) {
        case Vault.Console: return new ConsoleVault(options)
    }
}

export class ConsoleVault<T> implements IVault<T> {
    
    options: VaultOptions

    constructor(options: VaultOptions) {
        this.options = options
    }

    store(log: T): void {
        console.log(log)
    }    
}