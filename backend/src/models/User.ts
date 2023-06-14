import mongoose, {Schema} from "mongoose";
import {BasketSchema, IBasket} from "./Basket";

export const userRole = {
    admin: 'admin',
    user: 'user'
}

const userRoles = [userRole.admin, userRole.user];

export interface IUser {
    id?: string;
    email: string;
    login: string;
    role?: string;
    isAdmin?: boolean;
    products: IBasket[];
}

export interface IUserModel extends IUser, Document {

}

export const UserSchema: Schema = new Schema({
        email: {type: String, required: true, unique: true},
        login: {type: String, required: true, unique: true},
        role: {type: String, default: userRole.user, enum: userRoles, required: false},
        isAdmin: {type: Boolean, default: false, required: false},
        products: {type: [BasketSchema], required: false}
    },
    {
        collection: "user"
    })

export default mongoose.model<IUserModel>('user', UserSchema);
