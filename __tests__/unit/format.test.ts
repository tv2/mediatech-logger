import { applyFormat, Format } from '../../src/format'

test('applyFormat (Plaintext)', () => {
    const logInfo = { level: 2, message: 'hello world!'}
    expect(applyFormat(logInfo, { kind: Format.Plaintext })).toBe('[info]: hello world!')
    expect(applyFormat(logInfo, { kind: Format.Plaintext, timestamp: true })).toMatch(/\[info\]\[[^\]]+\]: hello world!/)
})
