import {Schema} from "mongoose";

export interface IBasket {
    productId: string;
    quantity: number;
}

export interface IBasketModel extends IBasket, Document {

}

export const BasketSchema: Schema = new Schema({
    productId: {type: Schema.Types.ObjectId, ref: 'product', required: true, unique: true},
    quantity: {type: Number, default: 0, required: true}
});
