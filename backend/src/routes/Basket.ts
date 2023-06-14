import express from "express";
import auth from "../middleware/auth";
import applicationException from "../../util/applicationException";
import userService, {AddProductToBasketRequest, RemoveProductFromBasketRequest} from "../services/userService";

const router = express.Router();

router.patch('/add-product', auth, async (req, res, next) => {
    try {
        const data = req.body as AddProductToBasketRequest;
        const result = await userService.addProductToUsersBasket(data);
        res.status(200).json(result);
    } catch (e) {
        applicationException.errorHandler(e, res);
    }
});

router.patch('/remove-product', auth, async (req, res, next) => {
    try {
        const data = req.body as RemoveProductFromBasketRequest;
        const result = await userService.removeProductFromBasket(data);
        res.status(200).json(result);
    } catch (e) {
        applicationException.errorHandler(e, res);
    }
});

router.patch('/clear-users-basket/:userId', auth, async (req, res, next) => {
    try {
        const id = req.params.userId;
        await userService.clearUsersBasket(id);
        res.status(204).send();
    } catch (e) {
        applicationException.errorHandler(e, res);
    }
});

export default router;
