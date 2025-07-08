import { Response } from 'express'
import { ErrorResponse } from '../types/error-response'

export function sendBadRequest(res: Response, body?: ErrorResponse): void {
    res.status(400)
    .setHeader('Content-Type', 'application/json')
    .send(body)
}