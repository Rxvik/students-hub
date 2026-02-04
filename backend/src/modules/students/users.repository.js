import { firestore } from '../../config/firebase.js';

const col = () => firestore.collection('users');

export async function createUser(data) {
    const usuarioNuevo = await col().add({
        ...data,
        activo: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    })
    const doc = await usuarioNuevo.get();
    return {
        id: doc.id,
        ...doc.data()
    }
}


export async function findByUsuario(usuario) {
    const user = await col().where('usuario', '==', usuario).limit(1).get();
    if (user.empty) return null;
    const doc = user.docs[0];
    return {
        id: doc.id,
        ...doc.data()
    }
}

export async function updateUser(id, patch) {
    const usuario = col().doc(id);
    await usuario.update(patch)({
        ...patch,
        updatedAt: new Date().toISOString()
    })
    const doc = await usuario.get();
    return {
        id: doc.id,
        ...doc.data()
    }
}

export async function softDelete(id) {
    return updateUser(id, {activo: false});
}

export async function list({q, activo, limit}) {
    let query = col().orderBy('createdAt', 'desc').limit(limit);
    if (activo === 'true') query = query.where('activo', '==', true);
    if (activo === 'false') query = query.where('activo', '==', false);

    const alumnos = await query.get();
    const items = alumnos.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }));

    if (q) {
        const term = q.toLowerCase();
        items = items.filter(
            u =>
                u.usuario?.toLowerCase().includes(term) ||
                u.nombre?.toLowerCase().includes(term) ||
                u.apaterno?.toLowerCase().includes(term) ||
                u.amaterno?.toLowerCase().includes(term)
        );
    }
    return items;
}

export async function findById(id) {
    const doc = await col().doc(id).get();
    if (!doc.exists) return null;
    return {
        id: doc.id,
        ...doc.data()
    }
}