import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { env } from '../../config/env.js'; 
import * as UserRepo from './auth.repository.js';

export async function register(payload) {
    const existing = await UserRepo.findByUsuario(payload.usuario);
    if (existing) {
        const err = new Error('Usuario ya existe');
        err.status = 409;
        throw err;
    }
    const hash = await bcrypt.hash(payload.password, 10);
    const user = await UserRepo.createUser({
        matricula: payload.matricula,
        nombre: payload.nombre,
        apaterno: payload.apaterno,
        amaterno: payload.amaterno ?? '',
        usuario: payload.usuario,
        password: hash,
        activo: true,
    });
    return sanitize(user);
}

export async function login({ usuario, password }) {
    const existing = await UserRepo.findByUsuario(usuario);
    if (!existing || !existing.activo) {
        const err = new Error('Usuario no existe o está inactivo');
        err.status = 401;
        throw err;
    }
    const ok = await bcrypt.compare(password, existing.password);
    if (!ok) {
        const err = new Error('Contraseña incorrecta');
        err.status = 401;
        throw err;
    }
    const token = jwt.sign({ 
        userId: existing.id,
        matricula: existing.matricula,
        nombre: existing.nombre,
        apaterno: existing.apaterno,
        amaterno: existing.amaterno ?? '',
    }, env.JWT_SECRET, {
        expiresIn: env.JWT_SECRET,
    });
    return { token, user: sanitize(existing) };
}

function sanitize(user) {
    const { password, ...safe } = user;
    return safe;
}