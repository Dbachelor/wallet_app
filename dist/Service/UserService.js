import { appDataSource } from "../app-data-source.js";
import { User } from "../entity/user.entity.js";
export class UserService {
    async users() {
        const users = await appDataSource.getRepository(User).findBy({'role':2});
        console.log(users, '...')
        return users;
    }
    async enableUser(id) {
        const update = await appDataSource
            .createQueryBuilder()
            .update(User)
            .set({ enabled: 1 })
            .where("id = :id", { id: id })
            .execute();
        if (update)
            return 1;
        return 0;
    }
    async disableUser(id) {
        const update = await appDataSource
            .createQueryBuilder()
            .update(User)
            .set({ enabled: 1 })
            .where("id = :id", { id: id })
            .execute();
        if (update)
            return 1;
        return 0;
    }
}
