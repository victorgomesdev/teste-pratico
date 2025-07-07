import { Request, Response } from 'express'
import { sendOk } from '../common/util/send-ok'
import { UserRespository } from "../datasource/repositories"

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