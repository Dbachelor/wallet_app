const express = require('express');
const router = express.Router()
const app = express();
// const bodyParser = require('body-parser')
import { TransactionController } from "../Controller/TransactionController.ts";
import { AuthMiddleware } from "../Middleware/AuthMiddleware.ts";
app.use(express.json())
const {creditWallet, debitWallet, transferfunds} = new TransactionController()



// router.get('/', (req, res)=>{
//     res.send("hello Tender")
// })
app.use(AuthMiddleware);
router.get('/credit_wallet', creditWallet);
router.post('/debit_wallet', debitWallet);
router.post('/transfer', transferfunds);


export {router as TransactionRouter};