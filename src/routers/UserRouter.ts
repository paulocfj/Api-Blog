import express from 'express';
import UserController from '../controllers/UserController';

const userRouter = express.Router();
const userController = new UserController();

userRouter.post('/login', userController.login);

export default userRouter;