import User from "../models/User";
import * as _ from "lodash";
import applicationException from "../../util/applicationException";
import {IPassword} from "../models/Password";
import passwordService from "./passwordService";
import {IToken} from "../models/Token";
import sha1 from 'sha1';
import tokenService from "./tokenService";
import productService from "./productService";
import {IBasket} from "../models/Basket";
import {Types} from "mongoose";
export interface ICreateOrUpdateUser {
    id?: number;
    email: string;
    login: string;
    password: string;
    reEnteredPassword: string;
}

export interface IAuthUser {
    loginOrEmail: string;
    password: string;
}

export interface AddProductToBasketRequest {
    userId: string;
    productId: string;
    quantity: number;
}

export interface RemoveProductFromBasketRequest {
    userId: string;
    productId: string;
}

async function createNewOrUpdate(userData: ICreateOrUpdateUser) {
    validateUserRegistrationData(userData);
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

function validateUserRegistrationData(userData: ICreateOrUpdateUser) {
    let key: keyof ICreateOrUpdateUser;
    for (key in userData) {
        if (!userData[key]) {
            throw applicationException.new(applicationException.BAD_REQUEST.code, `${key} not present`);
        }
    }

    const {login, email, password, reEnteredPassword} = userData;
    if (login.length < 4) {
        throw applicationException.new(applicationException.BAD_REQUEST.code, `Incorrect login format`);
    }

    if (email.length === 0) {
        throw applicationException.new(applicationException.BAD_REQUEST.code, `Incorrect email format`);
    }

    if (password.length < 5 || reEnteredPassword.length === 0) {
        throw applicationException.new(applicationException.BAD_REQUEST.code, `Incorrect password format`);
    }

    if (password !== reEnteredPassword) {
        throw applicationException.new(applicationException.BAD_REQUEST.code, `Passwords are not the same`);
    }
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
    validateAuthData(userToAuthenticate);
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

function validateAuthData(userToAuthenticate: IAuthUser) {
    let key: keyof IAuthUser;
    for (key in userToAuthenticate) {
        if (!userToAuthenticate[key] || userToAuthenticate[key].length == 0) {
            throw applicationException.new(applicationException.BAD_REQUEST.code, `${key} not present`);
        }
    }
}

function getToken(token: IToken) {
    return {token: token.value};
}

async function removeHashSession(userId: string) {
    return await tokenService.remove(userId);
}

async function isUserAdmin(userId: string) {
    const result = await User.findOne({$and: [{isAdmin: true}, {_id: userId}]});
    return !!result;
}

async function addProductToUsersBasket(request: AddProductToBasketRequest) {
    const user = await getById(request.userId);
    const product = await productService.getById(request.productId);
    if (!user || !product) {
        throw applicationException.new(applicationException.NOT_FOUND.code, 'User or product with given id dont exist');
    }
    const payload: IBasket = {
        productId: request.productId,
        quantity: request.quantity
    };

    if (user.products.find(value => new Types.ObjectId(value.productId).equals(new Types.ObjectId(request.productId)))) {
        user.products.forEach(value => {
            if (new Types.ObjectId(value.productId).equals(new Types.ObjectId(request.productId))) {
                value.quantity += request.quantity;
            }
        });
    } else {
        user.products.push(payload);
    }

    return await User.findByIdAndUpdate(user.id, _.omit(user, 'id'), {new: true});
}

async function removeProductFromBasket(request: RemoveProductFromBasketRequest) {
    const user = await getById(request.userId);
    if (!user) {
        throw applicationException.new(applicationException.NOT_FOUND.code, 'User or product with given id dont exist');
    }
    user.products = user.products.filter(value => value.productId !== request.productId);
    return await User.findByIdAndUpdate(user.id, _.omit(user, 'id'), {new: true});
}

async function clearUsersBasket(userId: string) {
    const user = await getById(userId);
    if (!user) {
        throw applicationException.new(applicationException.NOT_FOUND.code, 'User or product with given id dont exist');
    }
    user.products = [];
    await User.findByIdAndUpdate(user.id, _.omit(user, 'id'), {new: true});
}

export default {
    createNewOrUpdate,
    getByEmailOrLogin,
    getById,
    removeById,
    authenticate,
    removeHashSession,
    isUserAdmin,
    addProductToUsersBasket,
    removeProductFromBasket,
    clearUsersBasket
};
