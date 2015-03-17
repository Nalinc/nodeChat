var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server); 
var path = require('path');

var messages = [];
var users = [];

var storeMessage = function(name, data){
	messages.push({name:name,text:data});
	if(messages.length > 10){
		messages.shift();
	}
};

var storeUsers = function(name){
	users.push(name);
};

app.use(express.static(path.normalize(__dirname + '/../client')));

app.get('/',function(request,response){
	response.sendFile("index.html");
});


io.on('connection',function(client){
//	console.log('client connected');
//	client.emit('chat',{hello:'world'});

	client.on('join',function(data){
		client.name = data; //add a new property to client to identify it during deletion
		storeMessage(null,"<span style='color:green; '>"+data+" Joined the chat </span>");

		storeUsers(data);
		console.log('user ' +data+' joined!');
//		console.log(users);
		client.broadcast.emit("addUser",data);
		client.emit("addAllUsers",users);
		client.emit("addAllMessage",messages);

	});

	client.on('messageOut',function(data){
		storeMessage(data.name,data.text);
		client.broadcast.emit("AddMessage",data);
	});

	client.on("disconnect",function(){
		console.log("user "+client.name+" left..");
	    var i = users.indexOf(client.name);
	    users.splice(i, 1);
   		storeMessage(null,"<span style='color:red;'>"+client.name+" Left the chat </span>");

	    client.broadcast.emit("removeUser",client.name);
});
});




// Enables CORS
var enableCORS = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With, *');

        // intercept OPTIONS method
    if ('OPTIONS' == req.method) {
        res.send(200);
    } else {
        next();
    }
};

    // enable CORS!
    app.use(enableCORS);

//app.http().io();
//app.io.set('origins', '*:*');
    //.... other stuff
//app.listen(8080);

server.listen(8080);

console.log('listening on 8080');




