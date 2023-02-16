export type SafeFunction = (...args: unknown[]) => unknown

export class TypeSpecifier {

  public isUndefined(data: unknown): data is undefined {
    return data === undefined
  }

  public isNull(data: unknown): data is null {
    return data === null
  }

  public isNumber(data: unknown): data is number {
    return typeof data === 'number'
  }

  public isString(data: unknown): data is string {
    return typeof data === 'string'
  }

  public isBigInt(data: unknown): data is bigint {
    return typeof data === 'bigint'
  }

  public isError(data: unknown): data is Error {
    return data instanceof Error
  }

  public isFunction(data: unknown): data is SafeFunction {
    return typeof data === 'function'
  }

  public isArray(data: unknown): data is unknown[] {
    return Array.isArray(data)
  }

  public isObject(data: unknown): data is object {
    return typeof data === 'object' && !this.isNull(data) && !this.hasImplementedToString(data)
  }

  private hasImplementedToString(data: object): boolean {
    return !data.toString().toLowerCase().startsWith('[object ')
  }

}
