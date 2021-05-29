import { Product } from '../models/product'
import { Errback, NextFunction, Request, Response } from "express";
import * as multer from 'multer'

export class ProductController {

    static getProducts(req: Request, res: Response, next: NextFunction) {
        Product.find({}, (err: Errback, result: any) => {
            if (err) {
                res.status(500).json({ status: "failed", message: err })
            } else {
                res.json({ status: "success", message: 'products found', data: result })

            }
        })
    }


    static addProduct(req: Request, res: Response, next: NextFunction) {
        //for uploading the img(gettin gth e file path)

        req.body.imageUrl = process.env.IMAGE_BASE_PATH + req.file.originalname;




        const product = new Product(req.body);

        Product.create(product, (err: Errback, result: any) => {
            if (err) {
                res.status(500).json({ status: "failed", message: err })
            } else {
                res.json({ status: "success", message: 'product added', data: result })

            }
        })
    }



    static getProductByCategory(req: Request, res: Response, next: NextFunction) {
        const category = req.body.category;     //this comes from ther front end     "productservice.ts"
        //to get the estimated product count
        var productcount: Number;
        Product.find().estimatedDocumentCount().exec((err: Errback, result: any) => {
            productcount = result




            Product.find({ category: category }, (err: Errback, result: any) => {
                if (err) {
                    res.status(500).json({ status: "failed", message: err })
                } else {
                    res.json({ status: "success", message: 'product  found by category', data: result, productCount: productcount })
                }
            })


        }



        );
    }


//search function

static searchProduct(req: Request, res: Response, next: NextFunction) {
    const productName = req.body.productName;
    //to get the estimated product count
    var productcount: Number;
    Product.find().estimatedDocumentCount().exec((err: Errback, result: any) => {
        productcount = result


//0ptions:'i' is used to filter the incoming text without case sensitive. 

        Product.find({ productName: {$regex:productName,$options:'i'} }, (err: Errback, result: any) => {   //  'i'  is to disable case senitivity
            if (err) {
                res.status(500).json({ status: "failed", message: err })
            } else {
                res.json({ status: "success", message: 'product list foud', data: result, productCount: productcount })
            }
        })


    }



    );
}



    static updateProduct(req: Request, res: Response, next: NextFunction) {



        Product.findByIdAndUpdate(req.body._id, {
            $set: {
                description: req.body.description,
                price: req.body.price,
                outOfStock: req.body.outOfStock
            }
        }, (err: Errback, result: any) => {
            if (err) {
                res.status(500).json({
                    status: 'failed', message: err

                })
            } else {
                res.json({
                    status: 'success',
                    message: 'product updated',
                    data: result
                })
            }
        })
    }




    //when a user clicks a particular product,:
    static getProductById(req: Request, res: Response, next: NextFunction) {
        const productId = req.params.id;
        Product.findById( productId , (err: Errback, result: any) => {
            if (err) {
                res.status(500).json({ status: "failed blah", message: err })
            } else {
                res.json({ status: "success", message: 'product found', data: result })

            }
        })
    }

}