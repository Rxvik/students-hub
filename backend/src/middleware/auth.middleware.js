import jwt from 'jsonwebtoken';
import {env} from '../config/env.js';

export function requiredAuth(req, res, next) {
    const header = req.headers.authorization || '';
    const token = header.startsWith('Bearer ') ? header.slice(7) : null;

    if (!token) {
        const e = new Error('Unauthorized');
        e.statusCode = 401;
        return next(e);
    } 
    try {
        req.user = jwt.verify(token, env.JWT_SECRET);
        next();
    } catch {
        const e = new Error('Intervalid Token')
        e.statusCode = 401;
        next(e);
    } 
}



