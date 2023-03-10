import { LoggerBase } from './logger-base'
import { Vault } from './vault'
import { instance, mock, objectContaining, reset, verify } from 'ts-mockito'
import { Level } from './level'
import { MetadataLoggerContext } from './metadata-logger-context'

const mockVault = mock<Vault>()

jest.mock('./metadata-logger-context')

describe('Logger', () => {

  beforeEach(resetMocks)

  describe('error', testLogLevel(Level.ERROR))

  describe('warn', testLogLevel(Level.WARN))

  describe('info', testLogLevel(Level.INFO))

  describe('debug', testLogLevel(Level.DEBUG))

  describe('trace', testLogLevel(Level.TRACE))

  describe('metadata', () => {

    it('constructs a MetadataLoggerContext with the given metadata', () => {
      const logger = createLogger()
      const metadata = { meta: 'data' }

      logger.metadata(metadata)

      expect(MetadataLoggerContext).toBeCalledWith(logger, metadata)
    })

  })

  describe('tag', () => {

    it('constructs a MetadataLoggerContext with the given metadata', () => {
      const logger = createLogger()
      const tag = 'my-tag'

      logger.tag(tag)

      expect(MetadataLoggerContext).toBeCalledWith(logger, { tag })
    })

  })

  describe('data', () => {

    it('constructs a MetadataLoggerContext with the given metadata', () => {
      const logger = createLogger()
      const data = 'my-data'

      logger.data(data)

      expect(MetadataLoggerContext).toBeCalledWith(logger, { data })
    })

  })

  describe('setLevel', () => {

    it('set level for all vaults', () => {
      const logger = createLogger()
      const newLevel = Level.TRACE

      logger.setLevel(newLevel)

      verify(mockVault.setLevel(newLevel)).once()
    })

    it('calls vault.setLevel when used by a higher order function', () => {
      const logger = createLogger()
      const newLevel = Level.TRACE

      higherOrderSetLevelFunction(logger.setLevel, newLevel)

      verify(mockVault.setLevel(newLevel)).once()
    })

  })

})

function resetMocks(): void {
  reset(mockVault)
  jest.resetAllMocks()
}

function testLogLevel(level: Level): () => void {
  return () => {

    it('calls vault.store when given a string', () => {
      const logger = createLogger()
      const message = 'my message'
      const expectedLog = {level, message}

      logger[level](message)

      verify(mockVault.store(objectContaining(expectedLog))).once()
    })

    it('calls vault.store when given a string and metadata', () => {
      const logger = createLogger()
      const message = 'my message'
      const expectedLog = {level, message, meta: 'data'}

      logger[level](message, {meta: 'data'})

      verify(mockVault.store(objectContaining(expectedLog))).once()
    })

    it('calls vault.store when given an object', () => {
      const logger = createLogger()
      const message = { hello: 'world' }
      const expectedLog = {level, message}

      logger[level](message)

      verify(mockVault.store(objectContaining(expectedLog))).once()
    })

    it('calls vault.store when given an object and metadata', () => {
      const logger = createLogger()
      const message = { hello: 'world' }
      const expectedLog = {level, message, meta: 'data'}

      logger[level](message, {meta: 'data'})

      verify(mockVault.store(objectContaining(expectedLog))).once()
    })

    it('calls vault.store when used by a higher order function', () => {
      const logger = createLogger()
      const message = 'my message'
      const expectedLog = {level, message}

      higherOrderLogFunction(logger[level], message)

      verify(mockVault.store(objectContaining(expectedLog))).once()
    })
  }
}

function createLogger(vaults?: Vault[]): LoggerBase {
  return new LoggerBase(vaults ?? [
    instance(mockVault)
  ])
}

type LogMethod = (message: unknown, metata?: object) => void
function higherOrderLogFunction(logMethod: LogMethod, message: unknown, metadata?: object): void {
  logMethod(message, metadata)
}

type SetLevelMethod = (level: Level) => void
function higherOrderSetLevelFunction(setLevel: SetLevelMethod, level: Level): void {
  setLevel(level)
}
