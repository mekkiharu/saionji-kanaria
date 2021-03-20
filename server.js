import { config } from 'dotenv';
import app from './src/app.js';

config();

await app();