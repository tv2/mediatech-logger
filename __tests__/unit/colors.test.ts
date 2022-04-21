import { colorFromLevel, underscore } from '../../src/logger/format/colors'
import { Level } from '../../src'

test('colorFromLevel', () => {
  const text = 'hello world'
  const resetColor = '\x1b[0m'
  expect(colorFromLevel(text, undefined)).toBe(text)
  expect(colorFromLevel(text, Level.error)).toBe('\x1b[31m' + text + resetColor)
  expect(colorFromLevel(text, Level.warn)).toBe('\x1b[33m' + text + resetColor)
  expect(colorFromLevel(text, Level.info)).toBe('\x1b[32m' + text + resetColor)
  expect(colorFromLevel(text, Level.debug)).toBe('\x1b[36m' + text + resetColor)
  expect(colorFromLevel(text, Level.trace)).toBe('\x1b[35m' + text + resetColor)
})

test('colorFromLevel', () => {
  const text = 'hello world'
  const resetColor = '\x1b[0m'
  expect(underscore(text)).toBe('\x1b[4m' + text + resetColor)
})
