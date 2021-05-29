import * as Mongoose from 'mongoose';
const objectId = Mongoose.Schema.Types.ObjectId;

const cartSchema = new Mongoose.Schema({
    productId: {
        type: objectId,

        required: true


    },
    userId: {
        type: objectId,

        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        default: 'A'  //"A" for active

    },
    createdOn: {          //date added on the wishlist
        type: Date,
        default: new Date()
    },
    modifiedOn: {
        type: Date
    }
});


export const Cart = Mongoose.model('cart', cartSchema)