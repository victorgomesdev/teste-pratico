import { Response } from 'express'
import { ErrorResponse } from '../types/error-response'

export function sendError(res: Response, body: ErrorResponse): void {
    res.status(500)
    .setHeader('Content-Type', 'application/json')
    .json(body)
}