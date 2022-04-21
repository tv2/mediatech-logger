import { Level } from '../level'

export function colorFromLevel(text: string, level?: Level): string {
  switch (level) {
    case Level.error:
      return wrapInColor(text, '\x1b[31m')
    case Level.warn:
      return wrapInColor(text, '\x1b[33m')
    case Level.info:
      return wrapInColor(text, '\x1b[32m')
    case Level.debug:
      return wrapInColor(text, '\x1b[36m')
    case Level.trace:
      return wrapInColor(text, '\x1b[35m')
    default:
      return text
  }
}

function wrapInColor(text: string, color: string): string {
  return `${color}${text}\x1b[0m`
}

export function underscore(text: string): string {
  return `\x1b[4m${text}\x1b[0m`
}
