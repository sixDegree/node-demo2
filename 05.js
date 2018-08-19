var express=require("express");
var app=express();
app.use(express.static("public"));

var blocks=require("./routes/blocks");
app.use("/blocks",blocks);

app.listen(1337,function(){
	console.log("Listen on port 1337");
});
