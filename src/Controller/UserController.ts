
import * as express from 'express';
import { UserService } from '../Service/UserService.ts';
import { AuthService } from "../Service/AuthService.ts";

export class UserController
{
   private userService = new UserService();
   private auth = new AuthService()
   private user = express.request.headers.authorization && this.auth.getUser(express.request.headers.authorization.split(' ')[1]);

    public index(req=express.request, res=express.response){
        
        res.status(200).send(this.userService.users());
    }

    public async enableUser(req=express.request, res=express.response){
        let result = await this.userService.enableUser(this.user.id)
        if (result == 1){
            res.status(200).send({success:true, message: `${this.user.email} has been enabled`})
        }else{
            res.status(500).send({success: false, message: ` could not disable ${this.user.email}`})
        }
    }

    public async disableUser(req=express.request, res=express.response){
        let result = await this.userService.disableUser(this.user.id)
        if (result == 1){
            res.status(200).send({success:true, message: `${this.user.email} has been diabled`})
        }else{
            res.status(500).send({success: false, message: ` could not disable ${this.user.email}`})
        }
    }
}

    