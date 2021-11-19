import { Environment, environment, isLocal, isProduction } from "../../src/environment"
import { createDefaultLogger, LogLevel } from "../../src/"


describe('Test environment', () => {
  const ENV = process.env

  beforeEach(() => {
    jest.resetModules()
    process.env = { ...ENV }
  })

  afterAll(() => {
    process.env = ENV
  })

  test('Test env prod', () => {
    process.env.NODE_ENV = 'production'
    expect(isProduction()).toBeTruthy()
    expect(createDefaultLogger()).toMatchObject({ options: { level: LogLevel.Warn } })

  })

  test('Test env stage', () => {
    process.env.NODE_ENV = 'stage'
    expect(environment()).toEqual(Environment.Staging)
    expect(createDefaultLogger()).toMatchObject({ options: { level: LogLevel.Info } })
  })

  test('Test env develop', () => {
    process.env.NODE_ENV = 'develop'
    expect(environment()).toEqual(Environment.Development)
    expect(createDefaultLogger()).toMatchObject({ options: { level: LogLevel.Debug } })
  })

  test('Test env undefined', () => {
    process.env.NODE_ENV = undefined
    expect(environment()).toEqual(Environment.Local)
    expect(createDefaultLogger()).toMatchObject({ options: { level: LogLevel.Trace } })
  })

  test('Test env staging', () => {
    process.env.NODE_ENV = 'staging'
    expect(environment()).toEqual(Environment.Staging)
    expect(createDefaultLogger()).toMatchObject({ options: { level: LogLevel.Info } })
  })

  test('Test env development', () => {
    process.env.NODE_ENV = 'development'
    expect(environment()).toEqual(Environment.Development)
    expect(createDefaultLogger()).toMatchObject({ options: { level: LogLevel.Debug } })
  })

  test('Test env local', () => {
    process.env.NODE_ENV = 'local'
    expect(isLocal()).toBeTruthy()
    expect(createDefaultLogger()).toMatchObject({ options: { level: LogLevel.Trace } })
  })
})

describe('Test environment', () => {
  const ENV = process.env

  beforeEach(() => {
    jest.resetModules()
    process.env = { ...ENV }
  })

  afterAll(() => {
    process.env = ENV
  })

  test('Test env prod info', () => {
    process.env.NODE_ENV = 'production'
    process.env.LOG_LEVEL = 'info'
    expect(createDefaultLogger()).toMatchObject({ options: { level: LogLevel.Info } })
  })

  test('Test env stage', () => {
    process.env.NODE_ENV = 'stage'
    process.env.LOG_LEVEL = 'debug'
    expect(createDefaultLogger()).toMatchObject({ options: { level: LogLevel.Debug } })
  })

  test('Test env develop', () => {
    process.env.NODE_ENV = 'develop'
    process.env.LOG_LEVEL = 'trace'
    expect(createDefaultLogger()).toMatchObject({ options: { level: LogLevel.Trace } })
  })

  test('Test env undefined', () => {
    process.env.NODE_ENV = undefined
    process.env.LOG_LEVEL = 'error'
    expect(createDefaultLogger()).toMatchObject({ options: { level: LogLevel.Error } })
  })

  test('Test env staging', () => {
    process.env.NODE_ENV = 'staging'
    process.env.LOG_LEVEL = 'trace'
    expect(createDefaultLogger()).toMatchObject({ options: { level: LogLevel.Trace } })
  })

  test('Test env development', () => {
    process.env.NODE_ENV = 'development'
    process.env.LOG_LEVEL = 'trace'
    expect(createDefaultLogger()).toMatchObject({ options: { level: LogLevel.Trace } })
  })

  test('Test env local', () => {
    process.env.NODE_ENV = 'local'
    process.env.LOG_LEVEL = 'trace'
    expect(createDefaultLogger()).toMatchObject({ options: { level: LogLevel.Trace } })
    process.env.LOG_LEVEL = 'warn'
    expect(createDefaultLogger()).toMatchObject({ options: { level: LogLevel.Warn } })

  })
  
})