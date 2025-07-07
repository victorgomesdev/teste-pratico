import { Request, Response, NextFunction } from 'express'

export function validateUUID (req: Request, res: Response, next: NextFunction) {

    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i

    if(uuidRegex.test(req.params.uuid)) {
        return next()
    }

    res.status(400).setHeader('Content-Type', 'application/json').send({message: 'UUID inválido.'})
}