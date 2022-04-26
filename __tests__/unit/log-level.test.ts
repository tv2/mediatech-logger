import { Level, isValidLevel } from '../../src/logger/level'

test('isValidLevel', () => {
  expect(isValidLevel(Level.error, Level.error)).toBeTruthy()
  expect(isValidLevel(Level.error, Level.warn)).toBeTruthy()
  expect(isValidLevel(Level.error, Level.info)).toBeTruthy()
  expect(isValidLevel(Level.error, Level.debug)).toBeTruthy()
  expect(isValidLevel(Level.error, Level.trace)).toBeTruthy()

  expect(isValidLevel(Level.warn, Level.error)).toBeFalsy()
  expect(isValidLevel(Level.warn, Level.warn)).toBeTruthy()
  expect(isValidLevel(Level.warn, Level.info)).toBeTruthy()
  expect(isValidLevel(Level.warn, Level.debug)).toBeTruthy()
  expect(isValidLevel(Level.warn, Level.trace)).toBeTruthy()

  expect(isValidLevel(Level.info, Level.error)).toBeFalsy()
  expect(isValidLevel(Level.info, Level.warn)).toBeFalsy()
  expect(isValidLevel(Level.info, Level.info)).toBeTruthy()
  expect(isValidLevel(Level.info, Level.debug)).toBeTruthy()
  expect(isValidLevel(Level.info, Level.trace)).toBeTruthy()

  expect(isValidLevel(Level.debug, Level.error)).toBeFalsy()
  expect(isValidLevel(Level.debug, Level.warn)).toBeFalsy()
  expect(isValidLevel(Level.debug, Level.info)).toBeFalsy()
  expect(isValidLevel(Level.debug, Level.debug)).toBeTruthy()
  expect(isValidLevel(Level.debug, Level.trace)).toBeTruthy()

  expect(isValidLevel(Level.trace, Level.error)).toBeFalsy()
  expect(isValidLevel(Level.trace, Level.warn)).toBeFalsy()
  expect(isValidLevel(Level.trace, Level.info)).toBeFalsy()
  expect(isValidLevel(Level.trace, Level.debug)).toBeFalsy()
  expect(isValidLevel(Level.trace, Level.trace)).toBeTruthy()
})
