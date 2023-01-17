import { DateFormatter } from './date-formatter'

export class IsoDateFormatter extends DateFormatter {

  format(date: Date): string {
    return date.toISOString()
  }

}
