import { Level, isValidLevel } from '../../src/logger/level'

test('isValidLevel', () => {
  expect(isValidLevel(Level.Error, Level.Error)).toBeTruthy()
  expect(isValidLevel(Level.Error, Level.Warn)).toBeTruthy()
  expect(isValidLevel(Level.Error, Level.Info)).toBeTruthy()
  expect(isValidLevel(Level.Error, Level.Debug)).toBeTruthy()
  expect(isValidLevel(Level.Error, Level.Trace)).toBeTruthy()

  expect(isValidLevel(Level.Warn, Level.Error)).toBeFalsy()
  expect(isValidLevel(Level.Warn, Level.Warn)).toBeTruthy()
  expect(isValidLevel(Level.Warn, Level.Info)).toBeTruthy()
  expect(isValidLevel(Level.Warn, Level.Debug)).toBeTruthy()
  expect(isValidLevel(Level.Warn, Level.Trace)).toBeTruthy()

  expect(isValidLevel(Level.Info, Level.Error)).toBeFalsy()
  expect(isValidLevel(Level.Info, Level.Warn)).toBeFalsy()
  expect(isValidLevel(Level.Info, Level.Info)).toBeTruthy()
  expect(isValidLevel(Level.Info, Level.Debug)).toBeTruthy()
  expect(isValidLevel(Level.Info, Level.Trace)).toBeTruthy()

  expect(isValidLevel(Level.Debug, Level.Error)).toBeFalsy()
  expect(isValidLevel(Level.Debug, Level.Warn)).toBeFalsy()
  expect(isValidLevel(Level.Debug, Level.Info)).toBeFalsy()
  expect(isValidLevel(Level.Debug, Level.Debug)).toBeTruthy()
  expect(isValidLevel(Level.Debug, Level.Trace)).toBeTruthy()

  expect(isValidLevel(Level.Trace, Level.Error)).toBeFalsy()
  expect(isValidLevel(Level.Trace, Level.Warn)).toBeFalsy()
  expect(isValidLevel(Level.Trace, Level.Info)).toBeFalsy()
  expect(isValidLevel(Level.Trace, Level.Debug)).toBeFalsy()
  expect(isValidLevel(Level.Trace, Level.Trace)).toBeTruthy()
})
