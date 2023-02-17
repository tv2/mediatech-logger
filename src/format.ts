import { Log } from './log'

export abstract class Format {
  abstract apply(log: Log): string
}
