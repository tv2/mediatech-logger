import { Level } from '../level'

export function colorFromLevel(text: string, level?: Level): string {
  switch (level) {
    case Level.Error: return wrapInColor(text, '\x1b[31m')
    case Level.Warn: return wrapInColor(text, '\x1b[33m')
    case Level.Info: return wrapInColor(text, '\x1b[32m')
    case Level.Debug: return wrapInColor(text, '\x1b[36m')
    case Level.Trace: return wrapInColor(text, '\x1b[35m')
    default: return text
  }
}

function wrapInColor(text: string, color: string): string {
  return `${color}${text}\x1b[0m`
}

export function underscore(text: string): string {
  return `\x1b[4m${text}\x1b[0m`
}
