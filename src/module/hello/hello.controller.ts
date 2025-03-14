import type { Router, Request, Response } from 'express'
import express from 'express'
import response from '../../lib/lib.api.response'
import { Logger } from 'winston'

const hello: Router = express.Router()

hello.get('/', (req: Request, res: Response) => {
  const logger: Logger = req.app.locals.logger
  logger.info('Hello World')
  return response(res, 200, undefined, 'Hello World', undefined)
})

export default hello
