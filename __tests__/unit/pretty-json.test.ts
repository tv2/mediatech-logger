import { LoggerBase, Format, VaultKind, Level } from '../../src'

const logger = new LoggerBase({
  level: Level.trace,
  format: {
    timestamp: false,
    kind: Format.Plaintext,
    pretty: true,
  },
  vault: {
    kind: VaultKind.Console,
  },
})

describe('Pretty format', () => {
  beforeEach(() => {
    jest.resetModules()
    process.stdout.write = jest.fn()
  })

  afterAll(() => {
    jest.resetModules()
  })

  test('Test prettyJSON', () => {
    logger.data({ some: { data: 'here', test: 'test' } }).info('hello')
    expect(process.stdout.write).toHaveBeenLastCalledWith(
      '[info]: hello\n{\n  "some": {\n    "data": "here",\n    "test": "test"\n  }\n}\n'
    )

    logger.data({ some: { data: [{ name: 1 }, { name: 2 }, { name: 3 }], test: 'test' } }).info('hello')
    expect(process.stdout.write).toHaveBeenLastCalledWith(
      '[info]: hello\n{\n  "some": {\n    "data": [{\n        "name": 1\n      },{\n        "name": 2\n      },{\n        "name": 3\n      }],\n    "test": "test"\n  }\n}\n'
    )
  })
})
