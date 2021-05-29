

import * as Mongoose from 'mongoose';

const productSchema = new Mongoose.Schema({
    productName: {
        type: String,
        trim: true,
        required: true,


    },
    category: {
        type: String,
        trim: true,
        required: true


    },
    description:{
        type: String,
        trim: true,
        required: true
    },
    imageUrl:{
        type: String,
        required:true,
        trim:true
    },
    price: {
        type: Number,

        required: true,
    },
    outofStock: {
        type: Boolean,
        default: false
    },
    isLive: {
        type: Boolean,

        default: true
    }
});


export const Product = Mongoose.model('Product', productSchema)