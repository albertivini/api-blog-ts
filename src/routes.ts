import { Router } from 'express'

import { AuthenticateUserController } from './useCases/AuthenticateUser/AuthenticateUserController'
import { CreateUserController } from './useCases/CreateUser/CreateUserController'
import { ensureAuthenticated } from './middlewares/ensureAuthenticated'
import { UpdateUserController } from './useCases/UpdateUser/UpdateUserController'
import { ShowUserController } from './useCases/ShowUser/ShowUserController'
import { FollowUserController } from './useCases/FollowUser/FollowUserController'
import { UnfollowUserController } from './useCases/UnfollowUser/UnfollowUserController'
import { ShowProfileController } from './useCases/ShowProfile/ShowProfileController'
import { CreateArticleController } from './useCases/CreateArticle/CreateArticleController'
import { UpdateArticleController } from './useCases/UpdateArticle/UpdateArticleController'
import { DeleteArticleController } from './useCases/DeleteArticle/DeleteArticleController'
import { ShowArticleBySlugController } from './useCases/ShowArticleBySlug/ShowArticleBySlugController'

const router = Router()

const createUserController = new CreateUserController()
const authenticateUserController = new AuthenticateUserController()
const updateUserController = new UpdateUserController()
const showUserController = new ShowUserController()
const followUserController = new FollowUserController()
const unfollowUserController = new UnfollowUserController()
const showProfileController = new ShowProfileController()
const createArticleController = new CreateArticleController()
const updateArticleController = new UpdateArticleController()
const deleteArticleController = new DeleteArticleController()
const showArticleBySlugController = new ShowArticleBySlugController()

router.post('/api/users', createUserController.handle)
router.post('/api/users/login', authenticateUserController.handle)
router.put('/api/user', ensureAuthenticated, updateUserController.handle)
router.get('/api/user', ensureAuthenticated, showUserController.handle)
router.post('/api/profiles/:username/follow', ensureAuthenticated, followUserController.handle)
router.delete('/api/profiles/:username/unfollow', ensureAuthenticated, unfollowUserController.handle)
router.get('/api/profiles/:username', ensureAuthenticated, showProfileController.handle)
router.post('/api/articles', ensureAuthenticated, createArticleController.handle)
router.put('/api/articles/:slug', ensureAuthenticated, updateArticleController.handle)
router.delete('/api/articles/:slug', ensureAuthenticated, deleteArticleController.handle)
router.get('/api/articles/:slug', showArticleBySlugController.handle)

export { router }