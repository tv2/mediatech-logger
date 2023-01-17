import { DefaultLogger } from '@tv2media/web-logger'

const logger = new DefaultLogger()

logger.tag('main').data({ hello: 'world' }).info('My message')
