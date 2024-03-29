import {config} from "./config/config";
import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import userRoutes from "./routes/User";
import productRoutes from "./routes/Product";
import basketRoutes from "./routes/Basket";
import * as http from "http";

const router = express();

mongoose.connect(config.mongo.url, {retryWrites: true, w: 'majority'})
    .then(() => {
        console.info('Connected to MongoDB');
        StartServer();
    })
    .catch((error) => {
        console.error('Unable to connect to MongoDB');
        console.error(error);
    });

function StartServer() {

    router.use((req, res, next) => {
        console.info(`Incoming -> Method: [${req.method}] - Url: [${req.url}] - IP: [${req
            .socket.remoteAddress}]`);
        res.on('finish', () => {
            console.info(`Incoming -> Method: [${req.method}] - Url: [${req.url}] - IP: [${req
                .socket.remoteAddress}] - Status: [${res.statusCode}]`);
        });

        next();
    });

    router.use(express.urlencoded({extended: true}));
    router.use(express.json());
    router.use(cors());

    router.use("/api/user", userRoutes);
    router.use("/api/product", productRoutes);
    router.use("/api/basket", basketRoutes);

    router.get('/test', (req, res, next) =>
        res.status(200).json({message: 'Server works'}));

    router.use((req, res, next) => {
        const error = new Error('Not Found');
        console.error(error);
        return res.status(404).json({message: error.message});
    });

    http.createServer(router)
        .listen(config.server.port, () =>
            console.info(`Server is running on port ${config.server.port}`));
}
