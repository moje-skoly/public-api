/// <reference path="../typings/tsd.d.ts" />
var express = require('express');
var app = express();
app.get('/', 
//passport.authenticate('bearer', { session: false }),
function (req, res) {
    res.json({
        "app": "Naše školy",
        "version": "0.1-alfa",
        "website": "https://github.com/nase-skoly/public-api",
        "authors": [
            "Šimon Rozsíval <simon@rozsival.com>"
        ]
    });
});
var port = process.env.port || 8080;
var host = process.env.host || "localhost";
app.listen(port, host, function () {
    console.log("App is listening at http://" + host + ":" + port);
});
