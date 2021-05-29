import * as Mongoose from 'mongoose';
const objectId = Mongoose.Schema.Types.ObjectId;

const WishListSchema = new Mongoose.Schema({
    productId: {
        type: objectId,
        
        required: true
        

    },
    userId: {
        type: objectId,
        
        required: true
    },
    status:{
        type:String,
        default:'A'  //"A" for active

    },
    createdOn:{          //date added on the wishlist
        type:Date, 
        default:new Date()
    },
    modifiedOn:{
        type:Date
    }
});


export const WishList = Mongoose.model('WishList', WishListSchema)