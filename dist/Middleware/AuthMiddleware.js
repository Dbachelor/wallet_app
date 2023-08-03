import * as express from 'express';
import { AuthService } from '../Service/AuthService.js';
import { appDataSource } from '../app-data-source.js';
import { User } from '../entity/user.entity.js';
export class AuthMiddleware {
    constructor() {
        this.authService = new AuthService();
    }
    async isAuthenticated(req = express.request, res = express.response, next) {
        if (!req.headers.authorization) {
            return res.status(403).send({ message: 'missing authorization header' });
        }
        let user = this.authService.getUser(req.headers.authorization.split(' ')[1]);
        let getUser = await appDataSource.getRepository(User).findOneBy({ id: user.id });
        if (!getUser) {
            return res.status(404).send({ message: 'user not found' });
        }
        return next();
    }
}
