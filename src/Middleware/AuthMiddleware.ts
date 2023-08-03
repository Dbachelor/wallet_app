import * as express from 'express';
import { AuthService } from '../Service/AuthService.ts';
import { appDataSource } from '../app-data-source.ts';
import { User } from '../entity/user.entity.ts';
export class AuthMiddleware
{
    private authService = new AuthService()
    public async isAuthenticated(req=express.request, res = express.response, next:express.NextFunction){
        if (!req.headers.authorization){
            return res.status(403).send({message:'missing authorization header'});
        }
        let user = this.authService.getUser(req.headers.authorization.split(' ')[1]);
        let getUser = await appDataSource.getRepository(User).findOneBy({id:user.id})
        if (!getUser){
            return res.status(404).send({message:'user not found'});
        }
        return next();
    }
}