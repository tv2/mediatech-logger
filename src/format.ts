export enum DefaultFormat {
  json,
  plaintext,
}

export type Format = DefaultFormat | (() => void)
