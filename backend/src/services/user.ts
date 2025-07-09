import { Request, Response } from 'express'
import { UserRespository, AddressRepository } from "../datasource/repositories"
import { sendBadRequest, sendError, sendOk } from '../common/util'
import { UserRequest } from '../common/types/user'

export async function getAllUsers(_: Request, res: Response) {
    try {
        const users = await UserRespository.find()
        sendOk(res, {
            users: users
        })
    } catch (err) {
        sendError(res, {
            message: "Ocorreu um erro interno."
        })
    }
}

export async function getUserByUUID(req: Request, res: Response): Promise<void> {
    try {
        const user = await UserRespository.findOne({
            where: {
                id: req.params.uuid
            },
            relations: {
                address: true
            }
        })
        sendOk(res, {
            user: user ? user : null
        })
        return

    } catch (err) {
        sendError(res, {
            message: 'Ocorreu um erro interno.'
        })
    }
}

export async function createUser(req: Request, res: Response) {

    const body = <UserRequest>req.body

    try {
        const prev = await UserRespository.findOneBy({
            name: body.name
        })

        if (prev) {
            sendBadRequest(res, {
                message: 'Esse nome já está em uso.'
            })
            return
        }

        
        await AddressRepository.save(body.address)
        await UserRespository.save(body)

        sendOk(res, {
            created: true
        })
    } catch (err) {
        sendError(res, {
            message: "Ocorreu um erro interno"
        })
    }
}

export async function editUserByUUID(req: Request, res: Response) {

    const body = <UserRequest>req.body
    const id = req.params.uuid

    try {

        const user = await UserRespository.findOne({
            where: {
                id: id
            },
            relations: {
                address: true
            }
        })

        if (!user) {
            sendBadRequest(res, {
                message: `Nenhum usuário encontrado.`
            })
            return
        }
        Object.assign(user, body)
        Object.assign(user.address, body.address)

        UserRespository.save(user)
        sendOk(res, {
            updated: true
        })
    } catch (e) {
        sendError(res, {
            message: "Ocorreu um erro interno"
        })
    }
}