import {z} from 'zod';
export const loginSchema = z.object({
    usuario: z.string().min(3),
    password: z.string().min(6)
});

export const registerSchema = z.object({
    matricula: z.string().min(3),
    nombre: z.string().min(2),
    apaterno: z.string().min(2),
    amaterno: z.string().optional().default(''),
    usuario: z.string().min(3),
    password: z.string().min(6)
});