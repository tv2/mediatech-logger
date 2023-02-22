import { SafeFunction, TypeSpecifier } from './type-specifier'

const INDENTATION_WIDTH = 2n

export interface JsonEncoderOptions {
  isPretty: boolean
}

export class JsonEncoder {

  private readonly typeSpecifier = new TypeSpecifier()
  private readonly isPretty: boolean

  constructor({ isPretty }: JsonEncoderOptions) {
    this.isPretty = isPretty
  }

  public encode(data: unknown): string {
    const depth = 0n
    return this.encodeRecursively(data, depth, [])
  }

  private encodeRecursively(data: unknown, depth: bigint, seenReferences: unknown[]): string {
    if (this.typeSpecifier.isString(data)) {
      return this.encodeString(data, depth)
    }

    if (this.typeSpecifier.isError(data)) {
      return this.encodeError(data, depth)
    }

    if (this.typeSpecifier.isBigInt(data)) {
      return this.encodeBigInt(data, depth)
    }

    if (this.typeSpecifier.isFunction(data)) {
      return this.encodeFunction(data, depth)
    }

    if (this.typeSpecifier.isArray(data)) {
      return this.encodeArray(data, depth, seenReferences)
    }

    if (this.typeSpecifier.isObject(data)) {
      return this.encodeObject(data, depth, seenReferences)
    }

    const indentation = this.getIndentationIfPretty(depth)
    return `${ indentation }${ data }`
  }

  private encodeString(text: string, depth: bigint): string {
    return this.isPretty ? this.encodeStringPretty(text, depth) : this.encodeStringUgly(text)
  }

  private encodeStringPretty(text: string, depth: bigint): string {
    const escapedText = this.escapeString(text)
    const indentation = this.getIndentation(depth)
    return `${ indentation }"${ escapedText }"`
  }

  private escapeString(text: string): string {
    return text
        .replace(/"/g, '\\"')
        .replace(/\0/g, '\\0')
  }

  private encodeStringUgly(text: string): string {
    const escapedText = this.escapeString(text)
      .replace(/\r/g, '\\r')
      .replace(/\n/g, '\\n')
    return `"${ escapedText }"`
  }


  private encodeError(error: Error, depth: bigint): string {
    const text = error.stack ?? error.toString()
    return `${ this.encodeString(text, depth) }`
  }

  private encodeBigInt(number: bigint, depth: bigint): string {
    const indentation = this.getIndentationIfPretty(depth)
    return `${ indentation }${ number }`
  }

  private encodeFunction(_: SafeFunction, depth: bigint): string {
    const indentation = this.getIndentationIfPretty(depth)
    return `${ indentation }undefined`
  }

  private encodeArray(array: unknown[], depth: bigint, seenReferences: unknown[]): string {
    if (this.isPretty) {
      return this.encodeArrayPretty(array, depth, [...seenReferences, array])
    }
    return this.encodeArrayUgly(array, depth, [...seenReferences, array])
  }

  private encodeArrayPretty(array: unknown[], depth: bigint, seenReferences: unknown[]): string {
    const text = array
      .filter(data => !seenReferences.includes(data))
      .map(data => this.encodeRecursively(data, depth + 1n, seenReferences))
      .join(',\n')
    const indentation = this.getIndentation(depth)
    return text.trim().length > 0 ? `${ indentation }[\n${ text }\n${ indentation }]` : '[]'
  }

  private encodeArrayUgly(array: unknown[], depth: bigint, seenReferences: unknown[]): string {
    const text = array
      .filter(data => !seenReferences.includes(data))
      .map(data => this.encodeRecursively(data, depth + 1n, seenReferences)).join(',')
    return `[${ text }]`
  }

  private encodeObject(data: object, depth: bigint, seenReferences: unknown[]): string {
    if (this.isPretty) {
      return this.encodeObjectPretty(data, depth, [...seenReferences, data])
    }
    return this.encodeObjectUgly(data, depth, [...seenReferences, data])
  }

  private encodeObjectPretty(data: object, depth: bigint, seenReferences: unknown[]): string {
    const entries = Object.entries(data)
    const content = entries
      .filter(([, value]) => !this.isCyclic(value, seenReferences))
      .map(([key, value]) => this.encodeObjectEntryPretty(key, value, depth + 1n, seenReferences))
      .join(',\n')

    const indentation = this.getIndentation(depth)

    if (!content) {
      return `${ indentation }{${ content }}`
    }

    return `${ indentation }{\n${ content }\n${ indentation }}`
  }

  private encodeObjectEntryPretty(key: string, value: unknown, depth: bigint, seenReferences: unknown[]): string {
    const encodedValue = this.encodeRecursively(value, depth, seenReferences)
      .replace(/^ */, '')
    const indentation = this.getIndentation(depth)
    return `${indentation}"${key}": ${encodedValue}`
  }

  private encodeObjectUgly(data: object, depth: bigint, seenReferences: unknown[]): string {
    const entries = Object.entries(data)
    const content = entries
      .filter(([, value]) => !this.isCyclic(value, seenReferences))
      .map(([key, value]) => this.encodeObjectEntryUgly(key, value, depth + 1n, seenReferences))
      .join(',')
    return `{${ content }}`
  }

  private encodeObjectEntryUgly(key: string, value: unknown, depth: bigint, seenReferences: unknown[]): string {
    const encodedValue = this.encodeRecursively(value, depth, seenReferences)
    return `"${key}":${encodedValue}`
  }

  private getIndentationIfPretty(depth: bigint): string {
    if (!this.isPretty) {
      return ''
    }
    return this.getIndentation(depth)
  }

  private getIndentation(depth: bigint): string {
    const width = Number(depth * INDENTATION_WIDTH)
    return ' '.repeat(width)
  }

  private isCyclic(value: unknown, seenReferences: unknown[]): boolean {
    return typeof value === 'object' && seenReferences.includes(value)
  }

}
