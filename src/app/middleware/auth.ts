import { Errback, NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";


export function validateUser(req: Request, res: Response, next: NextFunction) {
    //validating the incoming token
    const privatekey = process.env.PRIVATE_KEY || '';

    const token: any = req.headers['x-access-token']             //this part connecting to front end  on custom interceptor


    console.log("x -access-token:"+token)
    verify(token, privatekey, (err: any, decoded: any) => {
        if (err) {
            res.status(401).json({
                status: "failed",
                message: "session expired",
                data: null
            })
        } else {
            req.body.userId = decoded.id;   //decoded.id is coming from usercontroller.ts  in login funvtion })    2)this id is also passing to userId in  order model
           console.log("userId : "+ req.body.userId )
          // console.log("x-acces tokem"+token)
            next();
        }
    })}