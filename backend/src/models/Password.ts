import mongoose, {Schema} from "mongoose";

export interface IPassword {
    userId: string;
    password: string;
}

export interface IPasswordModel extends IPassword, Document {

}

export const PasswordSchema: Schema = new Schema({
    userId: {type: Schema.Types.ObjectId, ref: 'user', required: true, unique: true},
    password: {type: String, required: true}
}, {
    collection: 'password'
});

export default mongoose.model<IPasswordModel>('password', PasswordSchema);
