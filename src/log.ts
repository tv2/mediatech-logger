import { Level } from './level'

export interface Log {
  level: Level,
  message: unknown,
  timestamp?: number,
  [key: string]: unknown,
}
