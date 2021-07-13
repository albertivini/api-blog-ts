import { Router } from 'express'
import { AuthenticateUserController } from './useCases/AuthenticateUser/AuthenticateUserController'
import { CreateUserController } from './useCases/CreateUser/CreateUserController'
import { ensureAuthenticated } from './middlewares/ensureAuthenticated'

const router = Router()

const createUserController = new CreateUserController()
const authenticateUserController = new AuthenticateUserController()

router.post('/api/users', createUserController.handle)
router.post('/api/users/login', authenticateUserController.handle)

export { router }