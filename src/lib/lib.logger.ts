import winston, { format } from 'winston'
import dotenv from 'dotenv'
dotenv.config()

const logger = winston.createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    format.errors({ stack: true }),
    format.splat(),
    format.json(),
  ),
  defaultMeta: { app: 'api-service', env: process.env.NODE_ENV },
  transports: [
    // Tulis semua log ke console
    new winston.transports.Console({
      format: format.combine(
        format.colorize(),
        format.printf(({ timestamp, level, message, stack, ...meta }) => {
          return `${timestamp} ${level}: ${message} ${stack ? '\n' + stack : ''} ${Object.keys(meta).length ? '\n' + JSON.stringify(meta, null, 2) : ''}`
        }),
      ),
    }),
    // Tulis semua log level error ke file error.log
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    // Tulis semua log ke file combined.log
    new winston.transports.File({ filename: 'combined.log' }),
  ],
})

export default logger
