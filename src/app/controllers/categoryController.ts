import {Category} from '../models/category'
import { Errback, NextFunction, Request, Response } from "express";


export class CategoryController {

    static getCategories(req:Request,res:Response,next:NextFunction){
        Category.find({},(err:Errback,result:any)=>{
            if (err) {
                res.status(500).json({ status: "failed", message: err })
            } else{
                res.json({ status: "success", message: 'categories found',data:result })

            }
        })
    }


static saveCategories(req:Request,res:Response,next:NextFunction){
    const categories = req.body;

    Category.insertMany(categories,(err:Errback,result:any)=>{
        if (err) {
            res.status(500).json({ status: "failed", message: err })
        } else{
            res.json({ status: "success", message: 'categories added',data:result })

        }
    })
}

}