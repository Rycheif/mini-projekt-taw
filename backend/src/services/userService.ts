import User, {IUser} from "../models/User";
import * as _ from "lodash";
import applicationException from "../../util/applicationException";

function createNewOrUpdate(user: IUser) {
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
    return User.findByIdAndRemove(id);
}

export default {
    createNewOrUpdate,
    getByEmailOrLogin,
    getById,
    removeById
}
