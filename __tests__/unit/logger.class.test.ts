import { createDefaultLogger, Format, Level, Logger, Vault } from '../../src'

describe('Test environment', () => {
  const ENV = process.env

  beforeEach(() => {
    jest.resetModules()
    process.env = { ...ENV }

    process.stdout.write = jest.fn()
  })

  afterAll(() => {
    process.env = ENV
  })

  test('Test createDefaultLogger', () => {
    const logger = createDefaultLogger()
    logger.error('test')
    expect(process.stdout.write).toHaveBeenCalledTimes(1)
    logger.warn('test')
    expect(process.stdout.write).toHaveBeenCalledTimes(2)
    logger.info('test')
    expect(process.stdout.write).toHaveBeenCalledTimes(3)
    logger.debug('test')
    expect(process.stdout.write).toHaveBeenCalledTimes(4)
    logger.trace('test')
    expect(process.stdout.write).toHaveBeenCalledTimes(5)

    logger.error('test', { test: 'test' })
    expect(process.stdout.write).toHaveBeenCalledTimes(6)
    logger.warn('test', { test: 'test' })
    expect(process.stdout.write).toHaveBeenCalledTimes(7)
    logger.info('test', { test: 'test' })
    expect(process.stdout.write).toHaveBeenCalledTimes(8)
    logger.debug('test', { test: 'test' })
    expect(process.stdout.write).toHaveBeenCalledTimes(9)
    logger.trace('test', { test: 'test' })
    expect(process.stdout.write).toHaveBeenCalledTimes(10)

    logger.tag('test tag').error('test')
    expect(process.stdout.write).toHaveBeenCalledTimes(11)
    logger.tag('test tag').warn('test')
    expect(process.stdout.write).toHaveBeenCalledTimes(12)
    logger.tag('test tag').info('test')
    expect(process.stdout.write).toHaveBeenCalledTimes(13)
    logger.tag('test tag').debug('test')
    expect(process.stdout.write).toHaveBeenCalledTimes(14)
    logger.tag('test tag').trace('test')
    expect(process.stdout.write).toHaveBeenCalledTimes(15)

    logger.data('test data').error('test')
    expect(process.stdout.write).toHaveBeenCalledTimes(16)
    logger.data('test data').warn('test')
    expect(process.stdout.write).toHaveBeenCalledTimes(17)
    logger.data('test data').info('test')
    expect(process.stdout.write).toHaveBeenCalledTimes(18)
    logger.data('test data').debug('test')
    expect(process.stdout.write).toHaveBeenCalledTimes(19)
    logger.data('test data').trace('test')
    expect(process.stdout.write).toHaveBeenCalledTimes(20)

    logger.data(new Error('Some dangerous error.')).error('test')
    expect(process.stdout.write).toHaveBeenCalledTimes(21)
    logger.data(new Error('Some dangerous error.')).warn('test')
    expect(process.stdout.write).toHaveBeenCalledTimes(22)
    logger.data(new Error('Some dangerous error.')).info('test')
    expect(process.stdout.write).toHaveBeenCalledTimes(23)
    logger.data(new Error('Some dangerous error.')).debug('test')
    expect(process.stdout.write).toHaveBeenCalledTimes(24)
    logger.data(new Error('Some dangerous error.')).trace('test')
    expect(process.stdout.write).toHaveBeenCalledTimes(25)
  })

  test('Test tag', () => {
    const logger = createDefaultLogger()
    expect(logger.tag('test tag')).toMatchObject({ _meta: { tag: 'test tag' } })
    expect(logger.tag('test tag').tag('real-tag')).toMatchObject({ _meta: { tag: 'real-tag' } })
  })

  test('Test data', () => {
    const logger = createDefaultLogger()
    expect(logger.data('test data')).toMatchObject({ _meta: { data: 'test data' } })
    expect(logger.data('test data').data('real-data')).toMatchObject({ _meta: { data: 'real-data' } })
    const error = new Error('some error message')
    expect(logger.data(error)).toMatchObject({ _meta: { data: error } })
  })

  test('Test createDefaultLogger for prod', () => {
    process.env.NODE_ENV = 'production'
    const logger = createDefaultLogger()
    logger.info('test')
    expect(logger).toMatchObject({
      vaults: [
        {
          format: { kind: Format.JSON, timestamp: true },
          level: Level.warn,
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
          level: Level.info,
        },
      ],
    })
    expect(logger.vaults[0]?.constructor?.name).toBe('ConsoleVault')
  })

  test('Test createDefaultLogger for dev', () => {
    process.env.NODE_ENV = 'development'
    const logger = createDefaultLogger()
    expect(logger).toMatchObject({
      vaults: [
        {
          format: { kind: Format.Plaintext, pretty: true },
          level: Level.debug,
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
          level: Level.trace,
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
          level: Level.info,
        },
      ],
    })
    expect(logger.vaults[0]?.constructor?.name).toBe('ConsoleVault')
  })

  test('multiple vaults logger', () => {
    const logger = new Logger({
      level: Level.info,
      format: { kind: Format.JSON, pretty: true, timestamp: true },
      vault: [{ kind: Vault.Console }, { kind: Vault.Console }],
    })

    logger.info('some info')
    expect(process.stdout.write).toHaveBeenCalledTimes(2)
  })
})
