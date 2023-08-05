import { AuthService } from "../Service/AuthService.js";
import { TransactionService } from "../Service/TransactionService.js";
import * as express from 'express';
export class TransactionController {
    constructor() {
        this.authService = new AuthService();
        this.transactionService = new TransactionService();
        //this.user = express.request.headers.authorization && this.authService.getUser(express.request.headers.authorization.split(' ')[1]);
    }
    async creditWallet(req = express.request, res = express.response) {
        let creditUserWallet = await this.transactionService.credit(this.user.id, req.body.amount);
        let responseMsg = this.transactionService.formatResponse(creditUserWallet);
        res.status(creditUserWallet).send({ success: responseMsg[1], message: responseMsg[0] });
    }
    async debitWallet(req = express.request, res = express.response) {
        let debitUserWallet = await this.transactionService.debit(this.user.id, req.body.amount);
        let responseMsg = this.transactionService.formatResponse(debitUserWallet);
        res.status(debitUserWallet).send({ success: responseMsg[1], message: responseMsg[0] });
    }
    async transferfunds(req = express.request, res = express.response) {
        const { amount, recipient_wallet_id } = req.body;
        let transfer = await this.transactionService.transfer(this.user.id, recipient_wallet_id, amount);
        let responseMsg = this.transactionService.formatResponse(transfer);
        res.status(transfer).send({ success: responseMsg[1], message: responseMsg[0] });
    }
}
