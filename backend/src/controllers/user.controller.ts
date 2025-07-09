import { Router } from 'express'
import { getAllUsers, getUserByUUID, createUser, editUserByUUID } from '../services/user'
import { validateUserData, validateUUID } from '../common/validators'
import { routes } from '../routes'

const UserController = Router()

UserController.post(routes.usuarios.children.create.path, [validateUserData, createUser])
UserController.get(routes.usuarios.children.list.path, [getAllUsers])
UserController.get(routes.usuarios.children.details.path, [validateUUID, getUserByUUID])
UserController.put(routes.usuarios.children.edit.path, [validateUUID, validateUserData, editUserByUUID])

export { UserController }