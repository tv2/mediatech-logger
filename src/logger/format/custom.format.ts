import { Log } from '../log'

export type Formatter = (log: Log, options: Options) => string

export type Options = {
  format: Formatter
  [key: string]: any
}

export function applyFormat(log: any, options: Options): string {
  return options.format(log, options)
}
