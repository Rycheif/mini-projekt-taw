import mongoose, {Schema} from "mongoose";

export const availableCurrency = {
    pln: 'PLN',
    usd: 'USD',
    eur: 'EUR'
};

const availableCurrencies = [availableCurrency.pln, availableCurrency.usd, availableCurrency.eur];

export interface IProduct {
    id?: string;
    manufacturer: string;
    name: string;
    image: string;
    price: number;
    currency?: string;
    quantity: number;
}

export interface IProductModel {

}

export const ProductSchema: Schema = new Schema({
    name: {type: String, required: true, unique: false},
    manufacturer: {type: String, required: true, unique: false},
    image: {type: String, required: true, unique: false},
    price: {type: Number, required: true, unique: false, default: 0.0},
    currency: {type: String, required: true, unique: false, default: availableCurrency.usd, enum: availableCurrencies},
    quantity: {type: Number, required: true, unique: false, default: 0},
});

export default mongoose.model<IProductModel>('product', ProductSchema);
