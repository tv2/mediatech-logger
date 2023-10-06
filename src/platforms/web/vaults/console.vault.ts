import { Vault } from '../../../vault'
import { Log } from '../../../log'
import { Level } from '../../../level'

export class ConsoleVault extends Vault {

  store(log: Log): void {
    if (!this.shouldStore(log)) {
      return
    }
    const { data, ...logWithoutData }: Log = log
    const formattedLog = this.format.apply(logWithoutData)
    this.printLog(formattedLog, log.level, data)
  }

  private printLog(message: string, level: Level, data?: unknown): void {
    const messageWithNewline = this.suffixNewlineIfNotThere(message)
    const write = this.getWrite(level)
    write(messageWithNewline, data)
  }

  private suffixNewlineIfNotThere(text: string): string {
    return text.replace(/\n?$/, '\n')
  }

  private getWrite(level: Level): (message: unknown, data?: unknown) => void {
    switch (level) {
      case Level.ERROR:
        return console.error
      case Level.WARN:
        return console.warn
      case Level.INFO:
      case Level.DEBUG:
      case Level.TRACE:
        return console.log
    }
  }
}
