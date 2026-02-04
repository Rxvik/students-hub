import 'dotenv/config';

export const env = {
    port: process.env.PORT || 4000,
    CORS_ORIGIN: process.env.CORS_ORIGIN || '',
    FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
    FIREBASE_CLIENT_EMAIL: process.env.FIREBASE_CLIENT_EMAIL,
    FIREBASE_PRIVATE_KEY: process.env.FIREBASE_PRIVATE_KEY,
    JWT_SECRET: process.env.JWT_SECRET,
    JWT_SECRET_IN: process.env.JWT_EXPIRES_IN
}



export function assertEnv() {
    const required = [
        'FIREBASE_PROJECT_ID',
        'FIREBASE_CLIENT_EMAIL',
        'FIREBASE_PRIVATE_KEY',
        'JWT_SECRET',
    ]
    const missing = required.filter(variable => !process.env[variable])
    if (missing.length) throw new Error(`Missing env vars: ${missing.join(', ')}`)
}