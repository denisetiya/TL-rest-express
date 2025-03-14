/* eslint-disable prettier/prettier */
import logger from './lib.logger'
import type { Request, Response } from 'express'
// Deklarasi interface untuk extend Error
interface IAppError extends Error {
  statusCode: number
  errorCode: string
  isOperational: boolean
}

// Deklarasi interface untuk request info
interface IRequestInfo {
  method: string
  url: string
  ip: string
  params: { [key: string]: string }
  query: { [key: string]: string | string[] }
  body: Record<string, unknown>
}

export class AppError extends Error implements IAppError {
  statusCode: number
  errorCode: string
  isOperational: boolean

  constructor(message: string, statusCode: number, errorCode: string) {
    super(message)
    this.statusCode = statusCode
    this.errorCode = errorCode
    this.isOperational = true
    Error.captureStackTrace(this, this.constructor)
  }
}

// Fungsi untuk menangani error yang dilempar
export const errorHandler = (err: Error, req: Request, res: Response): void => {
  const error: IAppError = { ...err } as IAppError
  error.message = err.message
  error.stack = err.stack

  // Log error
  logger.error(`${err.message}`, {
    error: err,
    requestInfo: {
      method: req.method,
      url: req.url,
      ip: req.ip,
      params: req.params,
      query: req.query,
      body: req.body,
    } as unknown as IRequestInfo,
  })

  // Menangani error berdasarkan tipe
  if (err.name === 'ValidationError') {
    error.statusCode = 400
    error.errorCode = 'VALIDATION_ERROR'
  } else if (err.name === 'CastError') {
    error.statusCode = 400
    error.errorCode = 'INVALID_ID'
  } else if ((err as { code?: number }).code === 11000) {
    error.statusCode = 400
    error.errorCode = 'DUPLICATE_VALUE'
  } else if (err.name === 'JsonWebTokenError') {
    error.statusCode = 401
    error.errorCode = 'INVALID_TOKEN'
  } else if (err.name === 'TokenExpiredError') {
    error.statusCode = 401
    error.errorCode = 'TOKEN_EXPIRED'
  }

  // Mengirim response error
  res.status(error.statusCode || 500).json({
    success: false,
    error: {
      message:
        process.env.NODE_ENV === 'production' &&
        !(err as IAppError).isOperational
          ? 'Something went wrong'
          : error.message,
      code: error.errorCode || 'SERVER_ERROR',
      timestamp: new Date().toISOString(),
    },
  })
}
