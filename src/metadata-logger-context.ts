import { Logger } from './logger'
import { Level } from './level'

export class MetadataLoggerContext extends Logger {

  private readonly logger: Logger
  public readonly _metadata: object

  constructor(logger: Logger, metadata: object) {
    super()
    this.logger = logger
    this._metadata = metadata
  }

  public error(message: unknown, metadata: object = {}): void {
    this.logger.error(message, this.getMetadata(metadata))
  }
  public warn(message: unknown, metadata: object = {}): void {
    this.logger.warn(message, this.getMetadata(metadata))
  }

  public info(message: unknown, metadata: object = {}): void {
    this.logger.info(message, this.getMetadata(metadata))
  }

  public debug(message: unknown, metadata: object = {}): void {
    this.logger.debug(message, this.getMetadata(metadata))
  }

  public trace(message: unknown, metadata: object = {}): void {
    this.logger.trace(message, this.getMetadata(metadata))
  }

  public metadata(metadata: object): MetadataLoggerContext {
    return new MetadataLoggerContext(this.logger, this.getMetadata(metadata))
  }

  private getMetadata(metadata: object): object {
    return { ...this._metadata, ...metadata }
  }

  public tag(tag: string): MetadataLoggerContext {
    return this.metadata({ tag })
  }

  public data(data: unknown): MetadataLoggerContext {
    return this.metadata({ data })
  }

  public setLevel(level: Level): void {
    this.logger.setLevel(level)
  }

}
