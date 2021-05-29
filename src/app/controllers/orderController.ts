import { Order } from '../models/order'
import { Errback, NextFunction, request, Request, Response } from "express";
import { Types } from 'mongoose';
import { config } from 'dotenv/types';
//import { v4 as uuidv4 } from 'uuid';
const { v4: uuidv4 } = require('uuid');
const PaytmChecksum = require('paytmchecksum');
const https = require('https')

           
const stripe = require('stripe')(

    'pk_test_51INxxjEtU6RmGLk5j56jWtb4cnzbSUFKIQHtxACsRD7tXD9me0A6BFawlC7yQDhq26otMNNI5BxUdpvLkIT8MRkg00yIYWwusb'
    )

    
export class OrderController {

    
    static checkHash: any;
    static paytmChecksum: any;
//static order_id :string;
    static StoreOrder(req: Request, res: Response, next: NextFunction) {
      
       
      


      
        const order = new Order(req.body);

        Order.create(order, (err: Errback, result: any) => {
            if (err) {
                res.status(500).json({ status: "failed", message: err })
                console.log("store order Error")
            } else {





                res.json({ status: "success", message: 'order  stored in db', data: result._id })//result._id is passing to placeorder function  in payment.component.ts(it is order id)
              
                console.log("total:" + result.total * 100);









            }
        })

    

    }
  

    static async createcheckout(req: Request, res: Response, next: NextFunction) {


        
        

            



// var order: string ;
// var txnamount;
//             Order.find({ userId: req.body.userId }, (err: Errback, result: any) => {

//                 if (err) {
//                     console.log("order controller" + err)
//                     //res.status(500).json({ status: "failed", message: err })
//                 } else {

//                     //console.log("orderid from db" + result[0].orderId)
//                     order =result[0].orderId
//                     console.log("orderid from db" +order)


                
//                   //  res.json({ status: "success", message: 'order found', data: result })



//                 }
//             })

//         console.log("placeOrder")
//        // const userId = req.body.userId
//        // var total: number = 0;






    




    // static OrderComplete(req: Request, res: Response, next: NextFunction) {
    //     console.log("order completerdf")
       
    // }


    // static getOrder(req: Request, res: Response, next: NextFunction){


    //      Order.findOne({userId:req.body.userId}, (err: Errback, result: any) => {
    //         if (err) {
    //             res.status(500).json({ status: "failed", message: err })
    //         } else {
    //             console.log("get orders  "+result)
    //             res.json({ status: "success", message: 'orders found', data:result })

    //         }
    //     })

    // }

}
}