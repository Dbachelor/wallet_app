import { appDataSource } from "../app-data-source.js";
import { User } from "../entity/user.entity.js";
export class TransactionService {
    async credit(user_id, amount) {
        let user = await appDataSource.getRepository(User).findOneBy({ 'id': user_id });
        let new_balance = (user === null || user === void 0 ? void 0 : user.balance) + amount;
        const update = await appDataSource
            .createQueryBuilder()
            .update(User)
            .set({ balance: new_balance })
            .where("id = :id", { id: user_id })
            .execute();
        if (update)
            return 1;
        return 0;
    }
    async debit(user_id, amount) {
        let user = await appDataSource.getRepository(User).findOneBy({ 'id': user_id });
        if ((user === null || user === void 0 ? void 0 : user.balance) < amount)
            return 400;
        let new_balance = (user === null || user === void 0 ? void 0 : user.balance) - amount;
        const update = await appDataSource
            .createQueryBuilder()
            .update(User)
            .set({ balance: new_balance })
            .where("id = :id", { id: user_id })
            .execute();
        if (update)
            return 1;
        return 0;
    }
    async transfer(user_id, recipient_wallet_id, amount) {
        let user = await appDataSource.getRepository(User).findOneBy({ 'id': user_id });
        let recipient = await appDataSource.getRepository(User).findOneBy({ 'wallet_id': recipient_wallet_id });
        if (!recipient) {
            return 404;
        }
        if (recipient.enabled == 0) {
            return 403;
        }
        if (user.balance < amount) {
            return 401;
        }
        const update = await appDataSource
            .createQueryBuilder()
            .update(User)
            .set({ balance: user.balance - amount })
            .where("id = :id", { id: user_id })
            .execute();
        if (update) {
            const update_recipient_wallet = await appDataSource
                .createQueryBuilder()
                .update(User)
                .set({ balance: recipient.balance + amount })
                .where("id = :id", { id: recipient.id })
                .execute();
            if (update_recipient_wallet) {
                return 200;
            }
        }
        return 500;
    }
    formatResponse(code) {
        if (code == 200) {
            return ["transaction successful", true];
        }
        if (code == 500) {
            return ["something went wrong", false];
        }
        if (code == 404) {
            return ["recipient account not found", false];
        }
        if (code == 403) {
            return ["recipient wallet has been disabled", false];
        }
        if (code == 401) {
            return ["insufficient fund", false];
        }
    }
}
