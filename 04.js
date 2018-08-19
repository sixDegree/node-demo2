var express=require("express");
var app=express();

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

var bodyParser=require("body-parser");
var parseUrlencoded=bodyParser.urlencoded({extended:false});

// blocks
app.route('/blocks').get(function(req,res){
	res.json(Object.keys(blockMap));
}).post(parseUrlencoded,function(req,res){
	var newBlock=req.body;
	var newBlockName=newBlock.name;
	newBlockName=newBlockName[0].toUpperCase()+newBlockName.slice(1).toLowerCase();
	blockMap[newBlockName]=newBlock.description;
	res.status(201).json(newBlockName);
});

app.param("name",function(req,res,next){
	var name=req.params.name;
	var block=name[0].toUpperCase()+name.slice(1).toLowerCase();
	req.blockName=block;
	next();		// must be called to resum request;
});
app.route('/blocks/:name').get(function(req,res){
	var name=req.blockName;
	var description=blockMap[name];
	if(description){
		res.json(description);
	}else{
		res.status(404).json("No description found for "+name);
	}
}).delete(function(req,res){
	delete blockMap[req.blockName];
	res.sendStatus(200);
});

// locations
app.route("/locations").get(function(req,res){
	res.json(Object.keys(locationMap))		//keys
});
app.route("/locations/:name").get(function(req,res){
	var name=req.blockName;
	var description=locationMap[name];
	if(description){
		res.json(description);
	}else{
		res.status(404).json("No description found for "+name);
	}
});

app.listen(1337,function(){
	console.log("Listen on port 1337");
});