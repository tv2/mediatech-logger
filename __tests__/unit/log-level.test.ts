import { LogLevel, isValidLogLevel } from '../../src/log-level'

test('isValidLogLevel', () => {
    expect(isValidLogLevel(LogLevel.Error, LogLevel.Error)).toBeTruthy()
    expect(isValidLogLevel(LogLevel.Error, LogLevel.Warn)).toBeTruthy()
    expect(isValidLogLevel(LogLevel.Error, LogLevel.Info)).toBeTruthy()
    expect(isValidLogLevel(LogLevel.Error, LogLevel.Debug)).toBeTruthy()
    expect(isValidLogLevel(LogLevel.Error, LogLevel.Trace)).toBeTruthy()

    expect(isValidLogLevel(LogLevel.Warn, LogLevel.Error)).toBeFalsy()
    expect(isValidLogLevel(LogLevel.Warn, LogLevel.Warn)).toBeTruthy()
    expect(isValidLogLevel(LogLevel.Warn, LogLevel.Info)).toBeTruthy()
    expect(isValidLogLevel(LogLevel.Warn, LogLevel.Debug)).toBeTruthy()
    expect(isValidLogLevel(LogLevel.Warn, LogLevel.Trace)).toBeTruthy()

    expect(isValidLogLevel(LogLevel.Info, LogLevel.Error)).toBeFalsy()
    expect(isValidLogLevel(LogLevel.Info, LogLevel.Warn)).toBeFalsy()
    expect(isValidLogLevel(LogLevel.Info, LogLevel.Info)).toBeTruthy()
    expect(isValidLogLevel(LogLevel.Info, LogLevel.Debug)).toBeTruthy()
    expect(isValidLogLevel(LogLevel.Info, LogLevel.Trace)).toBeTruthy()

    expect(isValidLogLevel(LogLevel.Debug, LogLevel.Error)).toBeFalsy()
    expect(isValidLogLevel(LogLevel.Debug, LogLevel.Warn)).toBeFalsy()
    expect(isValidLogLevel(LogLevel.Debug, LogLevel.Info)).toBeFalsy()
    expect(isValidLogLevel(LogLevel.Debug, LogLevel.Debug)).toBeTruthy()
    expect(isValidLogLevel(LogLevel.Debug, LogLevel.Trace)).toBeTruthy()

    expect(isValidLogLevel(LogLevel.Trace, LogLevel.Error)).toBeFalsy()
    expect(isValidLogLevel(LogLevel.Trace, LogLevel.Warn)).toBeFalsy()
    expect(isValidLogLevel(LogLevel.Trace, LogLevel.Info)).toBeFalsy()
    expect(isValidLogLevel(LogLevel.Trace, LogLevel.Debug)).toBeFalsy()
    expect(isValidLogLevel(LogLevel.Trace, LogLevel.Trace)).toBeTruthy()
})