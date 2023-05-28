import mongoose, {Schema} from "mongoose";

export interface IToken {
    userId: string;
    createDate: number;
    value: string;
}

export interface ITokenModel extends IToken, Document {

}

export const TokenSchema: Schema = new Schema({
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true},
    createDate: {type: Number, required: true},
    value: {type: String, required: true}
}, {
    collection: 'token'
});

export default mongoose.model<ITokenModel>('token', TokenSchema);
