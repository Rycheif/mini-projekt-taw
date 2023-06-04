import {Request} from "express";

export default function getTokenFromRequest(req: Request) {
    let token = req.headers['x-access-token'] || req.headers['authorization'] as string;
    if (token) {
        if (Array.isArray(token)) {
            token = token[0];
        }
        if (token.startsWith('Bearer ')) {
            token = token.slice(7, token.length);
        }

        return token
    }
    return null;
}
