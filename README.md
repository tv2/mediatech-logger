# MediaTech Logger

The framework aims to facilitate the logging needs of the developers in TV2 Media Technology, as well as creating an uniform logging strategy across Typescript and Javascript projects.

## Install & build

The package can be installed by:

```zsh
$ yarn add @tv2media/logger
```

To build from source:

```zsh
$ git clone https://github.com/tv2/logger.git
$ cd logger
$ yarn && yarn build
```

## Usage - Simple
```typescript
import { createDefaultLogger } from '@tv2media/logger'

const logger = createDefaultLogger()

logger.info('Server started.')
logger.error('Request failed.')
```

### Usage - Advanced
```typescript
import {
  Logger,              // The base class Logger for custom configuration.
  createDefaultLogger, // Returns an instance of one of the following loggers based upon NODE_ENV.
  ProductionLogger,    // Logger used in production.
  StagingLogger,       // Logger used in staging.
  DevelopmentLogger,   // Logger used in development.
  LocalLogger,         // Logger used in local development.
  
  LogLevel,            // The severity of the 
  Format,              // Formatting type of the log
  Vault,               // Where to store logs
} from '@tv2media/logger'

const logger = new Logger({
  level: LogLevel.Info,             // .Error | .Warn | .Info | .Debug | .Trace
  format: {
    kind: Format.Custom             // .Plaintext | .JSON | .Custom
    format: (log, options) => {     // Only used for .Custom, and is custom format.
      let out = '[' + log.level + ']'
      if (options.timestamp) {
        out += '[' + new Date().toString() + ']'
      }
      return out + ' ' + data.message
    },
    timestamp: true,                // Whether or not to include timestamp.
    depth: 3n,                      // Depth to traverse in objects. Default is -1n (full depth).
  },
  vault: {                          // Where to store logs
    kind: Vault.Console,            // .Console
  },
})

logger.tag('some-tag')                   // Adds the key-value pair { "tag": "some-tag" } to a new log context.
logger.error('Sever failed.')            // Stores a log context with severity level of 'error'.
logger.warn('No response from client.')  // Stores a log context with severity level of 'warn'.
logger.info('Server started at ip:port') // Stores a log context with severity level of 'info'.
logger.debug({ ip: '0.0.0.0' })          // Stores a log context with severity level of 'debug'.
logger.info('some trace here')           // Stores a log context with severity level of 'trace'.

logger.tag('testing').info('test message')
logger.info('message', { tag: 'testing', otherMeta: 'meta' }) // Each of the severity level methods takes an optional argument, with extra attributes for the log context.
```
