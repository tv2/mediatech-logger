import { createDefaultLogger, Format, LogLevel, Vault } from "../../src";

describe('Test environment', () => {
  const ENV = process.env;

  beforeEach(() => {
    jest.resetModules()
    process.env = { ...ENV }
  });

  afterAll(() => {
    process.env = ENV
  });

  test('Test createDefaultLogger', () => {
    const logger = createDefaultLogger();
    logger.error('test')
    logger.warn('test')
    logger.info('test')
    logger.debug('test')
    logger.trace('test')

    logger.error('test', {test: "test"})
    logger.warn('test', {test: "test"})
    logger.info('test', {test: "test"})
    logger.debug('test', {test: "test"})
    logger.trace('test', {test: "test"})

    logger.tag('test tag').error('test')
    logger.tag('test tag').warn('test')
    logger.tag('test tag').info('test')
    logger.tag('test tag').debug('test')
    logger.tag('test tag').trace('test')
  })

  test('Test tag', () => {
    const logger = createDefaultLogger();
    expect(logger.tag('test tag')).toMatchObject({ meta: { tag: 'test tag' } })
    expect(logger.tag('test tag').tag('real-tag')).toMatchObject({ meta: { tag: 'real-tag' } })
  })

  test('Test data', () => {
    const logger = createDefaultLogger();
    expect(logger.data('test data')).toMatchObject({ meta: { data: 'test data' } })
    expect(logger.data('test data').data('real-data')).toMatchObject({ meta: { data: 'real-data' } })
    const error = new Error('some error message')
    expect(logger.data(error)).toMatchObject({ meta: { data: error } })
  })

  test('Test createDefaultLogger for prod', () => {
    process.env.NODE_ENV = 'production'
    const logger = createDefaultLogger();
    logger.info('test')
    expect(logger).toEqual({"options": {"format": {"kind": Format.JSON, "timestamp": true}, "level": LogLevel.Warn, "vault": {"kind": Vault.Console}}, "vault": {"options": {"kind": Vault.Console}}})
  })  

  test('Test createDefaultLogger for stage', () => {
    process.env.NODE_ENV = 'staging'
    const logger = createDefaultLogger();
    expect(logger).toEqual({"options": {"format": {"kind": Format.JSON, "timestamp": true}, "level": LogLevel.Info, "vault": {"kind": Vault.Console}}, "vault": {"options": {"kind": Vault.Console}}})
  })

  test('Test createDefaultLogger for dev', () => {
    process.env.NODE_ENV = 'development'
    const logger = createDefaultLogger();
    expect(logger).toEqual({"options": {"format": {"kind": Format.Plaintext}, "level": LogLevel.Debug, "vault": {"kind": Vault.Console}}, "vault": {"options": {"kind": Vault.Console}}})
  })

  test('Test createDefaultLogger for local', () => {
    process.env.NODE_ENV = 'local'
    const logger = createDefaultLogger();
    expect(logger).toEqual({"options": {"format": {"kind": Format.Plaintext}, "level": LogLevel.Trace, "vault": {"kind": Vault.Console}}, "vault": {"options": {"kind": Vault.Console}}})
  })
})
