import { applyFormat, Format, Formatter } from '../../src/logger/format'

test('applyFormat (Plaintext)', () => {
    const logInfo = { level: 2, message: 'hello world!' }
    expect(applyFormat(logInfo, { kind: Format.Plaintext })).toMatch(/\[\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z\] \[info\]: hello world!/)
    expect(applyFormat(logInfo, { kind: Format.Plaintext, timestamp: true })).toMatch(/\[\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z\] \[info\]: hello world!/)
})

test('applyFormat (Plaintext + tag)', () => {
    const logInfo = { level: 2, message: 'hello world!', tag: 'relevant-tag' }
    expect(applyFormat(logInfo, { kind: Format.Plaintext, timestamp: false })).toBe('[info] <relevant-tag>: hello world!')
    expect(applyFormat(logInfo, { kind: Format.Plaintext, timestamp: true })).toMatch(/\[\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z\] \[info\] <relevant-tag>: hello world!/)
})

test('applyFormat (Json)', () => {
    const logInfo = { level: 2, message: "test"}
    expect(applyFormat(logInfo, { kind: Format.JSON })).toMatch(/{"level":"info","message":"test","timestamp":"\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z"}/)
    expect(applyFormat(logInfo, { kind: Format.JSON, timestamp: false })).toBe("{\"level\":\"info\",\"message\":\"test\"}")
    expect(applyFormat(logInfo, { kind: Format.JSON, timestamp: true })).toMatch(/{"level":"info","message":"test","timestamp":"\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z"}/)
})

test('applyFormat (Custom)', () => {
    const format: Formatter = (log, options) => {
        return log.message + (log.tag ?? 'no-tag') + (options.timestamp ? Date.now() : '')
    }
    const logInfo = { level: 2, message: "test"}
    expect(applyFormat(logInfo, { kind: Format.Custom, format})).toBe('testno-tag')
})
