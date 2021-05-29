
import * as Mongoose from 'mongoose';

const ErrorLogSchema = new Mongoose.Schema({
    error: {
        type: String,
        trim: true,
        required: false
        

    },
    createdOn: {
        type: Date,
        
        default: new Date()
    }
});


export const Error = Mongoose.model('ErrorLog', ErrorLogSchema)