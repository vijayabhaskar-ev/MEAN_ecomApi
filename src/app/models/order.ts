import { Schema, model } from 'mongoose';
const { v4: uuidv4 } = require('uuid');

const objectId = Schema.Types.ObjectId;




const ProductSchema = new Schema({
    _id: {
        type: String,
        required: true,
    },
    productName: {
        type: String,
        required: true,
    },
    imageUrl: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
     }
  
});


const AddressSchema = new Schema({
    addressLine1: {
        type: String,
        required: true
    },
    addressLine2: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    pin: {
        type: String,
        required: true
    }
})



const CouriesSchema = new Schema({
    courierName: {
      type: String,
    },
    trackingNumber: {
      type: String,
    },
  });


  let  orderSchema = new Schema({    //userId cmg from auth.ts(refer)
      userId:{
          type:objectId,
          required:true
      },
     shippingAddress:AddressSchema,
      products:[ProductSchema],
     // paymentInfo:PaymentSchema,
      courierInfo:CouriesSchema,
      tokenId:{
          type:String,
        required:true
         
          
      },
      total:{
          type:Number,
          required:true
      },
      status:{
          type:String,
          required:true,
          default:"placed"
      },
     
      createdOn:{
          type:Date,
          default:new Date()
      }
          
      
  }) 

  export const Order = model("Order",orderSchema);