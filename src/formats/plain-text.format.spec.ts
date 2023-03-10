import { PlainTextFormat } from './plain-text.format'
import { Level } from '../level'
import { Log } from '../log'
import { DateFormatter } from '../services/date-formatter'
import { anything, instance, mock, reset, verify, when } from 'ts-mockito'

const mockDateFormatter = mock<DateFormatter>()

describe('PlainTextFormat', () => {

  beforeAll(() => jest.useFakeTimers())
  afterAll(() => jest.useRealTimers())

  beforeEach(resetMocks)

  describe('apply', () => {

    beforeEach(() => {
      when(mockDateFormatter.formatTimestamp(anything())).thenReturn('<date>')
    })

    it('formats empty string message', () => {
      const format = createPlainTextFormat()
      const log = createLog(Level.INFO, '')

      const formattedLog = format.apply(log)

      expect(formattedLog).toBe('[<date>][info]: ')
    })

    it('formats string message', () => {
      const format = createPlainTextFormat()
      const log = createLog(Level.INFO, 'hello world')

      const formattedLog = format.apply(log)

      expect(formattedLog).toBe('[<date>][info]: hello world')
    })

    it('formats array message', () => {
      const format = createPlainTextFormat()
      const log = createLog(Level.INFO, [1,2,3,4])

      const formattedLog = format.apply(log)

      expect(formattedLog).toBe('[<date>][info]: [\n  1,\n  2,\n  3,\n  4\n]')
    })

    it('formats object message', () => {
      const format = createPlainTextFormat()
      const log = createLog(Level.INFO, { hello: 'world' })

      const formattedLog = format.apply(log)

      expect(formattedLog).toBe('[<date>][info]: {\n  "hello": "world"\n}')
    })


    it('formats log with empty string data', () => {
      const format = createPlainTextFormat()
      const data = ''
      const log = createLog(Level.INFO, 'hello world', { data })

      const formattedLog = format.apply(log)

      expect(formattedLog).toBe('[<date>][info]: hello world\n')
    })

    it('formats log with string data', () => {
      const format = createPlainTextFormat()
      const data = 'hello new world'
      const log = createLog(Level.INFO, 'hello world', { data })

      const formattedLog = format.apply(log)

      expect(formattedLog).toBe('[<date>][info]: hello world\nhello new world')
    })

    it('formats low with array data', () => {
      const format = createPlainTextFormat()
      const data = [1,2,3,4]
      const log = createLog(Level.INFO, 'hello world', { data })

      const formattedLog = format.apply(log)

      expect(formattedLog).toBe('[<date>][info]: hello world\n[\n  1,\n  2,\n  3,\n  4\n]')
    })

    it('formats log with object data', () => {
      const format = createPlainTextFormat()
      const data = { hello: 'world' }
      const log = createLog(Level.INFO, 'hello world', { data })

      const formattedLog = format.apply(log)

      expect(formattedLog).toBe('[<date>][info]: hello world\n{\n  "hello": "world"\n}')
    })

    it('formats log with tag', () => {
      const format = createPlainTextFormat()
      const tag = 'my-tag'
      const log = createLog(Level.INFO, 'hello world', { tag })

      const formattedLog = format.apply(log)

      expect(formattedLog).toBe('[<date>][info]<my-tag>: hello world')
    })

    it('creates a timestamp when no timestamp in log', () => {
      const date = new Date('1970-1-2')
      jest.setSystemTime(date)
      const format = createPlainTextFormat()
      const log = createLog(Level.INFO, 'message')

      format.apply(log)

      verify(mockDateFormatter.formatTimestamp(Date.now())).once()
    })

    it('uses timestamp from log when present', () => {
      const format = createPlainTextFormat()
      const log = createLog(Level.INFO, 'message', { timestamp: 0 })

      format.apply(log)

      verify(mockDateFormatter.formatTimestamp(0)).once()
    })

  })

})

function resetMocks(): void {
  reset(mockDateFormatter)
}

function createPlainTextFormat(): PlainTextFormat {
  return new PlainTextFormat(instance(mockDateFormatter))
}

function createLog(level: Level, message: unknown, metadata: object = {}): Log {
  return {
    ...metadata,
    level,
    message
  }
}
