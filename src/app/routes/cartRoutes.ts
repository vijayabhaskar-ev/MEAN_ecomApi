import { cartController} from "../controllers/cartController"
import * as express from 'express'
import { validateUser } from "../middleware/auth";


export const cartRoute = express.Router();

cartRoute.get('/', validateUser,cartController.getCart);
cartRoute.post('/', validateUser,cartController.saveCart)