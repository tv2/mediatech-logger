import { Level } from './level'
import { MethodBinder } from './services/method-binder'

export abstract class Logger {

  static methodBinder = new MethodBinder()

  protected constructor() {
    Logger.methodBinder.bind(this)
  }

    abstract error(message: unknown, metadata?: object): void
    abstract warn(message: unknown, metadata?: object): void
    abstract info(message: unknown, metadata?: object): void
    abstract debug(message: unknown, metadata?: object): void
    abstract trace(message: unknown, metadata?: object): void

    abstract metadata(metadata: object): Logger
    abstract tag(tag: string): Logger
    abstract data(data: unknown): Logger

    abstract setLevel(level: Level): void

}
