import * as mongoose from 'mongoose';


export class MongoConnect {
    static connect(){
        const mongoDb = process.env.MONGODB_URL || "";


        return mongoose.connect(mongoDb,{ useNewUrlParser: true })
    }
}