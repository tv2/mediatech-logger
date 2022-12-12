import { Level } from './level'

export interface Logger {
  error: (message: any, meta?: object) => void
  warn: (message: any, meta?: object) => void
  info: (message: any, meta?: object) => void
  debug: (message: any, meta?: object) => void
  trace: (message: any, meta?: object) => void
  meta: (meta: object) => Logger
  tag: (tag: string) => Logger
  data: (data: any) => Logger
  setLevel(level: Level): void
}
