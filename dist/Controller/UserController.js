import * as express from 'express';
import { UserService } from '../Service/UserService.js';
import { AuthService } from "../Service/AuthService.js";
export class UserController {
    
    constructor() {
        this.userService = new UserService();
        this.auth = new AuthService();
        this.user = express.request.headers.authorization && this.auth.getUser(express.request.headers.authorization.split(' ')[1]);
    }
    async index(req = express.request, res = express.response) {
        let uService = new UserService()
        res.status(200).send(await uService.users());
    }
    async enableUser(req = express.request, res = express.response) {
        let result = await this.userService.enableUser(this.user.id);
        if (result == 1) {
            res.status(200).send({ success: true, message: `${this.user.email} has been enabled` });
        }
        else {
            res.status(500).send({ success: false, message: ` could not disable ${this.user.email}` });
        }
    }
    async disableUser(req = express.request, res = express.response) {
        let result = await this.userService.disableUser(this.user.id);
        if (result == 1) {
            res.status(200).send({ success: true, message: `${this.user.email} has been diabled` });
        }
        else {
            res.status(500).send({ success: false, message: ` could not disable ${this.user.email}` });
        }
    }
}
