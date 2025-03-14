import express from 'express'
import type { Application } from 'express'
import cors from 'cors'
import logger from './lib/lib.logger'
// import serverKey from './middleware/server.key'
import routes from './routes'
import dotenv from 'dotenv'
import { Request, Response, NextFunction } from 'express'
import { AppError, errorHandler } from './lib/lib.error.handler'

dotenv.config()

const app: Application = express()
app.use(express.json())
app.use(cors({ origin: '*' }))
// app.use(serverKey)
app.use(routes)

app.use((req: Request, res: Response, next: NextFunction) => {
  const err = new AppError(
    `Cannot find ${req.method} ${req.url} on this server`,
    404,
    'NOT_FOUND',
  )
  next(err)
})

app.use(errorHandler)

process.on('uncaughtException', (err: Error) => {
  logger.error('UNCAUGHT EXCEPTION:', err)
  process.exit(1)
})

process.on('unhandledRejection', (err: Error) => {
  logger.error('UNHANDLED REJECTION:', err)
  process.exit(1)
})

const PORT: number = (process.env.PORT as unknown as number) || 3000

app.listen({ port: PORT }, () => {
  logger.info(`Server is running on http://localhost:${PORT}`)
})
