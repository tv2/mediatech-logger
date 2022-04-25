import { applyFormat, Format, Formatter } from '../../src/logger/format'
import { Level } from '../../src/logger/level'

test('applyFormat (Plaintext)', () => {
  const logInfo = { level: Level.info, message: 'hello world!' }
  expect(applyFormat(logInfo, { kind: Format.Plaintext })).toMatch(
    /\[\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z\] \[info\]: hello world!/
  )
  expect(applyFormat(logInfo, { kind: Format.Plaintext, timestamp: true })).toMatch(
    /\[\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z\] \[info\]: hello world!/
  )
})

test('applyFormat (Plaintext + tag)', () => {
  const logInfo = { level: Level.info, message: 'hello world!', tag: 'relevant-tag' }
  expect(applyFormat(logInfo, { kind: Format.Plaintext, timestamp: false })).toBe('[info] <relevant-tag>: hello world!')
  expect(applyFormat(logInfo, { kind: Format.Plaintext, timestamp: true })).toMatch(
    /\[\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z\] \[info\] <relevant-tag>: hello world!/
  )
})

test('applyFormat (Plaintext + color)', () => {
  const logInfo = { level: Level.info, message: 'hello world!', tag: 'relevant-tag' }
  expect(applyFormat(logInfo, { kind: Format.Plaintext, color: true, timestamp: false })).toBe(
    '[\x1b[32minfo\x1b[0m] <relevant-tag>: hello world!'
  )
  expect(
    applyFormat(logInfo, { kind: Format.Plaintext, color: true, timestamp: true })
      .replaceAll('\x1b[32m', '\\x1b[32m')
      .replaceAll('\x1b[0m', '\\x1b[0m')
      .replaceAll('\x1b[4m', '\\x1b[4m')
  ).toMatch(
    /\[\\x1b\[4m\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z\\x1b\[0m\] \[\\x1b\[32minfo\\x1b\[0m\] <relevant-tag>: hello world!/
  )
})

test('applyFormat (Json)', () => {
  const logInfo = { level: Level.info, message: 'test' }
  expect(applyFormat(logInfo, { kind: Format.JSON })).toMatch(
    /{"level":"info","message":"test","timestamp":"\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z"}/
  )
  expect(applyFormat(logInfo, { kind: Format.JSON, timestamp: false })).toBe('{"level":"info","message":"test"}')
  expect(applyFormat(logInfo, { kind: Format.JSON, timestamp: true })).toMatch(
    /{"level":"info","message":"test","timestamp":"\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z"}/
  )
})

test('applyFormat (Custom)', () => {
  const format: Formatter = (log, options) => {
    return log.message + (log.tag ?? 'no-tag') + (options.timestamp ? Date.now() : '')
  }
  const logInfo = { level: Level.info, message: 'test' }
  expect(applyFormat(logInfo, { kind: Format.Custom, format })).toBe('testno-tag')
})
