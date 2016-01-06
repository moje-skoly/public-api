import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import cors from 'cors';
import cfenv from 'cfenv';
// import connect from './db/connect';

//
// create the app and attach the middleware
//

var app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan('dev'))

//
// Load the API version acording to the package.json version
//


//
// init the API - the API itself is described in a separate file
//

import versions from './api';
versions.map(v => {
	const versionPrefix = `/v${v.version}`;
	app.use(versionPrefix, v.router);
	console.log(`API version ${v.version} is available at prefix '${versionPrefix}'`);
});

//
// connect to the datavase
//

// const db = connect();
// db.on('error', () => {
// 	console.error('Cannot connect to MongoDB.');
// });

// db.once('open', () => {
// 	console.log('MongoDB connection estabelished.');

	//
	// run the server:
	//


	const port = cfenv.getAppEnv().port;
	app.listen(port, '0.0.0.0', () => {
		console.log(`App is listening at port ${port}`);
	});
// });
