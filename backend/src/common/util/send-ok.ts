import { Response } from 'express'

export function sendOk(res: Response, body: any) {
    res
        .status(200)
        .setHeaders(new Headers({
            "Content-Type": 'application/json'
        }))
        .send(body)
}