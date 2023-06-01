import express from "express";
import userService, {IAuthUser, ICreateOrUpdateUser} from "../services/userService";
import applicationException from "../../util/applicationException";


const router = express.Router();

router.post("/", (req, res, next) => {
    try {
        const data = req.body as ICreateOrUpdateUser;
        userService.createNewOrUpdate(data);
        res.status(201).send();
    } catch (e) {
        console.error(e);
        applicationException.errorHandler(e, res);
    }
});

router.post("/auth", async (req, res, next) => {
    try {
        const data = req.body as IAuthUser;
        const token = await userService.authenticate(data);
        res.status(200).json(token).send();
    } catch (e) {
        console.error(e);
        applicationException.errorHandler(e, res);
    }
});

router.get("/", async (req, res, next) => {
    try {
        const user = req.query.user as string;
        const result = await userService.getByEmailOrLogin(user);
        res.status(200).json(result).send();
    } catch (e) {
        console.error(e);
        applicationException.errorHandler(e, res);
    }
});

router.get("/:userId", async (req, res, next) => {
    try {
        const user = req.params.userId;
        const result = await userService.getById(user);
        res.status(200).json(result).send();
    } catch (e) {
        console.error(e);
        applicationException.errorHandler(e, res);
    }
});

router.delete("/:userId", async (req, res, next) => {
    try {
        const user = req.params.userId;
        const result = await userService.removeById(user);
        res.status(204).json(result).send();
    } catch (e) {
        console.error(e);
        applicationException.errorHandler(e, res);
    }
});

router.delete("/logout/:userId", (req, res, next) => {
    try {
        const user = req.params.userId;
        userService.removeHashSession(user);
        res.status(200).send();
    } catch (e) {
        console.error(e);
        applicationException.errorHandler(e, res);
    }
});

export default router;
