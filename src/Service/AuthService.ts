import { appDataSource } from '../app-data-source.ts';
import { User } from '../entity/user.entity.ts';
const bcrypt = require('bcrypt');
const { secret_key } = require('../config.ts');
const jwt = require('jsonwebtoken')



export class AuthService{

     public async register(email: string, name: string, password: string, role: number){
        let status = 200;
        appDataSource.getRepository(User).findBy({'email':email}).then((res)=>{
            if(res.length > 0){
                status = 400
            }else{
                let last_id: string ;
                 appDataSource.getRepository(User)
                      .createQueryBuilder('user')
                      .select('id')
                      .orderBy('user.id', 'DESC')
                      .getOne().then(data=>{
                        let current_id = (data.id) + 1;
                        last_id = 'wallet_00' + current_id;
                      })
                    appDataSource
                    .createQueryBuilder()
                    .insert()
                    .into(User)
                    .values([
                        {email:email, name:name, password: this.hashPassword(password), role:role, wallet_id:last_id}
                    ])
                    .execute().then(data => {
                        if (data){
                            status = 201;
                        }
                    })
                }
        })
        return status
    }

    public async login(email:string, password:string){
        let res:object;
         appDataSource.getRepository(User).findOneBy({"email":email}).then((data)=>{
            if(!data){  
                      
                 res = {success:true, status:404};
            }else{
                if(!this.verifyPassword(password, data.password)){
                
                    res = {success:true, status:403};
                }else{
                    let user = {
                        email:email,
                        id:data.id,
                        name:data.name,
                        role:data.role
                    }
                    const token = this.createBearerToken(user);
                    
                    // const decode = jwt.verify(token, secret_key)
                     res = {success:true, status:200, payload:user, token:token}
                }
            }
           
            
        })
        return res
    }


    private hashPassword(password: string): string{
        let salt = bcrypt.genSaltSync();
        return bcrypt.hashSync(password, salt);
    }
    
    private verifyPassword(plaintext: string, hashedPassword: string): boolean {
        return bcrypt.compareSync(plaintext, hashedPassword);
    }

    private createBearerToken(user:object){
        let token = jwt.sign(user, secret_key, {expiresIn:'50m'})
        return token;
    }

    public getUser(token: string){
        const decode = jwt.verify(token, secret_key)
        return decode;
    }

  

}