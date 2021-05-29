import { ProductController } from "../controllers/productController"
import * as express from 'express'
import {upload} from '../config/multer'


export const productroute = express.Router();

productroute.get('/',ProductController.getProducts)
productroute.get('/:id',ProductController.getProductById)


//for uploading img using multer
productroute.post("/",upload.single("file"),ProductController.addProduct);
productroute.put('/',ProductController.updateProduct);
productroute.post("/getProductByCategory",ProductController.getProductByCategory);
productroute.post("/searchProduct",ProductController.searchProduct);
