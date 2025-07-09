import { Router } from 'express'
import { getAllUsers, getUserByUUID, createUser, editUserByUUID } from '../services/user'
import { validateUserData, validateUUID } from '../common/validators'

const UserController = Router()

UserController.post('', validateUserData, createUser)
UserController.get('/list', getAllUsers)
UserController.get('/:uuid', validateUUID, getUserByUUID)
UserController.put('/edit/:uuid', validateUUID, validateUserData, editUserByUUID)

export { UserController }