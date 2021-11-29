import { Level } from './level'
export type Log = {
  level: Level
  message: any
  timestamp?: number
  [key: string]: any
}
