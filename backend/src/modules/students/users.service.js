import bcrypt from 'bcrypt';
import * as UserRepo from './users.repository.js';

export async function create(payload) {
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

export async function update(id, patch) {
    const user = await UserRepo.getbyId(id);
    if (!user) {
        const e = new Error('Usuario no encontrado');
        e.status = 404;
        throw e;
    }
    const data = {...patch};
    if (patch.password) {
        data.passwordHash = await bcrypt.hash(patch.password, 10);
        delete data.password;
    }
    const updated = await UserRepo.updateUser(id, data);
    return sanitize (user);
}

export async function remove(id, patch) {
    const user = await UserRepo.getbyId(id);
    if (!user) {
        const e = new Error('Usuario no encontrado');
        e.status = 404;
        throw e;
    }
    const updated = await UserRepo.softDelete(id);
    return sanitize (user);
}

export async function list (params) {
    const users = await UserRepo.list(params);
    return users.map(sanitize);
}

function sanitize(user) {
    const { password, ...safe } = user;
    return safe;
}

