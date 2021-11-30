import { createDefaultLogger, Format, Level, Logger, Vault } from '../../src'

describe('Test environment', () => {
  const ENV = process.env

  beforeEach(() => {
    jest.resetModules()
    process.env = { ...ENV }

    console.log = jest.fn()
  })

  afterAll(() => {
    process.env = ENV
  })

  test('Test createDefaultLogger', () => {
    const logger = createDefaultLogger()
    logger.error('test')
    expect(console.log).toHaveBeenCalledTimes(1)
    logger.warn('test')
    expect(console.log).toHaveBeenCalledTimes(2)
    logger.info('test')
    expect(console.log).toHaveBeenCalledTimes(3)
    logger.debug('test')
    expect(console.log).toHaveBeenCalledTimes(4)
    logger.trace('test')
    expect(console.log).toHaveBeenCalledTimes(5)

    logger.error('test', { test: 'test' })
    expect(console.log).toHaveBeenCalledTimes(6)
    logger.warn('test', { test: 'test' })
    expect(console.log).toHaveBeenCalledTimes(7)
    logger.info('test', { test: 'test' })
    expect(console.log).toHaveBeenCalledTimes(8)
    logger.debug('test', { test: 'test' })
    expect(console.log).toHaveBeenCalledTimes(9)
    logger.trace('test', { test: 'test' })
    expect(console.log).toHaveBeenCalledTimes(10)

    logger.tag('test tag').error('test')
    expect(console.log).toHaveBeenCalledTimes(11)
    logger.tag('test tag').warn('test')
    expect(console.log).toHaveBeenCalledTimes(12)
    logger.tag('test tag').info('test')
    expect(console.log).toHaveBeenCalledTimes(13)
    logger.tag('test tag').debug('test')
    expect(console.log).toHaveBeenCalledTimes(14)
    logger.tag('test tag').trace('test')
    expect(console.log).toHaveBeenCalledTimes(15)

    logger.data('test data').error('test')
    expect(console.log).toHaveBeenCalledTimes(16)
    logger.data('test data').warn('test')
    expect(console.log).toHaveBeenCalledTimes(17)
    logger.data('test data').info('test')
    expect(console.log).toHaveBeenCalledTimes(18)
    logger.data('test data').debug('test')
    expect(console.log).toHaveBeenCalledTimes(19)
    logger.data('test data').trace('test')
    expect(console.log).toHaveBeenCalledTimes(20)

    logger.data(new Error('Some dangerous error.')).error('test')
    expect(console.log).toHaveBeenCalledTimes(21)
    logger.data(new Error('Some dangerous error.')).warn('test')
    expect(console.log).toHaveBeenCalledTimes(22)
    logger.data(new Error('Some dangerous error.')).info('test')
    expect(console.log).toHaveBeenCalledTimes(23)
    logger.data(new Error('Some dangerous error.')).debug('test')
    expect(console.log).toHaveBeenCalledTimes(24)
    logger.data(new Error('Some dangerous error.')).trace('test')
    expect(console.log).toHaveBeenCalledTimes(25)
  })

  test('Test tag', () => {
    const logger = createDefaultLogger()
    expect(logger.tag('test tag')).toMatchObject({ meta: { tag: 'test tag' } })
    expect(logger.tag('test tag').tag('real-tag')).toMatchObject({ meta: { tag: 'real-tag' } })
  })

  test('Test data', () => {
    const logger = createDefaultLogger()
    expect(logger.data('test data')).toMatchObject({ meta: { data: 'test data' } })
    expect(logger.data('test data').data('real-data')).toMatchObject({ meta: { data: 'real-data' } })
    const error = new Error('some error message')
    expect(logger.data(error)).toMatchObject({ meta: { data: error } })
  })

  test('Test createDefaultLogger for prod', () => {
    process.env.NODE_ENV = 'production'
    const logger = createDefaultLogger()
    logger.info('test')
    expect(logger).toMatchObject({
      vaults: [
        {
          format: { kind: Format.JSON, timestamp: true },
          level: Level.Warn,
        },
      ],
    })
    expect(logger.vaults[0]?.constructor?.name).toBe('ConsoleVault')
  })

  test('Test createDefaultLogger for stage', () => {
    process.env.NODE_ENV = 'staging'
    const logger = createDefaultLogger()
    expect(logger).toMatchObject({
      vaults: [
        {
          format: { kind: Format.JSON, timestamp: true },
          level: Level.Info,
        },
      ],
    })
    expect(logger.vaults[0]?.constructor?.name).toBe('ConsoleVault')
  })

  test('Test createDefaultLogger for dev', () => {
    process.env.NODE_ENV = 'development'
    const logger = createDefaultLogger()
    console.log(logger)
    expect(logger).toMatchObject({
      vaults: [
        {
          format: { kind: Format.Plaintext, pretty: true },
          level: Level.Debug,
        },
      ],
    })
    expect(logger.vaults[0]?.constructor?.name).toBe('ConsoleVault')
  })

  test('Test createDefaultLogger for local', () => {
    process.env.NODE_ENV = 'local'
    const logger = createDefaultLogger()
    expect(logger).toMatchObject({
      vaults: [
        {
          format: { kind: Format.Plaintext, pretty: true },
          level: Level.Trace,
        },
      ],
    })
    expect(logger.vaults[0]?.constructor?.name).toBe('ConsoleVault')
  })

  test('Test createDefaultLogger for local', () => {
    const logger = new Logger({})
    expect(logger).toMatchObject({
      vaults: [
        {
          format: { kind: Format.JSON, pretty: true, timestamp: true },
          level: Level.Info,
        },
      ],
    })
    expect(logger.vaults[0]?.constructor?.name).toBe('ConsoleVault')
  })

  test('multiple vaults logger', () => {
    const logger = new Logger({
      level: Level.Info,
      format: { kind: Format.JSON, pretty: true, timestamp: true },
      vault: [{ kind: Vault.Console }, { kind: Vault.Console }],
    })

    logger.info('some info')
    expect(console.log).toHaveBeenCalledTimes(2)
  })
})
