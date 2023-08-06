
import { appDataSource } from '../app-data-source.js';
import { defaults } from '../config.js';
import { User } from '../entity/user.entity.js';
import bcrypt from 'bcrypt'

import pkg from 'jsonwebtoken';

export class AuthService {
    async register(email, name, password, role) {
        let status = 200;
        let res = await appDataSource.getRepository(User).findBy({ 'email': email })
            if (res.length > 0) {
                status = 400;
            }
            else {
                let last_id;
                const data = await appDataSource.getRepository(User)
                    .findOne({where:{},order: {id:'desc'}})
                // console.log(data, '----')
                let current_id = data?(data.id) + 1 : 0;
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
    
        return status;
    }
    async login(email, password) {
        let res;
        let data = 
         await appDataSource.getRepository(User).findOneBy({ "email": email })
            if (!data) {
                console.log(1)
                res = { success: true, status: 404 };
                return res
            }
            else {
                console.log(2)
                if (!this.verifyPassword(password, data.password)) {
                    console.log(2.1)
                    res = { success: true, status: 403 };
                    return res
                }
                else {
                    console.log(2.2)
                    let user = {
                        email: email,
                        id: data.id,
                        name: data.name,
                        role: data.role
                    };
                    const token = this.createBearerToken(user);
                    // const decode = jwt.verify(token, secret_key)
                    res = { success: true, status: 200, payload: user, token: token };
                    return res;
                }
            }
            
   
       
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
