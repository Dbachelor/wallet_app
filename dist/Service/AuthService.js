
import { appDataSource } from '../app-data-source.js';
import { defaults } from '../config.js';
import { User } from '../entity/user.entity.js';
import bcrypt from 'bcrypt'

import pkg from 'jsonwebtoken';

export class AuthService {
    async register(email, name, password, role) {
        let status = 200;
        appDataSource.getRepository(User).findBy({ 'email': email }).then((res) => {
            if (res.length > 0) {
                status = 400;
            }
            else {
                let last_id;
                const data = appDataSource.getRepository(User)
                    .createQueryBuilder('user')
                    .select('id')
                    .orderBy('user.id', 'DESC')
                    .getOne();
                let current_id = (data.id) + 1;
                last_id = 'wallet_00' + current_id;
                let create = appDataSource
                    .createQueryBuilder()
                    .insert()
                    .into(User)
                    .values([
                    { email: email, name: name, password: this.hashPassword(password), role: role, wallet_id: last_id }
                ]).execute()
                if (create){
                    status = 201;
                }
            }
        });
        return status;
    }
    async login(email, password) {
        let res;
         appDataSource.getRepository(User).findOneBy({ "email": email }).then((data) => {
            console.log(data)
            if (!data) {
                
                res = { success: true, status: 404 };
            }
            else {
                if (!this.verifyPassword(password, data.password)) {
                    res = { success: true, status: 403 };
                    return res
                }
                else {
                    let user = {
                        email: email,
                        id: data.id,
                        name: data.name,
                        role: data.role
                    };
                    const token = this.createBearerToken(user);
                    // const decode = jwt.verify(token, secret_key)
                    res = { success: true, status: 200, payload: Object.assign(Object.assign({}, user), { name: data.name, role: data.role }), token: token };
                }
            }
        });
        return res;
    }
    hashPassword(password) {
        let salt = bcrypt.genSaltSync();
        return bcrypt.hashSync(password, salt);
    }
    verifyPassword(plaintext, hashedPassword) {
        return bcrypt.compareSync(plaintext, hashedPassword);
    
    }
    createBearerToken(user) {
        let token =  pkg.sign(user, defaults.secret_key, { expiresIn: '50m' });
        return token;
    }
    getUser(token) {
        const decode = pkg.verify(token, defaults.secret_key);
        return decode;
    }
}
