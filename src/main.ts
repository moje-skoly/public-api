/// <reference path="../typings/tsd.d.ts" />

import * as express from 'express';
import { Express } from 'express';
var app: Express = express();

import * as passport from './authentication';

app.get('/',
    //passport.authenticate('bearer', { session: false }),
    (req, res) => {
    	res.json({
    		"app": "Naše školy",
    		"version": "0.1-alfa",
    		"website": "https://github.com/nase-skoly/public-api",
    		"authors": [
    			"Šimon Rozsíval <simon@rozsival.com>"
    		]
    	});
    }
);

var port: number = process.env.port || 8080;
var host: string = process.env.host || "localhost";

app.listen(port, host, () => {
	console.log(`App is listening at http://${host}:${port}`);
});
