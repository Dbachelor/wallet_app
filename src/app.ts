import * as express from "express"
import { AuthController } from "./Controller/AuthController.ts"
import { appDataSource } from "./app-data-source.ts";
import { UserRouter } from "./Route/user-route.ts";
const {port} = require('./config.js')
import { TransactionRouter } from "./Route/transaction-route.ts";
const {register, login } = new AuthController();

appDataSource
    .initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization:", err)
    })
// create and setup express app
const app = express()
app.use(express.json())

// register routes

app.post("/register",await register);
app.post('/login', await login);
app.use('/api/user', UserRouter);
app.use('/api/transaction', TransactionRouter)

app.listen(port)