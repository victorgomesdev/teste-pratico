import { Request, Response, NextFunction } from 'express'
import { User } from '../types/user'
import { sendBadRequest } from '../util/send-bad-request'

export function createUserValidator(req: Request, res: Response, next: NextFunction) {

    const body = <User>req.body
    if (body === undefined) {
        sendBadRequest(res, {
            message: "Requisição inválida!"
        })
        return
    }

    Object.entries(body).forEach(([key, value]) => {
        if (value === undefined) {
            sendBadRequest(res, {
                message: `Requisição inválida. O campo ${key} está incorreto.`
            })
            return
        }
    })

    next()

}