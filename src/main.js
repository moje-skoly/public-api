import express from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import cors from "cors";

//
// create the app and attach the middleware
//

var app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan("dev"));

//
// Load the API version acording to the package.json version
//

import versions from "./api";
versions.map(v => {
  const versionPrefix = `/v${v.version}`;
  app.use(versionPrefix, v.router);
  console.log(
    `API version ${v.version} is available at prefix '${versionPrefix}'`
  );
});

//
// init the API - the API itself is described in a separate file
//

const port = process.env.PORT || 6002;
app.listen(port, "0.0.0.0", () => {
  console.log(`App is listening at port ${port}`);
});
