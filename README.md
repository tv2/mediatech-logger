# MediaTech Logger

The framework aims to facilitate the logging needs of the developers in TV2 Media Technology, as well as creating an uniform logging strategy across Typescript and Javascript projects.

## Install & build

The package can be installed by:

```zsh
$ yarn add @tv2media/logger
```

To build from source:

```zsh
$ git clone https://github.com/tv2/mediatech-logger.git
$ cd mediatech-logger
$ yarn && yarn build
```

## Usage - Simple

```typescript
import { createDefaultLogger } from '@tv2media/logger'

const logger = createDefaultLogger()

logger.info('Server started.')
logger.error('Request failed.')
logger.data(new Error('Some dangerous error!')).error('Request failed.')
```

### Usage - Advanced

```typescript
import {
  Logger, // The base class Logger for custom configuration.
  createDefaultLogger, // Returns an instance of one of the following loggers based upon NODE_ENV.
  ProductionLogger, // Logger used in production.
  StagingLogger, // Logger used in staging.
  DevelopmentLogger, // Logger used in development.
  LocalLogger, // Logger used in local development.
  Level, // The severity of the
  Format, // Formatting type of the log
  Vault, // Where to store logs
} from '@tv2media/logger'

const logger = new Logger({
  level: Level.info, // .error | .warn | .info | .debug | .trace
  format: {
    kind: Format.Custom, // .Plaintext | .JSON | .Custom
    format: (log, options) => {
      // Only used for .Custom, and is custom format.
      let out = '[' + log.level + ']'
      if (options.timestamp) {
        out += '[' + new Date().toString() + ']'
      }
      return out + ' ' + data.message
    },
    timestamp: true, // Whether or not to include timestamp.
    depth: 3n, // Depth to traverse in objects. Default is -1n (full depth).
  },
  vault: {
    // Where to store logs
    kind: Vault.Console, // .Console
  },
})

logger.data('some-data') // Adds the key-value pair { "data": "some-data" } to a new log context.
logger.tag('some-tag') // Adds the key-value pair { "tag": "some-tag" } to a new log context.
logger.error('Server failed.') // Stores a log context with severity level of 'error'.
logger.warn('No response from client.') // Stores a log context with severity level of 'warn'.
logger.info('Server started at ip:port') // Stores a log context with severity level of 'info'.
logger.debug({ ip: '0.0.0.0' }) // Stores a log context with severity level of 'debug'.
logger.trace('some trace here') // Stores a log context with severity level of 'trace'.

logger.tag('testing').info('test message')
logger.info('message', { tag: 'testing', otherMeta: 'meta' }) // Each of the severity level methods takes an optional argument, with extra attributes for the log context.

logger.meta({ hostname: 'host1', author: 'me' }) // Creates a new log context with the specified meta data.

logger.setLevel(Level.info) // Set the specified level for all vaults in the logger.
```

## Environment Variables

### NODE_ENV

The createDefaultLogger is using the environment variable NODE_ENV to determine which log level and format which will be used. The current setup is the following.

```bash
NODE_ENV=production            # fomat = JSON, log level = warn
NODE_ENV=stage | staging       # format = JSON, log level = info
NODE_ENV=develop | development # fomat = PLAINTEXT, log level = debug
NODE_ENV=local                 # fomat = PLAINTEXT, log level = trace
NODE_ENV="any other value"     # fomat = PLAINTEXT, log level = trace
```

### LOG_LEVEL

Setting the environment variable LOG_LEVEL overrides the log level from the NODE_ENV setup, this can come in handy when you need to enable e.g. debugging logs in a production environment.

```typescript
function getLevel(): Level | undefined {
  switch (process.env.LOG_LEVEL?.toLowerCase()) {
    case 'error':
      return Level.error
    case 'warn':
      return Level.warn
    case 'info':
      return Level.info
    case 'debug':
      return Level.debug
    case 'trace':
      return Level.trace
    default:
      return undefined
  }
}
```
