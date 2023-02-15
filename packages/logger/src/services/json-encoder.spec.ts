import { JsonEncoder } from './json-encoder'

describe('JsonEncoder', () => {

  describe('encode', () => {

    describe('ugly', () => {

      it('encodes undefined', () => {
        const encoder = createUglyJsonEncoder()

        expect(encoder.encode(undefined)).toBe('undefined')
      })

      it('encodes null', () => {
        const encoder = createUglyJsonEncoder()

        expect(encoder.encode(null)).toBe('null')
      })

      it('encodes numbers as numbers', () => {
        const encoder = createUglyJsonEncoder()
        const number = 123456

        expect(encoder.encode(number)).toBe('123456')
      })

      it('encodes strings with double quotes', () => {
        const encoder = createUglyJsonEncoder()
        const text = 'my string'

        expect(encoder.encode(text)).toBe('"my string"')
      })

      it('encodes empty string with double quotes', () => {
        const encoder = createUglyJsonEncoder()
        const text = ''

        expect(encoder.encode(text)).toBe('""')
      })

      it('escapes double quotes in strings', () => {
        const encoder = createUglyJsonEncoder()
        const text = 'And you said: "Hold me I\'m falling apart."'

        expect(encoder.encode(text)).toBe('"And you said: \\"Hold me I\'m falling apart.\\""')
      })

      it('escapes newlines in strings', () => {
        const encoder = createUglyJsonEncoder()
        const text = 'hello\rthere\nworld'

        expect(encoder.encode(text)).toBe('"hello\\rthere\\nworld"')
      })

      it('escapes null-characters in strings', () => {
        const encoder = createUglyJsonEncoder()
        const text = 'hello world\0'

        expect(encoder.encode(text)).toBe('"hello world\\0"')
      })

      it('encodes bigints as a number', () => {
        const encoder = createUglyJsonEncoder()
        const bigintNumber = 123456n

        expect(encoder.encode(bigintNumber)).toBe('123456')
      })

      it('encodes negative bigints as a negative number', () => {
        const encoder = createUglyJsonEncoder()
        const bigintNumber = -123456n

        expect(encoder.encode(bigintNumber)).toBe('-123456')
      })

      it('encodes named functions as undefined', () => {
        const encoder = createUglyJsonEncoder()
        function myFunction() { return 'my-function' }

        expect(encoder.encode(myFunction)).toBe('undefined')
      })

      it ('encodes errors as strings with escaped newlines', () => {
        const encoder = createUglyJsonEncoder()
        const error = new Error('My error')

        expect(encoder.encode(error)).toMatch(/^"Error: My error\\n +at.+"/)
      })

      it('encodes empty object as {}', () => {
        const encoder = createUglyJsonEncoder()
        const emptyObject = {}

        expect(encoder.encode(emptyObject)).toBe('{}')
      })

      it('encodes object with string value without newlines', () => {
        const encoder = createUglyJsonEncoder()
        const myObject = { hello: 'world' }

        expect(encoder.encode(myObject)).toBe('{"hello":"world"}')
      })

      it('encodes object with number value without newlines', () => {
        const encoder = createUglyJsonEncoder()
        const myObject = { mambo: 5 }

        expect(encoder.encode(myObject)).toBe('{"mambo":5}')
      })

      it('encodes object with bigint value as number without newlines', () => {
        const encoder = createUglyJsonEncoder()
        const myObject = { mambo: 5n }

        expect(encoder.encode(myObject)).toBe('{"mambo":5}')
      })

      it('encodes object with error value as string without newlines', () => {
        const encoder = createUglyJsonEncoder()
        const myObject = { error: new Error('my error') }

        expect(encoder.encode(myObject)).toMatch(/^{"error":"Error: my error\\n +at.+"}$/)
      })

      it('encodes object with an empty array value without newlines', () => {
        const encoder = createUglyJsonEncoder()
        const myObject = { list: [] }

        expect(encoder.encode(myObject)).toBe('{"list":[]}')
      })

      it('encodes object with an number[] value without newlines', () => {
        const encoder = createUglyJsonEncoder()
        const myObject = { list: [1,2,3,4] }

        expect(encoder.encode(myObject)).toBe('{"list":[1,2,3,4]}')
      })

      it('encodes object with empty object and empty array values without newlines', () => {
        const encoder = createUglyJsonEncoder()
        const myObject = { emptyObject: {}, emptyList: [] }

        expect(encoder.encode(myObject)).toBe('{"emptyObject":{},"emptyList":[]}')
      })

      it('encodes nested objects without newlines', () => {
        const encoder = createUglyJsonEncoder()
        const myObject = { nestedObject: { hello: 'world' } }

        expect(encoder.encode(myObject)).toBe('{"nestedObject":{"hello":"world"}}')
      })

      it('encodes empty array as []', () => {
        const encoder = createUglyJsonEncoder()
        const emptyList: string[] = []

        expect(encoder.encode(emptyList)).toBe('[]')
      })

      it('encodes number array without newlines', () => {
        const encoder = createUglyJsonEncoder()
        const myList: number[] = [1, 2, 3, 4]

        expect(encoder.encode(myList)).toBe('[1,2,3,4]')
      })

      it('encodes string array without newlines', () => {
        const encoder = createUglyJsonEncoder()
        const myList: string[] = ['hello', 'there', 'world']

        expect(encoder.encode(myList)).toBe('["hello","there","world"]')
      })

      it('encodes bigint array as number array without newlines', () => {
        const encoder = createUglyJsonEncoder()
        const myList: bigint[] = [1n, 2n, 3n, 4n]

        expect(encoder.encode(myList)).toBe('[1,2,3,4]')
      })

      it('encodes error array as string array without newlines', () => {
        const encoder = createUglyJsonEncoder()
        const myList: Error[] = [new Error('my error')]

        expect(encoder.encode(myList)).toMatch(/^\["Error: my error\\n +at.+"\]$/)
      })

      it('encodes empty object value in array without newlines', () => {
        const encoder = createUglyJsonEncoder()
        const myList: object[] = [{}]

        expect(encoder.encode(myList)).toBe('[{}]')
      })

      it('encodes object value in array without newlines', () => {
        const encoder = createUglyJsonEncoder()
        const myList: object[] = [{ hello: 'world' }]

        expect(encoder.encode(myList)).toBe('[{"hello":"world"}]')
      })

      it('encodes cyclic objects', () => {
        const objectA = { objectB: {} }
        const objectB = { objectA }
        objectA.objectB = objectB

        const encoder = createUglyJsonEncoder()
        expect(encoder.encode(objectA)).toEqual('{"objectB":{}}')

      })

    })

    describe('pretty', () => {

      it('encodes undefined', () => {
        const encoder = createPrettyJsonEncoder()

        expect(encoder.encode(undefined)).toBe('undefined')
      })

      it('encodes null', () => {
        const encoder = createPrettyJsonEncoder()

        expect(encoder.encode(null)).toBe('null')
      })

      it('encodes numbers as numbers', () => {
        const encoder = createPrettyJsonEncoder()
        const number = 123456

        expect(encoder.encode(number)).toBe('123456')
      })

      it('encodes strings with double quotes', () => {
        const encoder = createPrettyJsonEncoder()
        const text = 'my string'

        expect(encoder.encode(text)).toBe('"my string"')
      })

      it('encodes empty string with double quotes', () => {
        const encoder = createPrettyJsonEncoder()
        const text = ''

        expect(encoder.encode(text)).toBe('""')
      })

      it('escapes double quotes in strings', () => {
        const encoder = createPrettyJsonEncoder()
        const text = 'And you said: "Hold me I\'m falling apart."'

        expect(encoder.encode(text)).toBe('"And you said: \\"Hold me I\'m falling apart.\\""')
      })

      it('does not escape newlines in strings', () => {
        const encoder = createPrettyJsonEncoder()
        const text = 'hello\rthere\nworld'

        expect(encoder.encode(text)).toBe('"hello\rthere\nworld"')
      })

      it('escapes null-characters in strings', () => {
        const encoder = createPrettyJsonEncoder()
        const text = 'hello world\0'

        expect(encoder.encode(text)).toBe('"hello world\\0"')
      })

      it('encodes bigint as a number', () => {
        const encoder = createPrettyJsonEncoder()
        const bigintNumber = 123456n

        expect(encoder.encode(bigintNumber)).toBe('123456')
      })

      it('encodes negative bigint as a negative number', () => {
        const encoder = createPrettyJsonEncoder()
        const bigintNumber = -123456n

        expect(encoder.encode(bigintNumber)).toBe('-123456')
      })

      it('encodes named functions as undefined', () => {
        const encoder = createPrettyJsonEncoder()
        function myFunction() { return 'my-function' }

        expect(encoder.encode(myFunction)).toBe('undefined')
      })

      it ('encodes errors as strings with newlines', () => {
        const encoder = createPrettyJsonEncoder()
        const error = new Error('My error')

        expect(encoder.encode(error)).toMatch(/^"Error: My error\n +at(.|\n)+"/)
      })

      it('encodes empty object as {}', () => {
        const encoder = createPrettyJsonEncoder()
        const emptyObject = {}

        expect(encoder.encode(emptyObject)).toBe('{}')
      })

      it('encodes object with string value with newlines', () => {
        const encoder = createPrettyJsonEncoder()
        const myObject = { hello: 'world' }

        expect(encoder.encode(myObject)).toBe('{\n  "hello": "world"\n}')
      })

      it('encodes object with number value with newlines', () => {
        const encoder = createPrettyJsonEncoder()
        const myObject = { mambo: 5 }

        expect(encoder.encode(myObject)).toBe('{\n  "mambo": 5\n}')
      })

      it('encodes object with bigint value as number with newlines', () => {
        const encoder = createPrettyJsonEncoder()
        const myObject = { mambo: 5n }

        expect(encoder.encode(myObject)).toBe('{\n  "mambo": 5\n}')
      })

      it('encodes object with error value as string with newlines', () => {
        const encoder = createPrettyJsonEncoder()
        const myObject = { error: new Error('my error') }

        expect(encoder.encode(myObject)).toMatch(/^{\n {2}"error": "Error: my error\n +at(.|\n)+"\n}$/)
      })

      it('encodes object with an empty array value with newlines', () => {
        const encoder = createPrettyJsonEncoder()
        const myObject = { list: [] }

        expect(encoder.encode(myObject)).toBe('{\n  "list": []\n}')
      })

      it('encodes object with an number[] value with newlines', () => {
        const encoder = createPrettyJsonEncoder()
        const myObject = { list: [1,2,3,4] }

        expect(encoder.encode(myObject)).toBe('{\n  "list": [\n    1,\n    2,\n    3,\n    4\n  ]\n}')
      })

      it('encodes object with empty object and empty array values with newlines', () => {
        const encoder = createPrettyJsonEncoder()
        const myObject = { emptyObject: {}, emptyList: [] }

        expect(encoder.encode(myObject)).toBe('{\n  "emptyObject": {},\n  "emptyList": []\n}')
      })

      it('encodes nested objects without newlines', () => {
        const encoder = createPrettyJsonEncoder()
        const myObject = { nestedObject: { hello: 'world' } }

        expect(encoder.encode(myObject)).toBe('{\n  "nestedObject": {\n    "hello": "world"\n  }\n}')
      })

      it('encodes empty array as []', () => {
        const encoder = createPrettyJsonEncoder()
        const emptyList: string[] = []

        expect(encoder.encode(emptyList)).toBe('[]')
      })

      it('encodes number array newlines', () => {
        const encoder = createPrettyJsonEncoder()
        const myList: number[] = [1, 2, 3, 4]

        expect(encoder.encode(myList)).toBe('[\n  1,\n  2,\n  3,\n  4\n]')
      })

      it('encodes string array newlines', () => {
        const encoder = createPrettyJsonEncoder()
        const myList: string[] = ['hello', 'there', 'world']

        expect(encoder.encode(myList)).toBe('[\n  "hello",\n  "there",\n  "world"\n]')
      })

      it('encodes bigint array as number array newlines', () => {
        const encoder = createPrettyJsonEncoder()
        const myList: bigint[] = [1n, 2n, 3n, 4n]

        expect(encoder.encode(myList)).toBe('[\n  1,\n  2,\n  3,\n  4\n]')
      })

      it('encodes error array as string array newlines', () => {
        const encoder = createPrettyJsonEncoder()
        const myList: Error[] = [new Error('my error')]

        expect(encoder.encode(myList)).toMatch(/^\[\n {2}"Error: my error\n +at(.|\n)+"\n\]$/)
      })

      it('encodes cyclic objects', () => {
        const objectA = { objectB: {} }
        const objectB = { objectA }
        objectA.objectB = objectB

        const encoder = createPrettyJsonEncoder()
        expect(encoder.encode(objectA)).toEqual('{\n  "objectB": {}\n}')

      })

    })

  })

})

function createUglyJsonEncoder(): JsonEncoder {
  return new JsonEncoder({ isPretty: false })
}

function createPrettyJsonEncoder(): JsonEncoder {
  return new JsonEncoder({ isPretty: true })
}
