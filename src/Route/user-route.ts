const express = require('express');
const router = express.Router()
const app = express();
// const bodyParser = require('body-parser')
import { UserController } from "../Controller/UserController.ts";
import { AuthMiddleware } from "../Middleware/AuthMiddleware.ts";
app.use(express.json())
const {index, enableUser, disableUser} = new UserController()



// router.get('/', (req, res)=>{
//     res.send("hello Tender")
// })
app.use(AuthMiddleware);
router.get('/', index);
router.post('/enable', enableUser);
router.post('/disable', disableUser);


export {router as UserRouter};