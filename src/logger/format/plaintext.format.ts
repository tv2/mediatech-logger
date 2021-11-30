import { stringify } from '../../utilities/stringify'
import { Level } from '../level'
import { applyDateFormat } from './utilities'

export type Options = {
  timestamp?: boolean
  // JSON related
  depth?: bigint
  pretty?: boolean
  tabWidth?: bigint
}

export function applyFormat(log: any, _options: Options): string {
  const options: Required<Options> = {
    timestamp: _options.timestamp ?? true,
    depth: _options.depth ?? -1n,
    pretty: _options.pretty ?? false,
    tabWidth: _options.tabWidth ?? 2n,
  }
  const severity = `[${Level[log.level].toLowerCase()}]`
  const timestamp = options.timestamp ? `[${applyDateFormat(new Date())}]` : ''
  const tag = log.tag ? `<${log.tag}>` : ''
  const message = stringifyAny(log.message, options)
  const data = log.data ? `\n${stringifyAny(log.data, options)}` : ''
  const preColon = [timestamp, severity, tag].filter((e) => e).join(' ')
  return `${preColon}: ${message}${data}`
}

function stringifyAny(data: any, options: Required<Options>): string {
  return typeof data === 'object'
    ? stringify(data, {
        depth: options.depth,
        pretty: options.pretty,
        tabWidth: options.tabWidth,
      })
    : `${data}`
}