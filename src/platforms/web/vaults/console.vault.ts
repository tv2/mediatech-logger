import { Vault } from '../../../vault'
import { Log } from '../../../log'
import { Level } from '../../../level'

export class ConsoleVault extends Vault {

  store(log: Log): void {
    if (!this.shouldStore(log)) {
      return
    }
    const formattedLog = this.format.apply(log)
    this.printLog(formattedLog, log.level)
  }

  private printLog(message: string, level: Level): void {
    const messageWithNewline = this.suffixNewlineIfNotThere(message)
    const write = this.getWrite(level)
    write(messageWithNewline)
  }

  private suffixNewlineIfNotThere(text: string): string {
    return text.replace(/\n?$/, '\n')
  }

  private getWrite(level: Level): (message: string) => void {
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
