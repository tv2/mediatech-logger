# MediaTech Logger

The framework aims to facilitate the logging needs of the developers in TV2 Udviklingsteknologi, as well as creating an uniform logging strategy across Typescript and Javascript projects.

The framework consists of 3 package:

- `@tv2media/logger` contains all the common logic used by the two other packages. Note: previously this was the main package.
- `@tv2media/logger/node` contains specializations of the common logic for a Node environment – e.g. logic for storing logs in a file or printing to the terminal console.
- `@tv2media/logger/web` contains specializations of the common logic for a web browser environment – e.g. logic for sending logs over a WebSocket or printing to the developer console.

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
import { DefaultLogger } from '@tv2media/logger/node'

const logger = new DefaultLogger()

logger.info('Server started.')
logger.error('Request failed.')
logger.data(new Error('Some dangerous error!')).error('Request failed.')
```

### Usage - Advanced

```typescript
import {
    LoggerBase, // The base class Logger for custom configuration.
    Level, // The severity of the the log
    Format, // Formatting type of the log
    ColoredPlainTextFormat, // Format for colored plain-text logs
    JsonFormat, // Format for json formatted logs
    Vault, // Where to store logs
    ConsoleVault // Vault for writing to console
} from '@tv2media/logger'

const logger = DefaultLogger([
    new ConsoleVault({
        level: Level.INFO,
        format: ColoredPlainTextFormat(),
        isFormatLocked: false, // Format can be overwritten, e.g. by the EnvironmentLogger.
    }),
    new FileVault({
        level: Level.INFO,
        format: JsontFormat({ isPretty: false }),
        isFormatLocked: true, // Ensure that EnvironmentLogger doesn't overwrite the format.
    }),
])

logger.data('some-data') // Adds the key-value pair { "data": "some-data" } to a new log context.
logger.tag('some-tag') // Adds the key-value pair { "tag": "some-tag" } to a new log context.
logger.error('Server failed.') // Stores a log context with severity level of 'error'.
logger.warn('No response from client.') // Stores a log context with severity level of 'warn'.
logger.info('Server started at ip:port') // Stores a log context with severity level of 'info'.
logger.debug({ip: '0.0.0.0'}) // Stores a log context with severity level of 'debug'.
logger.trace('some trace here') // Stores a log context with severity level of 'trace'.

logger.tag('testing').info('test message')
logger.info('message', {tag: 'testing', otherMeta: 'meta'}) // Each of the severity level methods takes an optional argument, with extra attributes for the log context.

logger.meta({hostname: 'host1', author: 'me'}) // Creates a new log context with the specified meta data.

logger.setLevel(Level.info) // Set the specified level for all vaults in the logger.
```

## Environment Variables

### @tv2media/logger/node

The `DefaultLogger` is using the environment variable NODE_ENV to determine which log level and format which will be used. The current setup is the following.

```bash
NODE_ENV=production            # format = JSON, log level = warn
NODE_ENV=stage | staging       # format = JSON, log level = info
NODE_ENV=develop | development # format = PLAINTEXT, log level = debug
NODE_ENV=local                 # format = PLAINTEXT, log level = trace
NODE_ENV="any other value"     # format = PLAINTEXT, log level = trace
```

Setting the environment variable LOG_LEVEL overrides the log level from the NODE_ENV setup, this can come in handy when you need to enable e.g. debugging logs in a production environment.

### @tv2media/logger/web

The `DefaultLogger` is using the environment variable ENV to determine which log level and format which will be used. The current setup is the following.

```bash
window.env.ENV=production            # format = JSON, log level = warn
window.env.ENV=stage | staging       # format = JSON, log level = info
window.env.ENV=develop | development # format = PLAINTEXT, log level = debug
window.env.ENV=local                 # format = PLAINTEXT, log level = trace
window.env.ENV="any other value"     # format = PLAINTEXT, log level = trace
```

Setting the variable `window.env.LOG_LEVEL` overrides the log level from the `window.env.ENV` setup, this can come in handy when you need to enable e.g. debugging logs in a production environment.
