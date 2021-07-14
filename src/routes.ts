import { Router } from 'express'

import { AuthenticateUserController } from './useCases/AuthenticateUser/AuthenticateUserController'
import { CreateUserController } from './useCases/CreateUser/CreateUserController'
import { ensureAuthenticated } from './middlewares/ensureAuthenticated'
import { UpdateUserController } from './useCases/UpdateUser/UpdateUserController'
import { ShowUserController } from './useCases/ShowUser/ShowUserController'

const router = Router()

const createUserController = new CreateUserController()
const authenticateUserController = new AuthenticateUserController()
const updateUserController = new UpdateUserController()
const showUserController = new ShowUserController()

router.post('/api/users', createUserController.handle)
router.post('/api/users/login', authenticateUserController.handle)
router.put('/api/user', ensureAuthenticated, updateUserController.handle)
router.get('/api/user', ensureAuthenticated, showUserController.handle)

export { router }