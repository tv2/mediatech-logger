import { Level } from './level'

export interface Log {
  level: Level,
  message: unknown,
  [key: string]: unknown,
}
