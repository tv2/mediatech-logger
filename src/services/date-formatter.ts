
export abstract class DateFormatter {

  abstract format(date: Date): string

  public formatTimestamp(timestamp: number): string {
    return this.format(new Date(timestamp))
  }

}
