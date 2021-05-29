import * as Mongoose from 'mongoose';

import { genSalt, hash } from 'bcryptjs'


let address = new Mongoose.Schema({
    addressline1:String,
    addressline2:String,
    city:String,
    pin:String

})


let UserSchema = new Mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        trim: true,
        maxlength: 12
    },
    mobile: {
        type: String,
        trim: true,
        required: true
    },
    dob: {
        type: Date,
        trim: true,
        required: true
    },
    role: {
        type: String,
        trim: true,
        required: true,
        default: 'User'
    },
    address:address
});


// pre is a build in function in mongoose
UserSchema.pre('save', function (next) {
    const user: any = this;   //this refers to the current user(refer)

    if (user.isModified("password")) {
        const saltRound = 10;
        genSalt(saltRound,(err,salt)=>{
            hash(user.password,salt,(err,hash:any)=>{
                if(err){
                    throw err
                }else {
                    user.password = hash;
                    next();
                }
            })
        })

    }else{
        next();
    }
})

//exporting to usercontroller.ts
export const User = Mongoose.model('User', UserSchema)