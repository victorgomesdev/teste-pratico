import { Request, Response, NextFunction } from 'express'
import { routes } from '../../routes'
import { sendBadRequest } from '../util'

export function routesValidator(req: Request, res: Response, next: NextFunction): void {

    const rts = Object.entries(routes).map(r => r[1].split('/')[1])
    const path = req.path.split('/')[1]

    if (!rts.includes(path)) {
        sendBadRequest(res, {
            message: 'Essa rota não existe.'
        })
        return
    }

    next()
}