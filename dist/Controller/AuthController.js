import { AuthService } from '../Service/AuthService.js';
import * as express from 'express';
export class AuthController {
    async register(req = express.request, res = express.response) {
        let authService = new AuthService();
        const { email, name, role, password } = req.body;
        let data = await authService.register(email, name, password, role);
        if (data == 201) {
            res.status(201).send({ success: true, data: { email: email, name: name, role: role } });
        }
        else {
            res.status(data).send({ message: 'something went wrong', success: false });
        }
    }
    async login(req = express.request, res = express.response) {
        let authService = new AuthService();
        const { email, password } = req.body;
        let data = await authService.login(email, password);
        console.log(data)
        if (data.status == 200) {
            res.status(201).send({ success: true, data: { email: email, name: data.payload.name, role: data.payload.role, token: data.token } });
        }
        else {
            res.status(data['status']).send({ message: 'something went wrong', success: false });
        }
    }
}
