import response from '../lib/lib.api.response'
import type { NextFunction, Request, Response } from 'express'

const serverKey = (req: Request, res: Response, next: NextFunction) => {
  if (
    req.headers['server-key'] !== process.env.SERVER_KEY ||
    !req.headers['server-key']
  ) {
    return response(res, 403, 'You are not authorized', undefined)
  }
  next()
}

export default serverKey
