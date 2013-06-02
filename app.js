var express = require("express");
var jade = require("jade");
var environment = require('./config/environment.js');
var routes = require('./config/routes.js');

var app = express();

environment(app, express);
routes(app);

app.listen(1234);