import { Format } from '../format'
import { Log } from '../log'
import { DateFormatter } from '../services/date-formatter'
import { JsonEncoder } from '../services/json-encoder'
import { TypeSpecifier } from '../services/type-specifier'
import { IsoDateFormatter } from '../services/iso-date-formatter'

export class PlainTextFormat extends Format {

  private readonly typeSpecifier = new TypeSpecifier()
  private readonly dateFormatter: DateFormatter
  private readonly jsonEncoder = new JsonEncoder({ isPretty: true })

  constructor(dateFormatter?: DateFormatter) {
    super()
    this.dateFormatter = dateFormatter ?? new IsoDateFormatter()
  }

  apply(log: Log): string {
    const timestamp = this.getTimestamp(log)
    const severity = this.getSeverity(log)
    const tag = this.getTag(log)
    const message = this.getMessage(log)
    const data = this.getData(log)
    return `${ timestamp }${ severity }${ tag }: ${message}${data}`
  }

  protected getTimestamp(log: Log): string {
    const timestamp = log.timestamp ?? Date.now()
    const formattedTimestamp = this.dateFormatter.formatTimestamp(timestamp)
    return `[${ formattedTimestamp }]`
  }

  protected getSeverity(log: Log): string {
    return `[${log.level}]`
  }

  protected getTag(log: Log): string {
    if (!log.tag) {
      return ''
    }

    return `<${ log.tag }>`
  }

  protected getMessage(log: Log): string {
    return this.convertUnknownToString(log.message)
  }

  protected convertUnknownToString(value: unknown): string {
    if (this.typeSpecifier.isString(value)) {
      return value
    }

    if (this.typeSpecifier.isObject(value) || this.typeSpecifier.isArray(value)) {
      return this.jsonEncoder.encode(value)
    }

    return String(value)
  }

  protected getData(log: Log): string {
    if (!this.hasData(log)) {
      return ''
    }
    const data = this.convertUnknownToString(log.data)
    return `\n${ data }`
  }

  protected hasData(log: Log): boolean {
    return 'data' in log
  }

}
