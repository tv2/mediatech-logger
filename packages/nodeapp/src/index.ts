import { ColoredPlainTextFormat, DefaultLogger, FileVault, Level, Logger } from '@tv2media/node-logger'

const logger: Logger = new DefaultLogger([new FileVault({
    directory: __dirname,
    fileName: 'mylog',
    format: new ColoredPlainTextFormat(),
    isFormatLocked: false,
    level: Level.TRACE,
    useRotation: false

})])

const taggedLogger: Logger = logger.tag('hello')

logger.tag('main').data({ hello: 'world' }).info('My message')
taggedLogger.warn('popsicle')
