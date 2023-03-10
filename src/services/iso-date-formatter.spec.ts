import { IsoDateFormatter } from './iso-date-formatter'

describe('IsoDateFormatter', () => {

  describe('format', () => {

    it('returns correct format when Date(0)', () => {
      const dateFormatter = createIsoDateFormatter()
      const date = new Date(0)

      const formattedDate = dateFormatter.format(date)

      expect(formattedDate).toBe('1970-01-01T00:00:00.000Z')
    })

    it('returns correct format when Date("2023-01-14T12:13:14.156Z")', () => {
      const dateFormatter = createIsoDateFormatter()
      const dateStr = '2023-01-02T12:13:14.156Z'
      const date = new Date(dateStr)

      const formattedDate = dateFormatter.format(date)

      expect(formattedDate).toBe(dateStr)
    })

  })

  describe('formatTimestamp', () => {

    it('returns correct format when Date(0)', () => {
      const dateFormatter = createIsoDateFormatter()
      const date = new Date(0).getTime()

      const formattedDate = dateFormatter.formatTimestamp(date)

      expect(formattedDate).toBe('1970-01-01T00:00:00.000Z')
    })

    it('returns correct format when Date("2023-01-14T12:13:14.156Z")', () => {
      const dateFormatter = createIsoDateFormatter()
      const dateStr = '2023-01-02T12:13:14.156Z'
      const date = new Date(dateStr).getTime()

      const formattedDate = dateFormatter.formatTimestamp(date)

      expect(formattedDate).toBe(dateStr)
    })

  })

})

function createIsoDateFormatter(): IsoDateFormatter {
  return new IsoDateFormatter()
}
