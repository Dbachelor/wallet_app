import express from 'express';
const router = express.Router();
const app = express();

import { UserController } from "../Controller/UserController.js";
import { AuthMiddleware } from "../Middleware/AuthMiddleware.js";
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({
//     extended: true,
// }));
app.use(express.json())
const { index, enableUser, disableUser } = new UserController();
// router.get('/', (req, res)=>{
//     res.send("hello Tender")
// })

app.use(AuthMiddleware);
router.get('/', index);
router.post('/enable', enableUser);
router.post('/disable', disableUser);
export { router as UserRouter };
