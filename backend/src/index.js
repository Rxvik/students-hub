import { buildApp } from './app.js';
import { env, assertEnv } from './config/env.js';

assertEnv();

const app = buildApp();
app.listen(env.port, () => {
    console.log(`StudentsHub API listening on port ${env.port}`);
});