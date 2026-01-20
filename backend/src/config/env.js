import dotenv from 'dotenv';

export function assertEnv() {
    const required = [
        'FIREBASE_PROJECT_ID',
        'FIREBASE_CLIENT_EMAIL',
        'FIREBASE_PRIVATE_KEY',
        'JWT_SECRET',
    ]
    const missing = required.filter(variable => !process.env[variable])
    if (missing.length) throw new Error('Missing env vars: ${missing.join(', ')}')
}