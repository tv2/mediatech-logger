import { Level } from '../level'

export enum ConsoleColor {
  red = '\x1b[31m',
  yellow = '\x1b[33m',
  green = '\x1b[32m',
  cyan = '\x1b[36m',
  magenta = '\x1b[35m',
}

export function colorFromLevel(text: string, level?: Level): string {
  switch (level) {
    case Level.error:
      return wrapInColor(text, ConsoleColor.red)
    case Level.warn:
      return wrapInColor(text, ConsoleColor.yellow)
    case Level.info:
      return wrapInColor(text, ConsoleColor.green)
    case Level.debug:
      return wrapInColor(text, ConsoleColor.cyan)
    case Level.trace:
      return wrapInColor(text, ConsoleColor.magenta)
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
