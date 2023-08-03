import { appDataSource } from "../app-data-source.ts";
import { User } from "../entity/user.entity.ts";

export class UserService
{

    public async users(){
        const users = await appDataSource.getRepository(User).createQueryBuilder('user').where('user.role = :role', {id:1}).getMany();
        return users;
    }

    public async enableUser(id){
      const update = await appDataSource
        .createQueryBuilder()
        .update(User)
        .set({ enabled: 1})
        .where("id = :id", { id: id })
        .execute()
        if(update) return 1;
        return 0;
    }

    public async disableUser(id){
        const update = await appDataSource
        .createQueryBuilder()
        .update(User)
        .set({ enabled: 1})
        .where("id = :id", { id: id })
        .execute()
        if(update) return 1;
        return 0;
    }

}