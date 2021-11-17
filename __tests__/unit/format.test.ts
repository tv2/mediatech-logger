import { applyFormat, Format } from '../../src/format'

test('applyFormat (PLAINTEXT)', () => {
    const logInfo = { level: 2, data: 'hello world!'}
    expect(applyFormat(logInfo, { kind: Format.PLAINTEXT })).toBe('[info]: hello world!')
    expect(applyFormat(logInfo, { kind: Format.PLAINTEXT, timestamp: true })).toMatch(/\[info\]\[[^\]]+\]: hello world!/)
})