export interface IVault<T> {
    options: VaultOptions
    store(log: T): void | T | string
}

export type VaultOptions = {
    kind: Vault
}

export enum Vault {
    Console,
    Raw,
}

export function createVault<T>(options: VaultOptions): IVault<T> {
    switch (options.kind) {
        case Vault.Console: return new ConsoleVault(options)
        case Vault.Raw: return new RawVault(options)
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

export class RawVault<T> implements IVault<T> {
    
    options: VaultOptions

    constructor(options: VaultOptions) {
        this.options = options
    }

    store(log: T): T | string {
        return log
    }
}