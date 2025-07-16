import { Request, Response } from 'express'
import { UserRespository, AddressRepository } from "../datasource/repositories"
import { sendBadRequest, sendError, sendOk, UserBuilder } from '../common/util'
import { UserRequest } from '../common/types/user'
import { AddressBuilder } from '../common/util/address-builder'

export async function getAllUsers(_: Request, res: Response): Promise<void> {
    try {
        const users = await UserRespository.find({
            relations: {
                address: true
            }
        })
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

export async function createUser(req: Request, res: Response): Promise<void> {

    const body = <UserRequest>req.body

    try {
        const prev = await UserRespository.findOneBy({
            email: body.email
        })

        if (prev) {
            sendBadRequest(res, {
                message: 'Esse email já está em uso.'
            })
            return
        }

        const address = AddressBuilder
            .setNumber(body.address.number)
            .setStreet(body.address.street)
            .setCity(body.address.city)
            .setState(body.address.state)
            .setDistrict(body.address.district)
            .build()

        const user = UserBuilder
            .setName(body.name)
            .setEmail(body.email)
            .setBiography(body.biography)
            .setDateOfBith(body.dateOfBirth)
            .setBase64Image(body.base64Image ? body.base64Image : '')
            .setBase64Nmae(body.base64ImageName ? body.base64ImageName : '')
            .setAddress(address)
            .build()

        await AddressRepository.save(address)
        await UserRespository.save(user)

        sendOk(res, {
            created: true
        })
    } catch (err) {
        sendError(res, {
            message: "Ocorreu um erro interno."
        })
    }
}

export async function editUserByUUID(req: Request, res: Response): Promise<void> {

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
        console.log(body)
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