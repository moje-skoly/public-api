/* global process */

import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';

//
// create the app and attach the middleware
//

var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('dev'))

//
// init the API - the API itself is described in a separate file
//

import api from './api';
api(app);

// 
// run the server:
//

var port = process.env.port || 8080;
var host = process.env.host || "localhost";

app.listen(port, host, () => {
	console.log(`App is listening at http://${host}:${port}`);
});
