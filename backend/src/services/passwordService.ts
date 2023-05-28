import applicationException from "../../util/applicationException";
import Password, {IPassword} from "../models/Password";
import * as _ from "lodash";

async function createOrUpdate(data: IPassword) {
    const result = await Password.findOneAndUpdate(
        {userId: data.userId},
        _.omit(data, 'id'),
        {new: true});
    if (!result) {
        const result = await new Password(
            {userId: data.userId, password: data.password})
            .save();
        if (result) {
            return result;
        }
    }
    return result;
}

async function authorize(data: IPassword) {
    const result = await Password.findOne(
        {userId: data.userId, password: data.password});
    if (result) {
        return true;
    }
    throw applicationException.new(applicationException.UNAUTHORIZED.code, 'User and password does not match');
}

export default {
    createOrUpdate,
    authorize,
}
