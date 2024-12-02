import { Format } from '../format'
import { Log } from '../log'
import { JsonEncoder } from '../services/json-encoder'
import { DateFormatter } from '../services/date-formatter'
import { IsoDateFormatter } from '../services/iso-date-formatter'

export interface JsonFormatOptions {
  isPretty: boolean
}

export class JsonFormat extends Format {

  private readonly jsonEncoder: JsonEncoder
  private readonly dateFormatter: DateFormatter

  constructor(options: JsonFormatOptions) {
    super()
    this.jsonEncoder = new JsonEncoder(options)
    this.dateFormatter = new IsoDateFormatter()
  }

  public apply(log: Log): string {
    return this.jsonEncoder.encode({
      ...log,
      timestamp: this.getFormattedTimestamp(log.timestamp)

    })
  }

  private getFormattedTimestamp(timestamp: unknown): string {
    if (typeof timestamp === 'number') {
      return this.dateFormatter.formatTimestamp(timestamp)
    }
    if (!timestamp) {
      return this.dateFormatter.formatTimestamp(Date.now())
    }
    return `${timestamp}`
  }

}
