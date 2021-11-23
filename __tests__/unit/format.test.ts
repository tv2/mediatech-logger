import { applyFormat, Format, Formatter } from '../../src/format'

test('applyFormat (Plaintext)', () => {
    const logInfo = { level: 2, message: 'hello world!' }
    expect(applyFormat(logInfo, { kind: Format.Plaintext })).toBe('[info]: hello world!')
    expect(applyFormat(logInfo, { kind: Format.Plaintext, timestamp: true })).toMatch(/\[info\]\[[^\]]+\]: hello world!/)
})

test('applyFormat (Plaintext + tag)', () => {
    const logInfo = { level: 2, message: 'hello world!', tag: 'relevant-tag' }
    expect(applyFormat(logInfo, { kind: Format.Plaintext })).toBe('[info]<relevant-tag>: hello world!')
    expect(applyFormat(logInfo, { kind: Format.Plaintext, timestamp: true })).toMatch(/\[info\]\[[^\]]+\]<relevant-tag>: hello world!/)
})

test('applyFormat (Json)', () => {
    const logInfo = { level: 2, message: "test"}
    expect(applyFormat(logInfo, { kind: Format.JSON })).toBe("{\"level\":\"info\",\"message\":\"test\"}")
    expect(applyFormat(logInfo, { kind: Format.JSON, timestamp: false })).toBe("{\"level\":\"info\",\"message\":\"test\"}")
    expect(applyFormat(logInfo, { kind: Format.JSON, timestamp: true })).toMatch(/{"level":"info","message":"test","timestamp":"[^"]+"}/)
})

test('applyFormat (Custom)', () => {
    const format: Formatter<string> = (log, options) => {
        return log.message + (log.tag ?? 'no-tag') + (options.timestamp ? Date.now() : '')
    }
    const logInfo = { level: 2, message: "test"}
    expect(applyFormat(logInfo, { kind: Format.Custom, format})).toBe('testno-tag')
})
