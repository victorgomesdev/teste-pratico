import { Router } from 'express'
import { getAllUsers, getUserByUUID, createUser, editUserByUUID } from '../services/user'
import { validateUUID } from '../common/validators/validate-uuid'
import { createUserValidator } from '../common/validators/create-user-validator'

const UserController = Router()

UserController.post('', createUserValidator, createUser)
UserController.get('/list', getAllUsers)
UserController.get('/:uuid', validateUUID, getUserByUUID)
UserController.put('/edit/:uuid', validateUUID, editUserByUUID)

export { UserController }