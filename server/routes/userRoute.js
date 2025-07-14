import express from 'express'
import { getPublishedCreations, getUserCreations, getUserData, toggleLikeCreations } from '../controllers/userController.js';
// import { auth } from '../middlewares/auth.js';
import isAuthentication from '../middlewares/userAuth.js';
const userRouter = express.Router();

userRouter.get('/get-user', isAuthentication, getUserData)
userRouter.get('/get-user-creations', isAuthentication, getUserCreations)
userRouter.get('/get-published-creations', isAuthentication, getPublishedCreations)
userRouter.post('/toggle-like-creations', isAuthentication, toggleLikeCreations)

export default userRouter;