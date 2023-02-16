import { anything, instance, mock, objectContaining, reset, verify } from 'ts-mockito'
import { Logger } from './logger'
import { MetadataLoggerContext } from './metadata-logger-context'
import { Level } from './level'

const mockLoggerContext = mock<Logger>()

describe('MetadataLoggerContext', () => {

  beforeEach(resetMocks)

  describe('error', testLogLevel(Level.ERROR))

  describe('warn', testLogLevel(Level.WARN))

  describe('info', testLogLevel(Level.INFO))

  describe('debug', testLogLevel(Level.DEBUG))

  describe('trace', testLogLevel(Level.TRACE))

  describe('metadata', () => {

    it('constructs a new MetadataLoggerContext', () => {
      const metadataLoggerContext = createMetadataLoggerContext()
      const metadata = {}

      const newMetadataLoggerContext = metadataLoggerContext.metadata(metadata)

      expect(metadataLoggerContext).not.toBe(newMetadataLoggerContext)
    })

    it('constructs a new instance with new metadata', () => {
      const metadataLoggerContext = createMetadataLoggerContext()
      const metadata = { meta: 'data' }

      const newMetadataLoggerContext = metadataLoggerContext.metadata(metadata)

      expect(newMetadataLoggerContext._metadata).toMatchObject(metadata)
    })

    it('constructs a new instance with both old and new data', () => {
      const oldMetadata = { oldMeta: 'old data'}
      const metadataLoggerContext = createMetadataLoggerContext(oldMetadata)
      const metadata = { meta: 'data' }

      const newMetadataLoggerContext = metadataLoggerContext.metadata(metadata)

      expect(newMetadataLoggerContext._metadata).toMatchObject({ ...oldMetadata, ...metadata })
    })

    it('constructs a new instance with new metadata overwriting old metadata', () => {
      const oldMetadata = { meta: 'old data'}
      const metadataLoggerContext = createMetadataLoggerContext(oldMetadata)
      const metadata = { meta: 'data' }

      const newMetadataLoggerContext = metadataLoggerContext.metadata(metadata)

      expect(newMetadataLoggerContext._metadata).not.toMatchObject(oldMetadata)
      expect(newMetadataLoggerContext._metadata).toMatchObject(metadata)
    })

  })

  describe('tag', () => {

    it('constructs a new MetadataLoggerContext', () => {
      const metadataLoggerContext = createMetadataLoggerContext()
      const tag = 'my-tag'

      const newMetadataLoggerContext = metadataLoggerContext.tag(tag)

      expect(metadataLoggerContext).not.toBe(newMetadataLoggerContext)
    })

    it('constructs a new instance with new tag', () => {
      const metadataLoggerContext = createMetadataLoggerContext()
      const tag = 'my-tag'

      const newMetadataLoggerContext = metadataLoggerContext.tag(tag)

      expect(newMetadataLoggerContext._metadata).toMatchObject({ tag })
    })

    it('constructs a new instance with new tag overwriting old metadata', () => {
      const oldTag = 'my-old-tag'
      const metadataLoggerContext = createMetadataLoggerContext({ tag: oldTag })
      const tag = 'my-tag'

      const newMetadataLoggerContext = metadataLoggerContext.tag(tag)

      expect(newMetadataLoggerContext._metadata).not.toMatchObject({ tag: oldTag })
      expect(newMetadataLoggerContext._metadata).toMatchObject({ tag })
    })

  })

  describe('data', () => {

    it('constructs a new MetadataLoggerContext', () => {
      const metadataLoggerContext = createMetadataLoggerContext()
      const data = 'my-data'

      const newMetadataLoggerContext = metadataLoggerContext.data(data)

      expect(metadataLoggerContext).not.toBe(newMetadataLoggerContext)
    })

    it('constructs a new instance with new data', () => {
      const metadataLoggerContext = createMetadataLoggerContext()
      const data = 'my-data'

      const newMetadataLoggerContext = metadataLoggerContext.data(data)

      expect(newMetadataLoggerContext._metadata).toMatchObject({ data })
    })

    it('constructs a new instance with new data overwriting old metadata', () => {
      const oldData = 'my-old-data'
      const metadataLoggerContext = createMetadataLoggerContext({ data: oldData })
      const data = 'my-data'

      const newMetadataLoggerContext = metadataLoggerContext.data(data)

      expect(newMetadataLoggerContext._metadata).not.toMatchObject({ data: oldData })
      expect(newMetadataLoggerContext._metadata).toMatchObject({ data })
    })

  })

})

function resetMocks(): void {
  reset(mockLoggerContext)
  jest.resetAllMocks()
}

function testLogLevel(level: Level): () => void {
  return () => {

    it(`calls LoggerContext.${ level } when given a string`, () => {
      const metadataLoggerContext = createMetadataLoggerContext()
      const message = 'my message'

      metadataLoggerContext[level](message)

      verify(mockLoggerContext[level](message, anything())).once()
    })

    it(`calls LoggerContext.${ level } when given a string and metadata`, () => {
      const metadataLoggerContext = createMetadataLoggerContext()
      const message = 'my message'
      const metadata = { meta: 'data' }

      metadataLoggerContext[level](message, metadata)

      verify(mockLoggerContext[level](message, objectContaining(metadata))).once()
    })

    it(`calls LoggerContext.${ level } when given an object`, () => {
      const metadataLoggerContext = createMetadataLoggerContext()
      const message = { hello: 'world' }

      metadataLoggerContext[level](message)

      verify(mockLoggerContext[level](message, anything())).once()
    })

    it(`calls LoggerContext.${ level } when given an object and metadata`, () => {
      const metadataLoggerContext = createMetadataLoggerContext()
      const message = { hello: 'world' }
      const metadata = { meta: 'data' }

      metadataLoggerContext[level](message, metadata)

      verify(mockLoggerContext[level](message, objectContaining(metadata))).once()
    })

    it(`calls LoggerContext.${ level } when used by a higher order function`, () => {
      const metadataLoggerContext = createMetadataLoggerContext()
      const message = 'my message'

      higherOrderFunction(metadataLoggerContext[level], message)

      verify(mockLoggerContext[level](objectContaining(message), anything())).once()
    })

  }
}

function createMetadataLoggerContext(metadata: object = {}): MetadataLoggerContext {
  return new MetadataLoggerContext(instance(mockLoggerContext), metadata)
}

type LogMethod = (message: unknown, metata?: object) => void
function higherOrderFunction(logMethod: LogMethod, message: unknown, metadata?: object): void {
  logMethod(message, metadata)
}
