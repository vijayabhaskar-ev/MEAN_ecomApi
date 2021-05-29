import * as Mongoose from 'mongoose';

const categorySchema = new Mongoose.Schema({
    categoryName: {
        type: String,
        trim: true,
        required: true,
        unique: true,

    },
    isLive: {
        type: Boolean,
        
        default: true
    }
});


export const Category = Mongoose.model('Category', categorySchema)