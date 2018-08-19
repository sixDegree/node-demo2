var express=require("express");
var app=express();

app.get("/",function(req,res){
	res.send("Hello word"); 	// express api -- same with: res.write("Helo word"); res.end();
});
app.get("/blocks",function(req,res){
	var blocks=["Fixed","Movable","Rotating"];
	res.send(blocks);
});
app.get("/blocks2",function(req,res){
	var blocks=["Fixed","Movable","Rotating"];
	res.json(blocks);
});
app.get("/blocks3",function(req,res){
	var blocks='<ul><li>Fixed</li><li>Movable</li><li>Rotating</li></ul>'
	res.send(blocks);
});
app.get("/go",function(req,res){
	res.redirect("index.html");
});
app.get("/go2",function(req,res){
	res.redirect(301,"index.html");
});

app.listen(1337,function(){
	console.log("Listen on port 1337");
});