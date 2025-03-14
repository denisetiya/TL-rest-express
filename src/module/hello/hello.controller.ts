import type { Router, Request, Response } from 'express'
import express from 'express'
import response from '../../lib/lib.api.response'
const hello: Router = express.Router()

hello.get('/', (req: Request, res: Response) => {
  return response(res, 200, undefined, 'Hello World', undefined)
})

export default hello
