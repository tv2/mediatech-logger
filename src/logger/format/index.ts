import * as JSONFormat from './json.format'
import * as PlaintextFormat from './plaintext.format'
import * as CustomFormat from './custom.format'

export enum Format {
  JSON,
  Plaintext,
  Custom,
}

export type FormatOptions =
  | ({ kind: Format.JSON } & JSONFormat.Options)
  | ({ kind: Format.Plaintext } & PlaintextFormat.Options)
  | ({ kind: Format.Custom } & CustomFormat.Options)

export function applyFormat(log: any, options: FormatOptions): string {
  switch (options.kind) {
    case Format.JSON:
      return JSONFormat.applyFormat(log, options)
    case Format.Plaintext:
      return PlaintextFormat.applyFormat(log, options)
    case Format.Custom:
      return CustomFormat.applyFormat(log, options)
  }
}

export { Formatter } from './custom.format'
