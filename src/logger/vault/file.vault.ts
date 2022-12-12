import { Vault, VaultBaseOptions } from './interface'
import { applyFormat, FormatOptions } from '../format'
import { Level, isValidLevel } from '../level'
import { Log } from '../log'
import { join } from 'path'
import * as fs from 'fs'
import { normalizeDate } from '../../utilities'

export type Options = {
  useRotation: boolean
  directory: string
  filename: string
}

export class FileVault implements Vault {
  format: FormatOptions
  level: Level
  options: Required<Options>

  filepath: string
  fileStream: fs.WriteStream

  constructor(options: Options & VaultBaseOptions) {
    this.format = options.format
    this.level = options.level
    this.options = {
      ...options,
      useRotation: options.useRotation,
    }
    this.ensureDirectory()
    this.filepath = this.generateFilepath()
    this.fileStream = this.generateFileStream(this.filepath)
  }

  setLevel(level: Level) {
    this.level = level
  }

  private ensureDirectory(): void {
    if (!fs.existsSync(this.options.directory)) {
      fs.mkdirSync(this.options.directory, { recursive: true })
    }
  }

  private generateFileStream(filepath: string): fs.WriteStream | never {
    if (this.fileStream) {
      this.fileStream.close()
    }
    return fs.createWriteStream(filepath, { flags: 'a' })
  }

  private generateFilepath(): string {
    const dateSuffix = this.options.useRotation ? `-${this.getDateString()}` : ''
    const filename = `${this.options.filename}${dateSuffix}.log`
    return join(this.options.directory, filename)
  }

  private getDateString(): string {
    const date = normalizeDate(new Date())
    const dateOfMonth = `0${date.getDate()}`.slice(-2)
    const month = `0${date.getMonth() + 1}`.slice(-2)
    const year = date.getFullYear().toString()
    return `${year}${month}${dateOfMonth}`
  }

  private setupFilepathAndStream(): void {
    this.filepath = this.generateFilepath()
    this.fileStream = this.generateFileStream(this.filepath)
  }

  private shouldRotateFilepath(): boolean {
    return this.options.useRotation && this.filepath !== this.generateFilepath()
  }

  store(log: Log): void {
    if (!isValidLevel(log.level, this.level)) {
      return
    }
    if (this.shouldRotateFilepath()) {
      this.setupFilepathAndStream()
    }
    const formattedLog = applyFormat(log, this.format)
    this.fileStream.write(formattedLog)
    this.fileStream.write('\n')
  }
}
