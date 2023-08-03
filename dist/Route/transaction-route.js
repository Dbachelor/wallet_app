import express from 'express';
const router = express.Router();
const app = express();

import { TransactionController } from "../Controller/TransactionController.js";
import { AuthMiddleware } from "../Middleware/AuthMiddleware.js";
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({
//     extended: true,
// }));
app.use(express.json())
const { creditWallet, debitWallet, transferfunds } = new TransactionController();
// router.get('/', (req, res)=>{
//     res.send("hello Tender")
// })
app.use(AuthMiddleware);
router.get('/credit_wallet', creditWallet);
router.post('/debit_wallet', debitWallet);
router.post('/transfer', transferfunds);
export { router as TransactionRouter };
