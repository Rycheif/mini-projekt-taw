import * as _ from "lodash";
import applicationException from "../../util/applicationException";
import Product, {IProduct} from "../models/Product";
import userService from "./userService";

function createNewOrUpdate(product: IProduct) {
    return Promise.resolve()
        .then(() => {
            if (!product._id) {
                return new Product(product).save()
                    .then(result => {
                        if (result) {
                            return result;
                        }
                    });
            } else {
                return Product.findByIdAndUpdate(product._id, _.omit(product, 'id'), {new: true});
            }
        }).catch(error => {
            if ('ValidationError' === error.name) {
                error = error.errors[Object.keys(error.errors)[0]];
                throw applicationException.new(applicationException.BAD_REQUEST.code, error.message);
            }
            throw error;
        });
}

async function getPage(page: number, limit: number) {
    let result = await Product.find({})
        .limit(limit)
        .skip((page - 1) * limit);
    let count = await Product.countDocuments();
    if (!result) {
        throw applicationException.new(applicationException.NOT_FOUND.code, 'No products found');
    }
    return {
        count,
        result,
        totalPages: Math.ceil(count / limit),
        currentPage: page,
    };
}

async function getByName(name: string) {
    const result = await Product.find({name: name});
    if (result) {
        return result;
    }
    throw applicationException.new(applicationException.NOT_FOUND.code, 'Products not found');
}

async function getByManufacturer(manufacturer: string) {
    const result = await Product.find({manufacturer: manufacturer});
    if (result) {
        return result;
    }
    throw applicationException.new(applicationException.NOT_FOUND.code, 'Products not found');
}

async function getById(id: string) {
    const result = await Product.findOne({_id: id});
    if (result) {
        return result;
    }
    throw applicationException.new(applicationException.NOT_FOUND.code, 'Product not found');
}

function removeById(id: string) {
    return Product.deleteOne({_id: id});
}

async function getProductsFromBasket(userId: string) {
    if (null === userId || userId.length === 0) {
        throw applicationException.new(applicationException.BAD_REQUEST.code, 'User id is null or empty');
    }

    const user = await userService.getById(userId);
    const ids = user.products.map(value => value.productId);
    const result = await Product.find({_id: {$in: ids}});
    if (result) {
        return result;
    }
    throw applicationException.new(applicationException.NOT_FOUND.code, 'Products not found');
}

export default {
    createNewOrUpdate,
    getByName,
    getByManufacturer,
    getById,
    getPage,
    removeById,
    getProductsFromBasket
}
