import type { Router, Request, Response } from 'express'
import express from 'express'
import response from '../../lib/lib.api.response'
import logger from '../../lib/lib.logger'

const hello: Router = express.Router()

hello.get('/', (req: Request, res: Response) => {
  logger.info('Hello World')
  return response(res, 200, undefined, 'Hello World', undefined)
})

export default hello
