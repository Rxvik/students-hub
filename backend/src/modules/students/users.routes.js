import { Router } from 'express';
import {requiredAuth} from '../../middlewares/auth.middleware.js';
import * as Ctrl from './users.controller.js';

export const usersRoutes = Router();

usersRoutes.use(requiredAuth);

usersRoutes.get('/', Ctrl.list);
usersRoutes.get('/:id', Ctrl.getbyId);
usersRoutes.post('/', Ctrl.create);
usersRoutes.patch('/:id', Ctrl.update);
usersRoutes.delete('/:id', Ctrl.remove);