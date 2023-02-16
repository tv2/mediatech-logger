import { TypeSpecifier } from './type-specifier'

describe('type-specifier', () => {

  describe('isUndefined', () => {

    it('returns false if Error', () => {
      const typeSpecifier = new TypeSpecifier()
      const value = new Error('my error')
      const isCorrectType = typeSpecifier.isUndefined(value)

      expect(isCorrectType).toBeFalsy()
    })

    it('returns false if string', () => {
      const typeSpecifier = new TypeSpecifier()
      const value = 'my string'
      const isCorrectType = typeSpecifier.isUndefined(value)

      expect(isCorrectType).toBeFalsy()
    })

    it('returns false if String', () => {
      const typeSpecifier = new TypeSpecifier()
      const value = String('my string')
      const isCorrectType = typeSpecifier.isUndefined(value)

      expect(isCorrectType).toBeFalsy()
    })

    it('returns false if null', () => {
      const typeSpecifier = new TypeSpecifier()
      const value = null
      const isCorrectType = typeSpecifier.isUndefined(value)

      expect(isCorrectType).toBeFalsy()
    })

    it('returns true if undefined', () => {
      const typeSpecifier = new TypeSpecifier()
      const value = undefined
      const isCorrectType = typeSpecifier.isUndefined(value)

      expect(isCorrectType).toBeTruthy()
    })

    it('returns false if number', () => {
      const typeSpecifier = new TypeSpecifier()
      const value = 1234
      const isCorrectType = typeSpecifier.isUndefined(value)

      expect(isCorrectType).toBeFalsy()
    })

    it('returns false if bigint', () => {
      const typeSpecifier = new TypeSpecifier()
      const value = 1234n
      const isCorrectType = typeSpecifier.isUndefined(value)

      expect(isCorrectType).toBeFalsy()
    })

    it('returns false if array', () => {
      const typeSpecifier = new TypeSpecifier()
      const value: string[] = []
      const isCorrectType = typeSpecifier.isUndefined(value)

      expect(isCorrectType).toBeFalsy()
    })

    it('returns false if object', () => {
      const typeSpecifier = new TypeSpecifier()
      const value: object = {}
      const isCorrectType = typeSpecifier.isUndefined(value)

      expect(isCorrectType).toBeFalsy()
    })

  })

  describe('isNull', () => {

    it('returns false if Error', () => {
      const typeSpecifier = new TypeSpecifier()
      const value = new Error('my error')
      const isCorrectType = typeSpecifier.isNull(value)

      expect(isCorrectType).toBeFalsy()
    })

    it('returns false if string', () => {
      const typeSpecifier = new TypeSpecifier()
      const value = 'my string'
      const isCorrectType = typeSpecifier.isNull(value)

      expect(isCorrectType).toBeFalsy()
    })

    it('returns false if String', () => {
      const typeSpecifier = new TypeSpecifier()
      const value = String('my string')
      const isCorrectType = typeSpecifier.isNull(value)

      expect(isCorrectType).toBeFalsy()
    })

    it('returns true if null', () => {
      const typeSpecifier = new TypeSpecifier()
      const value = null
      const isCorrectType = typeSpecifier.isNull(value)

      expect(isCorrectType).toBeTruthy()
    })

    it('returns false if undefined', () => {
      const typeSpecifier = new TypeSpecifier()
      const value = undefined
      const isCorrectType = typeSpecifier.isNull(value)

      expect(isCorrectType).toBeFalsy()
    })

    it('returns false if number', () => {
      const typeSpecifier = new TypeSpecifier()
      const value = 1234
      const isCorrectType = typeSpecifier.isNull(value)

      expect(isCorrectType).toBeFalsy()
    })

    it('returns false if bigint', () => {
      const typeSpecifier = new TypeSpecifier()
      const value = 1234n
      const isCorrectType = typeSpecifier.isNull(value)

      expect(isCorrectType).toBeFalsy()
    })

    it('returns false if array', () => {
      const typeSpecifier = new TypeSpecifier()
      const value: string[] = []
      const isCorrectType = typeSpecifier.isNull(value)

      expect(isCorrectType).toBeFalsy()
    })

    it('returns false if object', () => {
      const typeSpecifier = new TypeSpecifier()
      const value: object = {}
      const isCorrectType = typeSpecifier.isNull(value)

      expect(isCorrectType).toBeFalsy()
    })

  })

  describe('isNumber', () => {

    it('returns true if 0', () => {
      const typeSpecifier = new TypeSpecifier()
      const value = 0
      const isCorrectType = typeSpecifier.isNumber(value)

      expect(isCorrectType).toBeTruthy()
    })

    it('returns true if -1', () => {
      const typeSpecifier = new TypeSpecifier()
      const value = -1
      const isCorrectType = typeSpecifier.isNumber(value)

      expect(isCorrectType).toBeTruthy()
    })

    it('returns false if "1"', () => {
      const typeSpecifier = new TypeSpecifier()
      const value = '1'
      const isCorrectType = typeSpecifier.isNumber(value)

      expect(isCorrectType).toBeFalsy()
    })

    it('returns false if null', () => {
      const typeSpecifier = new TypeSpecifier()
      const value = null
      const isCorrectType = typeSpecifier.isNumber(value)

      expect(isCorrectType).toBeFalsy()
    })

    it('returns false if undefined', () => {
      const typeSpecifier = new TypeSpecifier()
      const value = undefined
      const isCorrectType = typeSpecifier.isNumber(value)

      expect(isCorrectType).toBeFalsy()
    })

    it('returns false if bigint', () => {
      const typeSpecifier = new TypeSpecifier()
      const value = 123n
      const isCorrectType = typeSpecifier.isNumber(value)

      expect(isCorrectType).toBeFalsy()
    })

    it('returns false if array', () => {
      const typeSpecifier = new TypeSpecifier()
      const value: number[] = []
      const isCorrectType = typeSpecifier.isNumber(value)

      expect(isCorrectType).toBeFalsy()
    })

    it('returns false if object', () => {
      const typeSpecifier = new TypeSpecifier()
      const value: object = {}
      const isCorrectType = typeSpecifier.isNumber(value)

      expect(isCorrectType).toBeFalsy()
    })

  })

  describe('isString', () => {

    it('returns true if string', () => {
      const typeSpecifier = new TypeSpecifier()
      const value = 'my string'
      const isCorrectType = typeSpecifier.isString(value)

      expect(isCorrectType).toBeTruthy()
    })

    it('returns true if String', () => {
      const typeSpecifier = new TypeSpecifier()
      const value = String('my string')
      const isCorrectType = typeSpecifier.isString(value)

      expect(isCorrectType).toBeTruthy()
    })

    it('returns false if null', () => {
      const typeSpecifier = new TypeSpecifier()
      const value = null
      const isCorrectType = typeSpecifier.isString(value)

      expect(isCorrectType).toBeFalsy()
    })

    it('returns false if undefined', () => {
      const typeSpecifier = new TypeSpecifier()
      const value = undefined
      const isCorrectType = typeSpecifier.isString(value)

      expect(isCorrectType).toBeFalsy()
    })

    it('returns false if number', () => {
      const typeSpecifier = new TypeSpecifier()
      const value = 1234
      const isCorrectType = typeSpecifier.isString(value)

      expect(isCorrectType).toBeFalsy()
    })

    it('returns false if bigint', () => {
      const typeSpecifier = new TypeSpecifier()
      const value = 1234n
      const isCorrectType = typeSpecifier.isString(value)

      expect(isCorrectType).toBeFalsy()
    })

    it('returns false if error', () => {
      const typeSpecifier = new TypeSpecifier()
      const value = new Error('my error')
      const isCorrectType = typeSpecifier.isString(value)

      expect(isCorrectType).toBeFalsy()
    })

    it('returns false if array', () => {
      const typeSpecifier = new TypeSpecifier()
      const value: string[] = []
      const isCorrectType = typeSpecifier.isString(value)

      expect(isCorrectType).toBeFalsy()
    })

    it('returns false if object', () => {
      const typeSpecifier = new TypeSpecifier()
      const value: object = {}
      const isCorrectType = typeSpecifier.isString(value)

      expect(isCorrectType).toBeFalsy()
    })

  })

  describe('isBigInt', () => {

    it('returns true if 0n', () => {
      const typeSpecifier = new TypeSpecifier()
      const value = 0n
      const isCorrectType = typeSpecifier.isBigInt(value)

      expect(isCorrectType).toBeTruthy()
    })

    it('returns true if -1n', () => {
      const typeSpecifier = new TypeSpecifier()
      const value = -1n
      const isCorrectType = typeSpecifier.isBigInt(value)

      expect(isCorrectType).toBeTruthy()
    })

    it('returns false if "1n"', () => {
      const typeSpecifier = new TypeSpecifier()
      const value = '1n'
      const isCorrectType = typeSpecifier.isBigInt(value)

      expect(isCorrectType).toBeFalsy()
    })

    it('returns false if null', () => {
      const typeSpecifier = new TypeSpecifier()
      const value = null
      const isCorrectType = typeSpecifier.isBigInt(value)

      expect(isCorrectType).toBeFalsy()
    })

    it('returns false if undefined', () => {
      const typeSpecifier = new TypeSpecifier()
      const value = undefined
      const isCorrectType = typeSpecifier.isBigInt(value)

      expect(isCorrectType).toBeFalsy()
    })

    it('returns false if number', () => {
      const typeSpecifier = new TypeSpecifier()
      const value = 123
      const isCorrectType = typeSpecifier.isBigInt(value)

      expect(isCorrectType).toBeFalsy()
    })

    it('returns false if array', () => {
      const typeSpecifier = new TypeSpecifier()
      const value: bigint[] = []
      const isCorrectType = typeSpecifier.isBigInt(value)

      expect(isCorrectType).toBeFalsy()
    })

    it('returns false if object', () => {
      const typeSpecifier = new TypeSpecifier()
      const value: object = {}
      const isCorrectType = typeSpecifier.isBigInt(value)

      expect(isCorrectType).toBeFalsy()
    })

  })

  describe('isError', () => {

    it('returns true if Error', () => {
      const typeSpecifier = new TypeSpecifier()
      const value = new Error('my error')
      const isCorrectType = typeSpecifier.isError(value)

      expect(isCorrectType).toBeTruthy()
    })

    it('returns false if string', () => {
      const typeSpecifier = new TypeSpecifier()
      const value = 'my string'
      const isCorrectType = typeSpecifier.isError(value)

      expect(isCorrectType).toBeFalsy()
    })

    it('returns false if String', () => {
      const typeSpecifier = new TypeSpecifier()
      const value = String('my string')
      const isCorrectType = typeSpecifier.isArray(value)

      expect(isCorrectType).toBeFalsy()
    })

    it('returns false if null', () => {
      const typeSpecifier = new TypeSpecifier()
      const value = null
      const isCorrectType = typeSpecifier.isError(value)

      expect(isCorrectType).toBeFalsy()
    })

    it('returns false if undefined', () => {
      const typeSpecifier = new TypeSpecifier()
      const value = undefined
      const isCorrectType = typeSpecifier.isError(value)

      expect(isCorrectType).toBeFalsy()
    })

    it('returns false if number', () => {
      const typeSpecifier = new TypeSpecifier()
      const value = 1234
      const isCorrectType = typeSpecifier.isError(value)

      expect(isCorrectType).toBeFalsy()
    })

    it('returns false if bigint', () => {
      const typeSpecifier = new TypeSpecifier()
      const value = 1234n
      const isCorrectType = typeSpecifier.isError(value)

      expect(isCorrectType).toBeFalsy()
    })

    it('returns false if array', () => {
      const typeSpecifier = new TypeSpecifier()
      const value: string[] = []
      const isCorrectType = typeSpecifier.isError(value)

      expect(isCorrectType).toBeFalsy()
    })

    it('returns false if object', () => {
      const typeSpecifier = new TypeSpecifier()
      const value: object = {}
      const isCorrectType = typeSpecifier.isError(value)

      expect(isCorrectType).toBeFalsy()
    })

  })

  describe('isArray', () => {

    it('returns false if Error', () => {
      const typeSpecifier = new TypeSpecifier()
      const value = new Error('my error')
      const isCorrectType = typeSpecifier.isArray(value)

      expect(isCorrectType).toBeFalsy()
    })

    it('returns false if string', () => {
      const typeSpecifier = new TypeSpecifier()
      const value = 'my string'
      const isCorrectType = typeSpecifier.isArray(value)

      expect(isCorrectType).toBeFalsy()
    })

    it('returns false if String', () => {
      const typeSpecifier = new TypeSpecifier()
      const value = String('my string')
      const isCorrectType = typeSpecifier.isArray(value)

      expect(isCorrectType).toBeFalsy()
    })

    it('returns false if null', () => {
      const typeSpecifier = new TypeSpecifier()
      const value = null
      const isCorrectType = typeSpecifier.isArray(value)

      expect(isCorrectType).toBeFalsy()
    })

    it('returns false if undefined', () => {
      const typeSpecifier = new TypeSpecifier()
      const value = undefined
      const isCorrectType = typeSpecifier.isArray(value)

      expect(isCorrectType).toBeFalsy()
    })

    it('returns false if number', () => {
      const typeSpecifier = new TypeSpecifier()
      const value = 1234
      const isCorrectType = typeSpecifier.isArray(value)

      expect(isCorrectType).toBeFalsy()
    })

    it('returns false if bigint', () => {
      const typeSpecifier = new TypeSpecifier()
      const value = 1234n
      const isCorrectType = typeSpecifier.isArray(value)

      expect(isCorrectType).toBeFalsy()
    })

    it('returns true if array', () => {
      const typeSpecifier = new TypeSpecifier()
      const value: string[] = []
      const isCorrectType = typeSpecifier.isArray(value)

      expect(isCorrectType).toBeTruthy()
    })

    it('returns false if object', () => {
      const typeSpecifier = new TypeSpecifier()
      const value: object = {}
      const isCorrectType = typeSpecifier.isArray(value)

      expect(isCorrectType).toBeFalsy()
    })

  })

  describe('isObject', () => {

    it('returns false if Error', () => {
      const typeSpecifier = new TypeSpecifier()
      const value = new Error('my error')
      const isCorrectType = typeSpecifier.isObject(value)

      expect(isCorrectType).toBeFalsy()
    })

    it('returns false if string', () => {
      const typeSpecifier = new TypeSpecifier()
      const value = 'my string'
      const isCorrectType = typeSpecifier.isObject(value)

      expect(isCorrectType).toBeFalsy()
    })

    it('returns false if String', () => {
      const typeSpecifier = new TypeSpecifier()
      const value = String('my string')
      const isCorrectType = typeSpecifier.isObject(value)

      expect(isCorrectType).toBeFalsy()
    })

    it('returns false if null', () => {
      const typeSpecifier = new TypeSpecifier()
      const value = null
      const isCorrectType = typeSpecifier.isObject(value)

      expect(isCorrectType).toBeFalsy()
    })

    it('returns false if undefined', () => {
      const typeSpecifier = new TypeSpecifier()
      const value = undefined
      const isCorrectType = typeSpecifier.isObject(value)

      expect(isCorrectType).toBeFalsy()
    })

    it('returns false if number', () => {
      const typeSpecifier = new TypeSpecifier()
      const value = 1234
      const isCorrectType = typeSpecifier.isObject(value)

      expect(isCorrectType).toBeFalsy()
    })

    it('returns false if bigint', () => {
      const typeSpecifier = new TypeSpecifier()
      const value = 1234n
      const isCorrectType = typeSpecifier.isObject(value)

      expect(isCorrectType).toBeFalsy()
    })

    it('returns false if array', () => {
      const typeSpecifier = new TypeSpecifier()
      const value: string[] = []
      const isCorrectType = typeSpecifier.isObject(value)

      expect(isCorrectType).toBeFalsy()
    })

    it('returns true if object', () => {
      const typeSpecifier = new TypeSpecifier()
      const value: object = {}
      const isCorrectType = typeSpecifier.isObject(value)

      expect(isCorrectType).toBeTruthy()
    })

  })

})
