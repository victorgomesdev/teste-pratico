import { Request, Response, NextFunction } from 'express'
import { sendBadRequest } from '../util/send-bad-request'
import { UserRequest } from '../types/user'
import { Address } from '../types/address'

export function validateUserData(req: Request, res: Response, next: NextFunction): void {

    if (!req.body) {
        sendBadRequest(res, {
            message: "Corpo da requisição inválido."
        })
        return
    }
    const body = <UserRequest>req.body
    const tests: boolean[] = [
        validateUndefinedFields(body),
        body.base64Image ? validarBase64Imagem(body.base64Image) : true,
        validateInfo(body),
        validateAddress(body.address)
    ]
    if (tests.some(t => t === false)) {
        sendBadRequest(res, {
            message: "Corpo da requisição inválido."
        })
        return
    }
    next()
}

function validateUndefinedFields(user: UserRequest): boolean {

    const keys = Object.entries(user)
    for (let k of keys) {
        if (k[1] === undefined && k[0] !== 'biography') {
            return false
        }
    }
    
    return true
}

function validateInfo(user: UserRequest): boolean {

    const dateTest = /^\d{4}-\d{2}-\d{2}$/

    const tests: boolean[] = [
        String(user.name).length > 1,
        dateTest.test(user.dateOfBirth),
        user.base64Image ? validarBase64Imagem(user.base64Image) : true
    ]

    if (tests.some(t => t === false)) {
        return false
    }
    
    return true
}

function validarBase64Imagem(base64Image: string): boolean {

    if (!base64Image.startsWith('data:image/')) {
        return false;
    }

    const base64 = base64Image.split(',')[1];

    if (!base64 || !/^[A-Za-z0-9+/]*={0,2}$/.test(base64)) {
        return false;
    }

    if (base64.length % 4 !== 0) {
        return false;
    }
    
    return true;
}

function validateAddress(address: Address): boolean {

    const tests: boolean[] = [
        String(address.city).length > 1,
        String(address.district).length > 1,
        String(address.state).length > 1,
        (typeof address.number == 'number'),
        String(address.street).length > 1
    ]

    if (tests.some(t => t === false)) {
        return false
    }
    
    return true
}