import { Vault } from './vault'
import { Log } from './log'
import { Level } from './level'
import { Format } from './format'
import { instance, mock } from 'ts-mockito'

const mockFormat = mock<Format>()
const mockPlainTextFormat = mock<Format>()
const mockJsonFormat = mock<Format>()

class DummyVault extends Vault {

  public store(log: Log): void {
    this.format.apply(log)
  }

  get exposedLevel(): Level {
    return this.level
  }

  get exposedFormat(): Format {
    return this.format
  }

  public exposedShouldStore(log: Log): boolean {
    return this.shouldStore(log)
  }

}

describe('Vault', () => {

  describe('setFormat', () => {

    it('changes the format if isFormatLocked is set to false', () => {
      const isFormatLocked = false
      const format = instance(mockPlainTextFormat)
      const vault = createDummyVault(Level.TRACE, format, isFormatLocked)
      const newFormat = instance(mockJsonFormat)
      vault.setFormat(newFormat)

      expect(vault.exposedFormat).toBe(newFormat)
    })

    it('does not change the format if isFormatLocked is set to true', () => {
      const isFormatLocked = true
      const format = instance(mockPlainTextFormat)
      const vault = createDummyVault(Level.TRACE, format, isFormatLocked)
      const newFormat = instance(mockJsonFormat)
      vault.setFormat(newFormat)

      expect(vault.exposedFormat).toBe(format)
    })

  })

  describe('setLevel', () => {

    testSetLevel(Level.TRACE, Level.ERROR)
    testSetLevel(Level.TRACE, Level.WARN)
    testSetLevel(Level.TRACE, Level.INFO)
    testSetLevel(Level.TRACE, Level.DEBUG)
    testSetLevel(Level.TRACE, Level.TRACE)
    testSetLevel(Level.ERROR, Level.TRACE)

  })

  describe('shouldStore', () => {

    testShouldStoreByLevel(Level.ERROR, Level.ERROR, true)
    testShouldStoreByLevel(Level.ERROR, Level.WARN, true)
    testShouldStoreByLevel(Level.ERROR, Level.INFO, true)
    testShouldStoreByLevel(Level.ERROR, Level.DEBUG, true)
    testShouldStoreByLevel(Level.ERROR, Level.TRACE, true)

    testShouldStoreByLevel(Level.WARN, Level.ERROR, false)
    testShouldStoreByLevel(Level.WARN, Level.WARN, true)
    testShouldStoreByLevel(Level.WARN, Level.INFO, true)
    testShouldStoreByLevel(Level.WARN, Level.DEBUG, true)
    testShouldStoreByLevel(Level.WARN, Level.TRACE, true)

    testShouldStoreByLevel(Level.INFO, Level.ERROR, false)
    testShouldStoreByLevel(Level.INFO, Level.WARN, false)
    testShouldStoreByLevel(Level.INFO, Level.INFO, true)
    testShouldStoreByLevel(Level.INFO, Level.DEBUG, true)
    testShouldStoreByLevel(Level.INFO, Level.TRACE, true)

    testShouldStoreByLevel(Level.DEBUG, Level.ERROR, false)
    testShouldStoreByLevel(Level.DEBUG, Level.WARN, false)
    testShouldStoreByLevel(Level.DEBUG, Level.INFO, false)
    testShouldStoreByLevel(Level.DEBUG, Level.DEBUG, true)
    testShouldStoreByLevel(Level.DEBUG, Level.TRACE, true)

    testShouldStoreByLevel(Level.TRACE, Level.ERROR, false)
    testShouldStoreByLevel(Level.TRACE, Level.WARN, false)
    testShouldStoreByLevel(Level.TRACE, Level.INFO, false)
    testShouldStoreByLevel(Level.TRACE, Level.DEBUG, false)
    testShouldStoreByLevel(Level.TRACE, Level.TRACE, true)

  })

})

function createDummyVault(level: Level, format: Format, isFormatLocked: boolean): DummyVault {
  return new DummyVault({
    level,
    format,
    isFormatLocked
  })
}

function testSetLevel(initialLevel: Level, newLevel: Level): void {

  it(`changes level from ${ initialLevel } to ${ newLevel }`, () => {
    const vault = createDummyVault(initialLevel, instance(mockFormat), false)

    vault.setLevel(newLevel)

    expect(vault.exposedLevel).toBe(newLevel)
  })

}

function testShouldStoreByLevel(level: Level, levelThreshold: Level, expectedShouldStore: boolean): void {

  it(`returns ${ expectedShouldStore } when ${ level } level with a${ levelThreshold } level threshold`, () => {
    const vault = createDummyVault(levelThreshold, instance(mockFormat), false)
    const log = createLog(level)

    const shouldStore = vault.exposedShouldStore(log)
    expect(shouldStore).toBe(expectedShouldStore)
  })

}

function createLog(level: Level): Log {
  return {
    message: 'some message',
    level,
  }
}
