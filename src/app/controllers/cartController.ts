import { Cart } from '../models/cart'
import { Errback, NextFunction, Request, Response } from "express";
import { Types } from 'mongoose'



export class cartController {


    //getting the data from the both the tables 2)we use lookup  because we have to get the updated producr price in the wish lish if the price chhanges
    static getCart(req: Request, res: Response, next: NextFunction) {
       Cart.aggregate([ 
        {
            $match:{userId:new Types.ObjectId(req.body.userId) ,status:'A'}
                    },
           {
             $lookup:{
                 from:'products',
                 localField:'productId',
                 foreignField:'_id',      //checkout the model(userId will be taken from the token)
                 as:'UserCart'
             }  
           }
       ],(err: Errback, result: any) => {
        if (err) {
            res.status(500).json({ status: "failed", message: err })
        } else {
            res.json({ status: "success", message: ' cart list  ', data:result  })

        }
    }) 
    }


    static saveCart(req: Request, res: Response, next: NextFunction) {
        const cart = new Cart(req.body);

        Cart.create(cart, (err: Errback, result: any) => {
            if (err) {
                res.status(500).json({ status: "failed", message: err })
            } else {
                res.json({ status: "success", message: 'product added to cart  ', data: {} })

            }
        });
    }

}