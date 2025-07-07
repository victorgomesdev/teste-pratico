import { Router } from 'express'
import { getAllUsers, getUserByUUID } from '../services/user'
import { validateUUID } from '../common/validators/validate-uuid'

const UserController = Router()

UserController.get('/lista', getAllUsers)
UserController.get('/:uuid', validateUUID, getUserByUUID)

export { UserController }