export interface StringifyOptions {
  depth: bigint
  pretty: boolean
  tabWidth: bigint
}

/**
 * Returns a JSON string representation of any value.
 **/
export function stringify(item: any, options: Partial<StringifyOptions> = {}): string {
  const depth = options.depth ?? -1n
  const pretty = options.pretty ?? false
  const tabWidth = options.tabWidth ?? 2n
  return _stringify(item, depth, { depth, pretty, tabWidth })
}

/**
 * Helper for recursive generation of JSON string.
 * @param depthCapacity Specifies how many levels further we can go down into an object.
 **/
function _stringify(item: any, depthCapacity: bigint, options: StringifyOptions): string {
  // Exit if reached max depth and is a collection
  const isCollection = Array.isArray(item) || (typeof item === 'object' && item !== null)
  if (depthCapacity === 0n && isCollection) {
    return '"<max-depth-reached>"'
  }
  // Error
  if (item instanceof Error) {
    const content = (item.stack ?? item.toString()).replace(/"/g, '\\"')
    return `"${content}"`
  }
  // Array
  if (Array.isArray(item)) {
    const content = item.map((subitem) => _stringify(subitem, depthCapacity - 1n, options)).join(',')
    return `[${content}]`
  }
  // Object
  if (typeof item === 'object' && item !== null && !hasImplementedToString(item)) {
    const baseIndent = options.pretty ? indentObject(options.depth - depthCapacity, options.tabWidth) : ''
    const indent = options.pretty ? indentObject(1n + options.depth - depthCapacity, options.tabWidth) : ''
    const keySpace = options.pretty ? ' ' : ''
    const newline = options.pretty ? '\n' : ''
    const content = Object.keys(item)
      .map((key) => `${indent}"${key}":${keySpace}${_stringify(item[key], depthCapacity - 1n, options)}`)
      .join(`,${newline}`)
    return `{${newline}${content}${newline}${baseIndent}}`
  }
  if (typeof item === 'function') {
    return 'undefined'
  }
  // BigInt
  if (typeof item === 'bigint') {
    return item.toString()
  }
  // String
  if (typeof item === 'string') {
    const content = item.replace(/"/g, '\\"')
    return `"${content}"`
  }
  // Fallback
  return String(item)
}

function hasImplementedToString(object: object): boolean {
  return !object.toString().toLowerCase().startsWith('[object ')
}

function indentObject(level: bigint, tabWidth: bigint = 2n) {
  return ' '.repeat(Number(tabWidth * level))
}
