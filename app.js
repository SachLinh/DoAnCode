require('dotenv').config()

const bodyParser = require('body-parser')

const express = require('express');

const logger = require('morgan');

const mongooseClient = require('mongoose');


// setup connect mongodb = mongoose
mongooseClient.connect('mongodb://localhost/nodejsbasic')
              .then(()=>console.log('Connect succees'))
              .catch((error)=> console.error(`Connect fail with ${error}`)
              )

const app = express();

const userRoute = require('./Routes/user');
const cataRoute = require('./Routes/CataRouter')
const promotionRoute = require('./Routes/PromotionRouter')
const specRoute = require('./Routes/SpecRouter')
const productRoute = require('./Routes/ProductRoute')
const { json } = require('express/lib/response');

// Middleware: chạy trước khi được xử lý, nằm giữa vc xử lý và client.
app.use(logger('dev'))
app.use(bodyParser.json())

// routes
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
    });
app.use('/users', userRoute)
app.use('/catas', cataRoute)
app.use('/promotions', promotionRoute)
app.use('/specifications', specRoute)
app.use('/products', productRoute)

// routes
app.get('/', (req, res, next)=>{
    return res.status(200).json({
        message:'sever is Ok Linh!'
    })
})

// catch 404 error
app.use((req, res, next)=>{
    const err = new Error('Not found');
    err.status = 404;
    next(err);
})

// error handle
app.use((err, req, res, next)=>{
    const error = app.get('env') === 'development' ? err : {}
    const status = err.status || 500
    // response to client
    return res.status(status).json({
        error:{
            message:error.message
        }
    })
})

// start sever
const port = app.get('port') || 5000;
app.listen(port, ()=>{
    console.log(`server is listen on port ${port}`);
})

