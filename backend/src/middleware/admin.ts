import jwt from "jsonwebtoken";
import {config} from "../config/config";
import {NextFunction, Request, Response} from "express";
import getTokenFromRequest from "../../util/checkToken";

function admin(req: Request, res: Response, next: NextFunction) {
    const token = getTokenFromRequest(req);
    if (!token) {
        return res.status(401).send('Access denied. No token provided.');
    }

    try {
        const decoded = jwt.verify(token, config.jwt.secret) as any;
        if (!decoded.isAdmin) {
            return res.status(403).send('Access denied.');
        }
        next();
    } catch (e) {
        res.status(400).send('Invalid token.');
    }
}

export default admin;
