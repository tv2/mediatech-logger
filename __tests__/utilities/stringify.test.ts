import { stringify } from '../../src/utilities'

test('primitives', () => {
  expect(stringify(1)).toBe('1')
  expect(stringify(-1)).toBe('-1')
  expect(stringify(1.525)).toBe('1.525')
  expect(stringify(-1.525)).toBe('-1.525')
  expect(stringify(1n)).toBe('1')
  expect(stringify(-1n)).toBe('-1')
  expect(stringify(true)).toBe('true')
  expect(stringify(false)).toBe('false')
  expect(stringify(null)).toBe('null')
  expect(stringify(undefined)).toBe('undefined')
  expect(stringify('true')).toBe('"true"')
  expect(stringify('false')).toBe('"false"')
  expect(stringify('null')).toBe('"null"')
  expect(stringify('undefined')).toBe('"undefined"')
  expect(stringify('hello world!')).toBe('"hello world!"')
  expect(stringify('')).toBe('""')
})

test('arrays', () => {
  expect(stringify([])).toBe('[]')
  expect(stringify([1, 2, 3, 4, 5])).toBe('[1,2,3,4,5]')
  expect(stringify([1.2, 2.3, 3.4, 4.5, 5.6])).toBe('[1.2,2.3,3.4,4.5,5.6]')
  expect(stringify(['1.2', '2.3', '3.4', '4.5', '5.6'])).toBe('["1.2","2.3","3.4","4.5","5.6"]')
})

test('errors', () => {
  expect(stringify(new Error('some error message'))).toMatch(/"Error: some error message(\n\s+at.+)?"/s)
  expect(stringify(new Error('some "really good" error message'))).toMatch(
    /"Error: some \\"really good\\" error message(\n\s+at.+)?"/s
  )
  const noStackError = new Error('some "really good" error message without a stack')
  noStackError.stack = undefined
  expect(stringify(noStackError)).toMatch(/"Error: some \\"really good\\" error message without a stack"$/s)
})

test('objects', () => {
  expect(stringify({})).toBe('{}')
  expect(
    stringify({
      integer: 1,
      float: 1.123,
      bigint: 32n,
      emptyString: '',
      string: 'hello there',
      false: false,
      true: true,
      null: null,
      undefined: undefined,
    })
  ).toBe(
    '{"integer":1,"float":1.123,"bigint":32,"emptyString":"","string":"hello there","false":false,"true":true,"null":null,"undefined":undefined}'
  )
})

test('misc', () => {
  expect(
    stringify({
      attr1: [1, 2, 3, 4],
    })
  ).toBe('{"attr1":[1,2,3,4]}')
  expect(
    stringify({
      attr0: 'value0',
      attr1: [1, 2, 3, 4],
      attr2: {
        'attr2.1': [1],
        'attr2.2': null,
      },
    })
  ).toBe('{"attr0":"value0","attr1":[1,2,3,4],"attr2":{"attr2.1":[1],"attr2.2":null}}')
  expect(stringify(() => {})).toBe('undefined')
})

test('depth 0', () => {
  expect(stringify([], { depth: 0n })).toBe('"<max-depth-reached>"')
})

test('misc with depth 1', () => {
  expect(
    stringify(
      {
        attr1: [1, 2, 3, 4],
      },
      { depth: 1n }
    )
  ).toBe('{"attr1":"<max-depth-reached>"}')

  expect(
    stringify(
      {
        attr0: 'value0',
        attr1: [1, 2, 3, 4],
        attr2: {
          'attr2.1': [1],
          'attr2.2': null,
        },
      },
      { depth: 1n }
    )
  ).toBe('{"attr0":"value0","attr1":"<max-depth-reached>","attr2":"<max-depth-reached>"}')
})

test('misc with depth 2', () => {
  expect(
    stringify(
      {
        attr1: [1, 2, 3, 4],
      },
      { depth: 2n }
    )
  ).toBe('{"attr1":[1,2,3,4]}')

  expect(
    stringify(
      {
        attr0: 'value0',
        attr1: [1, 2, 3, 4],
        attr2: {
          'attr2.1': [1],
          'attr2.2': null,
        },
      },
      { depth: 2n }
    )
  ).toBe('{"attr0":"value0","attr1":[1,2,3,4],"attr2":{"attr2.1":"<max-depth-reached>","attr2.2":null}}')
})

test('misc with depth 3', () => {
  expect(
    stringify(
      {
        attr1: [1, 2, 3, 4],
      },
      { depth: 3n }
    )
  ).toBe('{"attr1":[1,2,3,4]}')

  expect(
    stringify(
      {
        attr0: 'value0',
        attr1: [1, 2, 3, 4],
        attr2: {
          'attr2.1': [1],
          'attr2.2': null,
        },
      },
      { depth: 3n }
    )
  ).toBe('{"attr0":"value0","attr1":[1,2,3,4],"attr2":{"attr2.1":[1],"attr2.2":null}}')
})
