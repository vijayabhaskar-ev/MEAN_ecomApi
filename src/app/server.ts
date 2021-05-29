import * as express from 'express';

import * as bodyParser from 'body-parser';
import * as dotenv from 'dotenv';

import { MongoConnect } from './db/db'
import { categoryroute, orderRoute,productroute, userroute ,errorRoute, wishlistRoute, cartRoute} from './routes/index'

import * as multer from "multer";

import * as helmet from 'helmet';
import  * as compression from 'compression'
const paypal = require('paypal-rest-sdk');

var cors = require('cors')
dotenv.config();      //"load " is an alias for config()







var app = express();

//the below code is for cors access
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept,x-access-token");    //checkout this line of code(all custom headers should be added here)
    res.header("Access-Control-Allow-Methods", "GET,POST,PUT");
    next();
  });


app.use(helmet());

//used to reduce the file size
app.use(compression());


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())



app.use('/user', userroute)
app.use('/category', categoryroute)
app.use('/product', productroute)
app.use('/errorLog',errorRoute)
app.use('/wishlist',wishlistRoute)
app.use('/cart',cartRoute),
app.use('/order',orderRoute)





app.listen(process.env.PORT || 3000, () => {

    MongoConnect.connect().then((res) => {
        console.log("connected to db cloud")
    });


    console.log('servers started at 3000')
})