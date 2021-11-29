import { Level } from '../level'
import { stringify } from '../../utilities/stringify'
import { applyDateFormat } from './utilities'

export type Options = {
  timestamp?: boolean
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
  return stringify(
    {
      ...log,
      level: Level[log.level].toLowerCase(),
      ...(options.timestamp ? { timestamp: applyDateFormat(new Date()) } : null),
    },
    {
      depth: options.depth,
      pretty: options.pretty,
      tabWidth: options.tabWidth,
    }
  )
}
