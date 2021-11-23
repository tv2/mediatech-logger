import { Logger, Format, Vault, LogLevel } from "../../src";

const logger = new Logger({
  level: LogLevel.Trace,
  format: {
    kind: Format.Plaintext,
    prettyJSON: true,
  },
  vault: {
    kind: Vault.Raw
  }
})

test('Test prettyJSON', () => {
  expect(logger.data({ some: { data: 'here', test: 'test' } }).info('hello')).toBe('[info]: hello\n{\n  "some": {\n    "data": "here",\n    "test": "test"\n  }\n}')
  expect(logger.data({ some: { data: [{ "name": 1 }, { "name": 2 }, { "name": 3 }], test: 'test' } }).info('hello')).toBe('[info]: hello\n{\n  "some": {\n    "data": [{\n        "name": 1\n      },{\n        "name": 2\n      },{\n        "name": 3\n      }],\n    "test": "test"\n  }\n}')
})