import jwt from 'jsonwebtoken';
import {NextFunction, Request, Response} from "express";
import {config} from "../config/config";
import getTokenFromRequest from "../../util/checkToken";

function auth(req: Request, res: Response, next: NextFunction) {
    const token = getTokenFromRequest(req);
    if (!token) {
        return res.status(401).send('Access denied. No token provided.');
    }

    try {
        jwt.verify(token, config.jwt.secret);
        next();
    } catch (ex) {
        res.status(400).send('Invalid token.');
    }
}

export default auth;
