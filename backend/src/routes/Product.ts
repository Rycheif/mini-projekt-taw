import express from "express";
import applicationException from "../../util/applicationException";
import {IProduct} from "../models/Product";
import productService from "../services/productService";


const router = express.Router();

router.post("/", async (req, res, next) => {
    try {
        const data = req.body as IProduct;
        const result = await productService.createNewOrUpdate(data);
        res.status(201).json(result).send();
    } catch (e) {
        console.error(e);
        applicationException.errorHandler(e, res);
    }
});

router.get("/:productId", async (req, res, next) => {
    try {
        const id = req.params.productId;
        const result = await productService.getById(id);
        res.status(200).json(result).send();
    } catch (e) {
        console.error(e);
        applicationException.errorHandler(e, res);
    }
});

router.get("/", async (req, res, next) => {
    try {
        const name = req.query.name as string;
        const manufacturer = req.query.manufacturer as string;
        let result;
        if (name) {
            result = await productService.getByName(name);
        } else {
            result = await productService.getByManufacturer(manufacturer);
        }
        res.status(200).json(result).send();
    } catch (e) {
        console.error(e);
        applicationException.errorHandler(e, res);
    }
});

router.get("/", async (req, res, next) => {
    try {
        const page = req.query.page as string;
        const limit = req.query.limit as string;
        const result = await productService.getPage(Number(page), Number(limit));
        res.status(200).json(result).send();
    } catch (e) {
        console.error(e);
        applicationException.errorHandler(e, res);
    }
});

router.delete("/delete/:productId", (req, res, next) => {
    try {
        const id = req.params.productId;
         productService.removeById(id);
        res.status(204).send();
    } catch (e) {
        console.error(e);
        applicationException.errorHandler(e, res);
    }
});



export default router;
