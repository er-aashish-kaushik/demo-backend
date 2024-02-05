import express from 'express'
import { signup, login } from '../controllers/authController'
import { validateSignup, validateLogin, validateToken } from '../middlewares/authMiddlewares'
import { getUsersList } from '../controllers/userController';

const userRouter = express.Router();

userRouter.post('/signup', validateSignup, signup);
userRouter.post('/login', validateLogin, login);
userRouter.get('/users', validateToken, getUsersList);

export {
    userRouter
}