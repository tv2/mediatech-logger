import { PlainTextFormat } from './plain-text.format'
import { Log } from '../log'
import { Level } from '../level'

export enum ConsoleColor {
    RED = '\x1b[31m',
    YELLOW = '\x1b[33m',
    GREEN = '\x1b[32m',
    CYAN = '\x1b[36m',
    MAGENTA = '\x1b[35m',
}

const CLEAR_FORMATTING = '\x1b[0m'

export class ColoredPlainTextFormat extends PlainTextFormat {

  protected getSeverity(log: Log): string {
    const color = this.getSeverityColor(log.level)
    return `[${ color }${ log.level }${ CLEAR_FORMATTING }]`
  }

  private getSeverityColor(level: Level): string {
    switch (level) {
    case Level.ERROR:
      return ConsoleColor.RED
    case Level.WARN:
      return ConsoleColor.YELLOW
    case Level.INFO:
      return ConsoleColor.GREEN
    case Level.DEBUG:
      return ConsoleColor.CYAN
    case Level.TRACE:
      return ConsoleColor.MAGENTA
    }
  }

}
