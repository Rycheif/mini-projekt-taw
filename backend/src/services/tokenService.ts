import jwt from 'jsonwebtoken';
import {config} from "../config/config";
import Token from "../models/Token";
import applicationException from "../../util/applicationException";
import userService from "./userService";

async function create(userId: string) {
    const isAdmin = await userService.isUserAdmin(userId);
    const payload = {
        userId: userId,
        isAdmin: isAdmin
    };
    const {secret, expiresIn} = config.jwt;
    const value = jwt.sign(
        payload,
        secret,
        {expiresIn: expiresIn});
    const result = await new Token({
        userId: userId,
        value: value,
        createDate: Date.now()
    }).save();
    if (result) {
        return result;
    }
    throw applicationException.new(applicationException.BAD_REQUEST.code, 'Couldn\'t create token');
}

async function getToken(tokenValue: string) {
    const result = await Token.findOne({value: tokenValue});
    if (result) {
        return result;
    }
    throw applicationException.new(applicationException.UNAUTHORIZED.code, 'Token not found');
}

async function remove(userId: string) {
    return await Token.deleteOne({userId: userId});
}

export default {
    create,
    getToken,
    remove
}
