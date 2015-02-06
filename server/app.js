var express = require('express');
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http) 
var path = require('path');

app.use(express.static(path.normalize(__dirname + '/../client')));

app.get('/',function(request,response){
	response.sendFile("index.html");
});

app.listen(8080);

console.log('listening on 8080');