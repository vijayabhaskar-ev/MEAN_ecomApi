import { Errback, NextFunction, Request, Response } from "express";
import { User } from '../models/user'
import { compareSync } from 'bcryptjs'
import { sign } from 'jsonwebtoken'


export class UserController {


//static is used in the function because it has to be accessed in "userRoutes.ts" 
    static login(req: Request, res: Response, next: NextFunction) {
        const privatekey = process.env.PRIVATE_KEY || '';
        User.findOne({ email: req.body.email }, (err: Errback, result: any) => {
            if (err) {
                res.status(500).json({ status: "failed", message: err })
            } else {
                if (result != undefined) {
                    if (compareSync(req.body.password, result.password)) {


                        //code for generating json web token
                        const token = sign({ id: result._id }, privatekey, { expiresIn: '1h' })//this id is passing to auth.ts
                        res.json({ status: "success", message: "logooon success",role:result.role,da:result.mobile,  data: token})
                        

                    } else {
                        res.status(500).json({ status: "failed", message: 'username or password is incorrect' })

                    }
                } else {
                    res.status(500).json({ status: "failed", message: 'email is incorrect' })

                }
            }
        })
    }




    static registration(req: Request, res: Response, next: NextFunction) {

        //new userSchema.it verfies the schema of the submitedd data
        const user = new User(req.body);
        User.create(user, (err: Errback, result: any) => {
            if (err) {
                res.status(500).json({
                    status: 'failed', message: err

                })
            } else {
                res.json({
                    status: 'success',
                    message: 'registration successfull',
                    data: result
                })
            }
        })

    }


    static updateProfile(req: Request, res: Response, next: NextFunction) {

        const userId = req.body.userId; //userId comes from auth.ts  validate user


        User.findByIdAndUpdate(userId, {
            $set: {
                firstName: req.body.firstName,
                lastname: req.body.lastname,
                address: req.body.address
            }
        }, (err: Errback, result: any) => {
            if (err) {
                res.status(500).json({
                    status: 'failed', message: err

                })
            } else {
                res.json({
                    status: 'success',
                    message: 'profile updated',
                    data: result
                })
            }
        })
    }

    static getProfile(req: Request, res: Response, next: NextFunction) {
        const userId = req.body.userId
        User.findById(userId, (err: Errback, result: any) => {
            if (err) {
                res.status(500).json({
                    status: 'failed', message: err
                })
            } else {
                res.json({
                    status: 'success',
                    message: 'profile updated',
                    data: result
                })
            }
        })
    }

}