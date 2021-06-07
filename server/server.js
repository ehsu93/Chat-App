//Import all dependencies & middleware here
import express from 'express';
import logger from 'winston';
import bodyParser from 'body-parser';
import mongoose, { isValidObjectId } from "mongoose";
import cors from 'cors';
import passport from 'passport';
import {config} from './store/config';
import { applyPassportStrategy } from './store/passport';
import { SERVER_PORT_NO, MONGO_PORT, MONGO_URL, TESTING, MONGO_DB_NAME } from './constants';
import { userController } from "./controller";
//import io from 'socket.io';

//Init Express App.

const app = express();
/*
const cors = require('cors');


if(TESTING) {
    app.options('*', cors()) // include before other routes 
    app.use(cors());
}*/

app.use(cors());

applyPassportStrategy(passport);
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());


//Dependencies

//Controllers(APIs)
app.use('/users', userController);

/*
io.on('connection', function(socket) {
    console.log('user connected');
    socket.on('chat message', function(msg) {
        io.emit('chat message', msg);
    });
    socket.on('disconnect', function() {
        console.log('user disconnected');
    });
});*/

//Start Server
app.listen(SERVER_PORT_NO, () => {
    console.log('Server is running on port ' + SERVER_PORT_NO + '!');
    mongoose.connect(MONGO_URL + MONGO_DB_NAME, { useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        console.log('Connected to mongoDB at port ' + MONGO_PORT);
    });
})