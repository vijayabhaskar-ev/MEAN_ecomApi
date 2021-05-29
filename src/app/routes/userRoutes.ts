import { UserController } from "../controllers/usercontroller"


import * as express from "express";
import {validateUser} from "../middleware/auth"





export const userroute = express.Router();

userroute.get('/',validateUser,UserController.getProfile)
userroute.post('/login',UserController.login)
userroute.post("/registration",UserController.registration);    
userroute.put('/',validateUser,UserController.updateProfile);