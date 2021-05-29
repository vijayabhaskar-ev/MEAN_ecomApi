import { wishListController} from "../controllers/wishListController"
import * as express from 'express'
import { validateUser } from "../middleware/auth";


export const wishlistRoute = express.Router();

wishlistRoute.get('/', validateUser,wishListController.getWishList);
wishlistRoute.post('/', validateUser,wishListController.saveWishList)