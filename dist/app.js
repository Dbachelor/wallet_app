import express from "express";
import { AuthController } from "./Controller/AuthController.js";
import { appDataSource } from "./app-data-source.js";
import { UserRouter } from "./Route/user-route.js";
import { defaults } from "./config.js";
import { TransactionRouter } from "./Route/transaction-route.js";
const { register, login } = new AuthController();
const {port} = defaults;
appDataSource
    .initialize()
    .then(() => {
    console.log("Data Source has been initialized!");
})
    .catch((err) => {
    console.error("Error during Data Source initialization:", err);
});
// create and setup express app
const app = express();
app.use(express.json());
// register routes

app.post("/register", register);
app.post('/login',  login);
app.use('/api/user', UserRouter);
app.use('/api/transaction', TransactionRouter);
app.listen(port);
