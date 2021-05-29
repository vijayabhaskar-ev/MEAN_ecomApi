import { OrderController} from "../controllers/orderController"
import * as express from 'express'

import { validateUser } from "../middleware/auth";


export const orderRoute = express.Router();




orderRoute.post("/",validateUser,OrderController.StoreOrder);
orderRoute.post("/createcheckout",validateUser,OrderController.createcheckout);
//orderRoute.get("/OrderComplete",validateUser,OrderController.OrderComplete);
//orderRoute.get("/getOrder",validateUser,OrderController.getOrder);