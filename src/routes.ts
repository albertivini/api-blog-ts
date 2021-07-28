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
import { ShowAllArticlesController } from './useCases/ShowAllArticles/ShowAllArticlesController'
import { ShowFeedController } from './useCases/ShowFeed/ShowFeedController'
import { FavoriteArticleController } from './useCases/FavoriteArticle/FavoriteArticleController'
import { UnfavoriteArticleController } from './useCases/UnfavoriteArticle/UnfavoriteArticleController'
import { CreateCommentController } from './useCases/CreateComment/CreateCommentController'
import { DeleteCommentController } from './useCases/DeleteComment/DeleteCommentController'
import { ShowCommentsController } from './useCases/ShowComments/ShowCommentsController'

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
const showAllArticlesController = new ShowAllArticlesController()
const showFeedController = new ShowFeedController()
const favoriteArticleController = new FavoriteArticleController()
const unfavoriteArticleController = new UnfavoriteArticleController()
const createCommentController = new CreateCommentController()
const deleteCommentController = new DeleteCommentController()
const showCommentsController = new ShowCommentsController()

router.post('/api/users', createUserController.handle)
router.post('/api/users/login', authenticateUserController.handle)
router.put('/api/user', ensureAuthenticated, updateUserController.handle)
router.get('/api/user', ensureAuthenticated, showUserController.handle)
router.post('/api/profiles/:username/follow', ensureAuthenticated, followUserController.handle)
router.delete('/api/profiles/:username/unfollow', ensureAuthenticated, unfollowUserController.handle)
router.get('/api/profiles/:username', ensureAuthenticated, showProfileController.handle)
router.get('/api/articles/feed', ensureAuthenticated, showFeedController.handle)
router.post('/api/articles', ensureAuthenticated, createArticleController.handle)
router.put('/api/articles/:slug', ensureAuthenticated, updateArticleController.handle)
router.delete('/api/articles/:slug', ensureAuthenticated, deleteArticleController.handle)
router.get('/api/articles/:slug', showArticleBySlugController.handle)
router.get('/api/articles', showAllArticlesController.handle)
router.post('/api/articles/:slug/favorite', ensureAuthenticated, favoriteArticleController.handle)
router.delete('/api/articles/:slug/favorite', ensureAuthenticated, unfavoriteArticleController.handle)
router.post('/api/articles/:slug/comments', ensureAuthenticated, createCommentController.handle)
router.delete('/api/articles/:slug/comments/:id', ensureAuthenticated, deleteCommentController.handle)
router.get('/api/articles/:slug/comments', showCommentsController.handle)

export { router }