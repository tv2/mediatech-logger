import { Format, Level, VaultOptions, Log, Vault } from '@tv2media/logger'
import * as fs from 'fs'
import { join } from 'path'

export interface ConsoleVaultOptions extends VaultOptions {
    level: Level,
    format: Format,
    directory: string,
    fileName: string,
    useRotation: boolean,
}

export class FileVault extends Vault {

  private readonly directory: string
  private readonly fileName: string
  private readonly useRotation: boolean
  private fileStream: fs.WriteStream
  private filePath: string

  constructor(options: ConsoleVaultOptions) {
    super(options)
    this.directory = options.directory
    this.fileName = options.fileName
    this.useRotation = options.useRotation
    this.filePath = this.getFilePath(this.directory, this.fileName, this.useRotation)
    this.fileStream = this.setupFileStream(this.filePath)
  }

  private setupFileStream(filePath: string): fs.WriteStream {
    return fs.createWriteStream(filePath, { flags: 'a' })
  }

  private getFilePath(directory: string, rawFileName: string, useRotation: boolean): string {
    const dateSuffix = this.getDateSuffix(useRotation)
    const fileName = `${ rawFileName }${ dateSuffix }.log`
    return join(directory, fileName)
  }

  private getDateSuffix(useRotation: boolean): string {
    return useRotation ? `-${ this.getFormattedDate(new Date()) }` : ''
  }

  private getFormattedDate(date: Date): string {
    const year = date.getFullYear().toString()
    const month = `0${ date.getMonth().toString() }`.slice(-2)
    const dateOfMonth = `0${ date.getDate().toString() }`.slice(-2)
    return `${ year }${ month }${ dateOfMonth }`
  }

  store(log: Log): void {
    if (!this.shouldStore(log)) {
      return
    }

    if (this.shouldRotateFile()) {
      this.rotateLogFile()
    }

    const formattedLog = this.format.apply(log)
    this.writeToFile(formattedLog)
  }

  private shouldRotateFile(): boolean {
    if (!this.useRotation) {
      return false
    }

    const newFilePath = this.getFilePath(this.directory, this.fileName, this.useRotation)
    return this.filePath !== newFilePath
  }

  private rotateLogFile(): void {
    this.closeFileStreamIfOpen()
    this.filePath = this.getFilePath(this.directory, this.fileName, this.useRotation)
    this.fileStream = this.setupFileStream(this.filePath)
  }

  private closeFileStreamIfOpen(): void {
    if (!this.fileStream.closed) {
      this.fileStream.close()
    }
  }

  private writeToFile(text: string): void {
    if (this.fileStream.closed) {
      this.rotateLogFile()
    }
    const textWithNewline = this.addNewlineSuffixIfNeeded(text)
    this.fileStream.write(textWithNewline)
  }

  private addNewlineSuffixIfNeeded(text: string): string {
    return text.replace(/\n*$/, '\n')
  }

}
