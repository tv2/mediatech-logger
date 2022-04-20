import { Level } from './level'

export interface ILogger {
  error: (message: any, meta?: object) => void
  warn: (message: any, meta?: object) => void
  info: (message: any, meta?: object) => void
  debug: (message: any, meta?: object) => void
  trace: (message: any, meta?: object) => void
  tag: (tag: string) => ILogger
  data: (data: any) => ILogger
  setLevel(level: Level): void
}
