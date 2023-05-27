import mongoose, {Schema} from "mongoose";

export const userRole = {
    admin: 'admin',
    user: 'user'
}

export interface IUser {
    id?: string;
    email: string;
    login: string;
    role?: string;
    isAdmin?: boolean;
}

export interface IUserModel extends IUser, Document {

}

export const UserSchema: Schema = new Schema({
        email: {type: String, required: true, unique: true},
        login: {type: String, required: true, unique: true},
        role: {type: String, default: userRole.user, required: false},
        isAdmin: {type: Boolean, default: false, required: false}
    },
    {
        collection: "user"
    })

export default mongoose.model<IUserModel>('user', UserSchema);
