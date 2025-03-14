import { Response } from 'express'

const response = (
  res: Response,
  status: number,
  error: string | Record<string, string | number> = '',
  content: string | Record<string, string | number> = '',
  meta: string | Record<string, string | number> = '',
) => {
  return res.status(status).json({
    ...(error && { error }),
    ...(content && { content }),
    ...(meta && { meta }),
  })
}

export default response
