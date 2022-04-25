import { colorFromLevel, underscore } from '../../src/logger/format/colors'
import { Level } from '../../src/'
import { ConsoleColor } from '../../src/logger/format/colors'

test('colorFromLevel', () => {
  const text = 'hello world'
  const resetColor = '\x1b[0m'
  expect(colorFromLevel(text, undefined)).toBe(text)
  expect(colorFromLevel(text, Level.error)).toBe(ConsoleColor.red + text + resetColor)
  expect(colorFromLevel(text, Level.warn)).toBe(ConsoleColor.yellow + text + resetColor)
  expect(colorFromLevel(text, Level.info)).toBe(ConsoleColor.green + text + resetColor)
  expect(colorFromLevel(text, Level.debug)).toBe(ConsoleColor.cyan + text + resetColor)
  expect(colorFromLevel(text, Level.trace)).toBe(ConsoleColor.magenta + text + resetColor)
})

test('colorFromLevel', () => {
  const text = 'hello world'
  const resetColor = '\x1b[0m'
  expect(underscore(text)).toBe('\x1b[4m' + text + resetColor)
})
