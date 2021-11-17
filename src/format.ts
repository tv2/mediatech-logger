import { stringify } from "./utilities/stringify"
import { Log } from "./log.interface"
import { LogLevel } from "./log-level"

export enum Format {
  JSON,
  PLAINTEXT,
  CUSTOM,
}
export type Formatter<T> = ((log: Log, options: FormatOptions<T>) => T)

export type FormatOptions<T> = {
  depth?: bigint,
  timestamp?: boolean
} & ({
  kind: Exclude<Format, Format.CUSTOM> 
} | {
  kind: Format.CUSTOM,
  format: Formatter<T>
})

export function executeFormat<T>(log: Log, options: FormatOptions<T>) {
  switch (options.kind) {
    case Format.JSON: return executeJSONFormat(log, options)
    case Format.PLAINTEXT: return executePLAINTEXTFormat(log, options)
    case Format.CUSTOM: return options.format(log, options)
  }
}

function executeJSONFormat<T>(log: Log, options: FormatOptions<T>) {
  const timestamp = options.timestamp ?? false
  return stringify({
    ...log,
    level: LogLevel[log.level].toLowerCase(),
    ...(timestamp ? { timestamp: log.timestamp ?? new Date() } : null)
  }, { depth: options.depth ?? -1n })
}

function executePLAINTEXTFormat<T>(log: any, options: FormatOptions<T>) {
  const timestamp = options.timestamp ?? false
  return `[${LogLevel[log.level].toLowerCase()}]${timestamp ? '[' + Date.now() + ']' : ''}: ${log.data}`
}