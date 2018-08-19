var express=require("express");
var app=express();

var logger=require("./logger");			// self define module
app.use(logger);
app.use(express.static("public"));

var blockMap={
	'Fixed':'Fastend securely in position',
	'Movable':'Capable of being moved',
	'Rotating':'Moving in a circle around its center'
};
var locationMap={
	'Fixed':'First Floor',
	'Movable':'Second Floor',
	'Rotating':'Penthouse'
}

app.get("/blocks",function(req,res){
	//var blocks=["Fixed","Movable","Rotating"];
	var blocks=Object.keys(blockMap);
	if(req.query.limit>=0)			// request.query.object
		res.json(blocks.slice(0,req.query.limit));
	else
		res.json(blocks);
});
app.get("/locations",function(req,res){
	res.json(Object.keys(locationMap))		//keys
});

//pre-conditions
app.param("name",function(req,res,next){
	var name=req.params.name;
	var block=name[0].toUpperCase()+name.slice(1).toLowerCase();
	req.blockName=block;
	next();		// must be called to resum request;
});
app.get("/blocks/:name",function(req,res){
	var name=req.blockName;
	var description=blockMap[name];
	if(description){
		res.json(description);
	}else{
		res.status(404).json("No description found for "+name);
	}
});
app.get("/locations/:name",function(req,res){
	var name=req.blockName;
	var description=locationMap[name];
	if(description){
		res.json(description);
	}else{
		res.status(404).json("No description found for "+name);
	}
})

var bodyParser=require("body-parser");
var parseUrlencoded=bodyParser.urlencoded({extended:false});
app.post("/blocks",parseUrlencoded,function(req,res){
	var newBlock=req.body;
	var newBlockName=newBlock.name;
	newBlockName=newBlockName[0].toUpperCase()+newBlockName.slice(1).toLowerCase();
	blockMap[newBlockName]=newBlock.description;
	res.status(201).json(newBlockName);
});
app.delete("/blocks/:name",function(req,res){
	delete blockMap[req.blockName];
	res.sendStatus(200);
});

app.listen(1337,function(){
	console.log("Listen on port 1337 ");
});