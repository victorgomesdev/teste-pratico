import { Request, Response } from 'express'
import { sendOk } from '../common/util/send-ok'
import { UserRespository } from "../datasource/repositories"
import { AddressRepository } from '../datasource/repositories'
import { User } from '../common/types/user'
import { sendBadRequest } from '../common/util/send-bad-request'

export async function getAllUsers(_: Request, res: Response) {
    try {
        const users = await UserRespository.find()
        sendOk(res, {
            users: users
        })
    } catch (err) {
        console.log(err)
    }
}

export async function getUserByUUID(req: Request, res: Response) {
    try {
        const user = await UserRespository.findOne({
            where: {
                id: req.params.uuid
            },
            relations: {
                address: true
            }
        })

        if (user) {
            sendOk(res, {
                user: user
            })
            return
        }

        sendOk(res, {
            user: null
        })
    } catch (err) {
        console.log(err)
    }
}

export async function createUser(req: Request, res: Response) {

    const body = <User>req.body

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
        console.log(err)
    }

}

export async function editUserByUUID(req: Request, res: Response) {

    const body = <Partial<User>>req.body
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
        console.log(e)
    }
}