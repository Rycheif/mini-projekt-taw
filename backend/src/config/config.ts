import * as dotenv from 'dotenv';

dotenv.config();

const MONGO_USERNAME = process.env.MONGO_USERNAME || '';
const MONGO_PASSWORD = process.env.MONGO_PASSWORD || '';
const MONGO_URL = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@klastus.8deewuw.mongodb.net/taw_mini_projekt`

const SERVER_PORT = process.env.SERVER_PORT ? Number(process.env.SERVER_PORT) : 3000;

const JWT_SECRET = process.env.JWT_SECRET || '';
const JWT_EXPIRES_IN = '3h';

export const config = {
    mongo: {
        url: MONGO_URL
    },
    server: {
        port: SERVER_PORT
    },
    jwt: {
        secret: JWT_SECRET,
        expiresIn: JWT_EXPIRES_IN
    }
};
