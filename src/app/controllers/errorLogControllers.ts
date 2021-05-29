import {Error} from '../models/error'
import { Errback, NextFunction, Request, Response } from "express";


export class ErrorLogController {

    static getErrorLog(req:Request,res:Response,next:NextFunction){
        Error.find({},(err:Errback,result:any)=>{
            if (err) {
                res.status(500).json({ status: "failed", message: err })
            } else{
                res.status(500).json({ status: "success", message: 'errors found',data:result })

            }
        })
    }


static saveError(req:Request,res:Response,next:NextFunction){
    const error = new Error(req.body) ;

    Error.create(error,(err:Errback,result:any)=>{
        if (err) {
            res.status(500).json({ status: "failed", message: err })
        } else{
            res.status(500).json({ status: "success", message: 'error savede',data:{} })

        }
    });
}

}