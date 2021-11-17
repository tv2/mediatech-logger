export interface IStringifyOptions {
  depth?: bigint
}

/**
 * Returns a JSON string representation of any value.
 **/
export function stringify(item: any, options?: IStringifyOptions): string {
  const maxDepth = options?.depth ?? -1n
  return _stringify(item, maxDepth)
}

/**
 * Helper for recursive generation of JSON string.
 **/
function _stringify(item: any, depth: bigint): string {
  // Exit if reached max depth and is a collection
  const isCollection = Array.isArray(item) || (typeof item === 'object' && item !== null)
  if (depth === 0n && isCollection) {
    return '"<max-depth-reached>"'
  }
  // Array
  if (Array.isArray(item)) {
    const content = item.map((subitem) => _stringify(subitem, depth - 1n)).join(',')
    return `[${content}]`
  }
  // Object
  if (typeof item === 'object' && item !== null) {
    const content = Object.keys(item)
      .map((key) => `"${key}":${_stringify(item[key], depth - 1n)}`)
      .join(',')
    return `{${content}}`
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
