var jade = require("jade");
var environment = require('./config/environment.js');
var routes = require('./config/routes.js');
var io = require('socket.io');
var http = require('http');
var express = require("express");
var app = express();
var server = http.createServer(app);
var io = require('socket.io').listen(server);

environment(app, express);
routes(app);

server.listen(1234);

io.on("connection", function(socket) {
	socket.on("pub_new_score", function(data) {
		console.log(data);
		io.sockets.emit("new_score", data);
	});
});