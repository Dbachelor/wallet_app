import { appDataSource } from "../app-data-source.ts";
import { User } from "../entity/user.entity.ts";

export class TransactionService
{

    public async credit(user_id:number,amount:number){
        let user = await appDataSource.getRepository(User).findOneBy({'id':user_id});
        let new_balance = user?.balance + amount;
        const update = await appDataSource
        .createQueryBuilder()
        .update(User)
        .set({ balance: new_balance})
        .where("id = :id", { id: user_id })
        .execute()
        if(update) return 1;
        return 0;
    }

    public async debit(user_id:number,amount:number){
        let user = await appDataSource.getRepository(User).findOneBy({'id':user_id});
        if (user?.balance < amount) return 400
        let new_balance = user?.balance - amount;
        const update = await appDataSource
        .createQueryBuilder()
        .update(User)
        .set({ balance: new_balance})
        .where("id = :id", { id: user_id })
        .execute()
        if(update) return 1;
        return 0;
    }

    public async transfer(user_id:number, recipient_wallet_id:string, amount:number){
        let user = await appDataSource.getRepository(User).findOneBy({'id':user_id})
        let recipient = await appDataSource.getRepository(User).findOneBy({'wallet_id':recipient_wallet_id});
        if (!recipient){
            return 404
        }
        if (recipient.enabled == 0){
            return 403;
        }

        if (user.balance < amount){
            return 401;
        }

        const update = await appDataSource
        .createQueryBuilder()
        .update(User)
        .set({ balance: user.balance-amount})
        .where("id = :id", { id: user_id })
        .execute();

        if (update){
            const update_recipient_wallet = await appDataSource
            .createQueryBuilder()
            .update(User)
            .set({ balance: recipient.balance + amount})
            .where("id = :id", { id: recipient.id })
            .execute()
            if (update_recipient_wallet){
                return 200
            }
        }
        return 500;
        
        
    }

    public formatResponse(code:number){
        if(code == 200){
            return ["transaction successful", true];
        }
        if(code == 500){
            return ["something went wrong", false];
        }
        if(code == 404){
            return ["recipient account not found", false];
        }
        if(code == 403){
           return ["recipient wallet has been disabled", false];
        }
        if(code == 401){
            return ["insufficient fund", false];
        }
    }

}