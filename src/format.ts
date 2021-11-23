import { stringify } from './utilities/stringify'
import { Log } from './log.interface'
import { LogLevel } from './log-level'

export enum Format {
  JSON,
  Plaintext,
  Custom,
}
export type Formatter<T> = (log: Log, options: FormatOptions<T>) => T

export type FormatOptions<T> = {
  depth?: bigint
  timestamp?: boolean
  prettyJSON?: boolean
} & (
  | {
      kind: Exclude<Format, Format.Custom>
    }
  | {
      kind: Format.Custom
      format: Formatter<T>
    }
)

export function applyFormat<T>(log: Log, options: FormatOptions<T>): T | string {
  switch (options.kind) {
    case Format.JSON:
      return applyJSONFormat(log, options)
    case Format.Plaintext:
      return applyPLAINTEXTFormat(log, options)
    case Format.Custom:
      return options.format(log, options)
  }
}

function applyJSONFormat<T>(log: Log, options: FormatOptions<T>): T | string {
  const timestamp = options.timestamp ?? false
  return stringify(
    {
      ...log,
      level: LogLevel[log.level].toLowerCase(),
      ...(timestamp ? { timestamp: applyDateFormat(new Date()) } : null),
    },
    { depth: options.depth ?? -1n }
  )
}

function stringifyData<T>(data: any, options: FormatOptions<T>): string {
  return typeof data === 'object' ? stringify(data, { depth: options.depth ?? -1n, pretty: options.prettyJSON ?? false }) : `${data}`
}

function applyPLAINTEXTFormat<T>(log: any, options: FormatOptions<T>): T | string {
  const timestamp = options.timestamp ?? false
  const hasTag = log.tag !== undefined
  let result = `[${LogLevel[log.level].toLowerCase()}]`
  if (timestamp) {
    result += `[${applyDateFormat(new Date())}]`
  }
  if (hasTag) {
    result += `<${log.tag}>`
  }
  result += `: ${stringifyData(log.message, options)}`
  if (log.data) {
    result += `\n${stringifyData(log.data, options)}`
  }
  return result
}

function applyDateFormat(date: Date) {
  return date.toISOString()
}
