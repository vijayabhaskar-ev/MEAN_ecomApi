import { WishList } from '../models/WishList'
import { Errback, NextFunction, Request, Response } from "express";
import { Types } from 'mongoose'

export class wishListController {


    //getting the data from the both the tables 2)we use lookup  because we have to get the updated producr price in the wish lish if the price chhanges
    static getWishList(req: Request, res: Response, next: NextFunction) {
        WishList.aggregate([

            {
                $match: { userId: new Types.ObjectId(req.body.userId),status:'A' }
            },
            {
                $lookup: {
                    from: 'products',
                    localField: 'productId',
                    foreignField: '_id',      //checkout the model(userId will be taken from the token)
                    as: 'UserWishList'
                }
            }
        ], (err: Errback, result: any) => {
            if (err) {
                res.status(500).json({ status: "failed", message: err })
            } else {
                res.json({ status: "success", message: ' user wish list  ', data: result })

            }
        })
    }


    static saveWishList(req: Request, res: Response, next: NextFunction) {
        const wishlist = new WishList(req.body);

        WishList.create(wishlist, (err: Errback, result: any) => {
            if (err) {
                res.status(500).json({ status: "failed", message: err })
            } else {
                res.json({ status: "success", message: 'product added to wish list  ', data: {} })

            }
        });
    }

}