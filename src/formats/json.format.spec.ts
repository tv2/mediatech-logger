import { JsonFormat, JsonFormatOptions } from './json.format'
import { Log } from '../log'
import { Level } from '../level'

describe('JsonFormat', () => {
  describe('when log has timestamp set to epoch timestamp', () => {
    it('it includes the timestamp attribute formatted as ISO-8601 with UTC timezone', () => {
      const timestamp = 1731912859428
      const log: Log = {
        level: Level.INFO,
        message: '',
        timestamp,
      }
      const testee: JsonFormat = createTestee()

      const result: string = testee.apply(log)

      expect(result).toMatch('"timestamp":"2024-11-18T06:54:19.428Z"')
    })
  })
})

function createTestee(options: Partial<JsonFormatOptions> = {}): JsonFormat {
  return new JsonFormat({
    isPretty: false,
    ...options,
  })
}
