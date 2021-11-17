import { executeFormat, Format } from '../../src/format'

test('executeFormat (PLAINTEXT)', () => {
    const logInfo = { level: 2, data: 'hello world!'}
    expect(executeFormat(logInfo, { kind: Format.PLAINTEXT })).toBe('[info]: hello world!')
    expect(executeFormat(logInfo, { kind: Format.PLAINTEXT, timestamp: true })).toMatch(/\[info\]\[[^\]]+\]: hello world!/)
})