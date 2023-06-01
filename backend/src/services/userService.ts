import User from "../models/User";
import * as _ from "lodash";
import applicationException from "../../util/applicationException";
import {IPassword} from "../models/Password";
import passwordService from "./passwordService";
import {IToken} from "../models/Token";
import sha1 from 'sha1';
import tokenService from "./tokenService";

export interface ICreateOrUpdateUser {
    id?: number;
    email: string;
    login: string;
    password: string;
}

export interface IAuthUser {
    loginOrEmail: string;
    password: string;
}

async function createNewOrUpdate(userData: ICreateOrUpdateUser) {
    const user = await saveUser(userData);
    if (!user) {
        throw applicationException.new(applicationException.NOT_FOUND.code, "User was not found");
    }
    const userPassword: IPassword = {
        userId: user.id,
        password: sha1(userData.password)
    };
    await passwordService.createOrUpdate(userPassword);
    return user;
}

function saveUser(user: ICreateOrUpdateUser) {
    return Promise.resolve().then(() => {
        if (!user.id) {
            return new User(user).save().then(result => {
                if (result) {
                    return result;
                }
            });
        } else {
            return User.findByIdAndUpdate(user.id, _.omit(user, 'id'), {new: true});
        }
    }).catch(error => {
        if ('ValidationError' === error.name) {
            error = error.errors[Object.keys(error.errors)[0]];
            throw applicationException.new(applicationException.BAD_REQUEST.code, error.message);
        }
        throw error;
    });
}

async function getByEmailOrLogin(loginOrEmail: string) {
    const result = await User.findOne({$or: [{email: loginOrEmail}, {login: loginOrEmail}]});
    if (result) {
        return result;
    }
    throw applicationException.new(applicationException.NOT_FOUND.code, 'User not found');
}

async function getById(id: string) {
    const result = await User.findOne({_id: id});
    if (result) {
        return result;
    }
    throw applicationException.new(applicationException.NOT_FOUND.code, 'User not found');
}

function removeById(id: string) {
    return User.deleteOne({_id: id});
}

async function authenticate(userToAuthenticate: IAuthUser) {
    const user = await getByEmailOrLogin(userToAuthenticate.loginOrEmail);
    if (!user) {
        throw applicationException.new(applicationException.UNAUTHORIZED.code, 'User with that email does not exist');
    }
    let userData = await user;
    const userPassword: IPassword = {
        userId: user.id,
        password: sha1(userToAuthenticate.password)
    };
    await passwordService.authorize(userPassword);
    const token = await tokenService.create(userData.id);
    return getToken(token);
}

function getToken(token: IToken) {
    return {token: token.value};
}

async function removeHashSession(userId: string) {
    return await tokenService.remove(userId);
}

export default {
    createNewOrUpdate,
    getByEmailOrLogin,
    getById,
    removeById,
    authenticate,
    removeHashSession
};
