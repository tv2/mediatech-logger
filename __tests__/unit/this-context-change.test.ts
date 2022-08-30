import { createDefaultLogger } from '../../src'

describe('Test changes in this context', () => {
  const ENV = process.env

  beforeEach(() => {
    jest.resetModules()
    process.env = { ...ENV }

    process.stdout.write = jest.fn()
  })

  afterAll(() => {
    process.env = ENV
  })

  test('Passing logger.info to a method', () => {
    function giveMeALogMethod(logMethod: (log: string) => void): void {
      logMethod('The Message')
    }

    const logger = createDefaultLogger()

    giveMeALogMethod(logger.info)
    expect(process.stdout.write).toHaveBeenCalledTimes(1)
  })

  test('Passing logger.error to a method', () => {
    function giveMeALogMethod(logMethod: (log: string) => void): void {
      logMethod('The Message')
    }

    const logger = createDefaultLogger()

    giveMeALogMethod(logger.error)
    expect(process.stdout.write).toHaveBeenCalledTimes(1)
  })

  test('Passing logger.data.info to a method', () => {
    function giveMeALogMethod(logMethod: (log: string) => void): void {
      logMethod('The Message')
    }

    const logger = createDefaultLogger()

    giveMeALogMethod(logger.data({ data: 'info' }).info)
    expect(process.stdout.write).toHaveBeenCalledTimes(1)
  })

  test('Passing logger.tag.info to a method', () => {
    function giveMeALogMethod(logMethod: (log: string) => void): void {
      logMethod('The Message')
    }

    const logger = createDefaultLogger()

    giveMeALogMethod(logger.tag('someLoggerTag').info)
    expect(process.stdout.write).toHaveBeenCalledTimes(1)
  })

  test('Passing logger.meta.info to a method', () => {
    function giveMeALogMethod(logMethod: (log: string) => void): void {
      logMethod('The Message')
    }

    const logger = createDefaultLogger()

    giveMeALogMethod(logger.meta({ test: '' }).info)
    expect(process.stdout.write).toHaveBeenCalledTimes(1)
  })
})

