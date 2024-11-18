import express from 'express'
import bodyParser from 'body-parser'
import viewEngine from './config/viewEngine'
import initWebRouter from './route/web'
import connectDB from './config/connectDB'
import {userClients, connectUser} from './config/connectBroker'; 
import { forEach } from 'lodash'
require('dotenv').config()


let cors = require('cors');
let app = express()
let port = process.env.PORT || 8080


app.use(cors());
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', process.env.URL_REACT);

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    res.setHeader('Access-Control-Allow-Credentials', true);

    next();
});

// app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

viewEngine(app)
initWebRouter(app)

connectDB()

app.listen(port, () => {
  console.log(`Welcome to my iot api app, server is running at: http://localhost:${port}`)
})

connectUser('dev001')
connectUser('dev002')