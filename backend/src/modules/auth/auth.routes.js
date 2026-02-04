import { Router } from 'express';
import * as AuthController from './auth.controller.js';

export const authRouter = Router();

authRouter.post('/register', AuthController.register);
authRouter.post('/login', AuthController.login);