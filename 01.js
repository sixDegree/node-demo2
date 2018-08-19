var http=require("http");
var socket=require("socket.io");
var express=require("express");
var path = require('path');

var app=express();
var server = require('http').Server(app);
var io=socket.listen(server);
server.listen(1337);

app.get("/",function(req,res){
	res.sendFile(path.join(__dirname,'/01.html'));
});
app.use(express.static('public'));

//0:error，1:warn，2:info，3:debug
io.set('log level', 2);
io.sockets.on('connection',function(client){
	client.on('join',function(name){
		client.set('nickname',name);
		client.broadcast.emit("status",name+" joined!");
	});
	client.on('message',function(data){
		client.get('nickname',function(err,name){
			io.sockets.emit("chat",name+" : "+data);
		});
	});
	client.on('disconnect',function(name){
		client.get('nickname',function(err,name){
			client.broadcast.emit("status",name+" leaved!");
		});
	});
});
