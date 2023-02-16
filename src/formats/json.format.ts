import { Format } from '../format'
import { Log } from '../log'
import { JsonEncoder } from '../services/json-encoder'

export interface JsonFormatOptions {
    isPretty: boolean
}

export class JsonFormat extends Format {

  private readonly jsonEncoder: JsonEncoder

  constructor(options: JsonFormatOptions) {
    super()
    this.jsonEncoder = new JsonEncoder(options)
  }

  apply(log: Log): string {
    return this.jsonEncoder.encode(log)
  }

}
