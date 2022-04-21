import { Format, Level, Logger, Vault } from '../../src'
import * as fs from 'fs'

const createLogger = () =>
  new Logger({
    level: Level.info,
    format: {
      kind: Format.JSON,
      pretty: false,
      timestamp: false,
    },
    vault: {
      kind: Vault.File,
      directory: __dirname,
      filename: 'test',
      useRotation: true,
    },
  })

jest.mock('fs')

let writeStream: jest.Mock
let closeStream: jest.Mock

describe('', () => {
  beforeEach(() => {
    writeStream = jest.fn()
    closeStream = jest.fn()
    ;(fs.createWriteStream as any).mockReturnValue({ write: writeStream, close: closeStream })
    jest.clearAllMocks()
  })

  afterAll(() => {
    jest.restoreAllMocks()
  })

  test('info logging', () => {
    const logger = createLogger()
    logger.tag('some-tag').info('info message')
    expect(writeStream).toHaveBeenNthCalledWith(1, '{"message":"info message","level":"info","tag":"some-tag"}')
    expect(writeStream).toHaveBeenNthCalledWith(2, '\n')
    expect(writeStream).toHaveBeenCalledTimes(2)
  })

  test('with rotation', () => {
    jest.useFakeTimers().setSystemTime(new Date('2021-11-28').getTime())
    const logger = createLogger()
    logger.tag('some-tag').info('info message')
    expect(writeStream).toHaveBeenNthCalledWith(1, '{"message":"info message","level":"info","tag":"some-tag"}')
    expect(writeStream).toHaveBeenNthCalledWith(2, '\n')
    expect(writeStream).toHaveBeenCalledTimes(2)
    expect(closeStream).toHaveBeenCalledTimes(0)

    expect(fs.createWriteStream).toHaveBeenLastCalledWith(__dirname + '/test-20211128.log', expect.anything())
    expect(fs.createWriteStream).toHaveBeenCalledTimes(1)

    jest.useFakeTimers().setSystemTime(new Date('2021-11-29').getTime())
    logger.tag('some-tag').info('info message')
    expect(writeStream).toHaveBeenNthCalledWith(3, '{"message":"info message","level":"info","tag":"some-tag"}')
    expect(writeStream).toHaveBeenNthCalledWith(4, '\n')
    expect(writeStream).toHaveBeenCalledTimes(4)
    expect(closeStream).toHaveBeenCalledTimes(1)

    expect(fs.createWriteStream).toHaveBeenLastCalledWith(__dirname + '/test-20211129.log', expect.anything())
    expect(fs.createWriteStream).toHaveBeenCalledTimes(2)
  })

  test('without rotation', () => {
    jest.useFakeTimers().setSystemTime(new Date('2021-11-28').getTime())
    const logger = new Logger({
      level: Level.info,
      format: {
        kind: Format.JSON,
        pretty: false,
        timestamp: false,
      },
      vault: {
        kind: Vault.File,
        directory: __dirname,
        filename: 'test',
        useRotation: false,
      },
    })
    logger.tag('some-tag').info('info message')
    expect(writeStream).toHaveBeenNthCalledWith(1, '{"message":"info message","level":"info","tag":"some-tag"}')
    expect(writeStream).toHaveBeenNthCalledWith(2, '\n')
    expect(writeStream).toHaveBeenCalledTimes(2)
    expect(closeStream).toHaveBeenCalledTimes(0)

    expect(fs.createWriteStream).toHaveBeenLastCalledWith(__dirname + '/test.log', expect.anything())
    expect(fs.createWriteStream).toHaveBeenCalledTimes(1)

    jest.useFakeTimers().setSystemTime(new Date('2021-11-29').getTime())
    logger.tag('some-tag').info('info message')
    expect(writeStream).toHaveBeenNthCalledWith(3, '{"message":"info message","level":"info","tag":"some-tag"}')
    expect(writeStream).toHaveBeenNthCalledWith(4, '\n')
    expect(writeStream).toHaveBeenCalledTimes(4)
    expect(closeStream).toHaveBeenCalledTimes(0)

    expect(fs.createWriteStream).toHaveBeenLastCalledWith(__dirname + '/test.log', expect.anything())
    expect(fs.createWriteStream).toHaveBeenCalledTimes(1)
  })

  test('invalid level', () => {
    const logger = createLogger()
    logger.tag('some-tag').debug('debug message')
    expect(writeStream).toHaveBeenCalledTimes(0)
  })
})
