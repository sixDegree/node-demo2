var express=require("express");
var router=express.Router();

var blockMap={
	'Fixed':'Fastend securely in position',
	'Movable':'Capable of being moved',
	'Rotating':'Moving in a circle around its center'
};
var bodyParser=require("body-parser");
var parseUrlencoded=bodyParser.urlencoded({extended:false});

router.route('/').get(function(req,res){
	res.json(Object.keys(blockMap));
}).post(parseUrlencoded,function(req,res){
	var newBlock=req.body;
	var newBlockName=newBlock.name;
	newBlockName=newBlockName[0].toUpperCase()+newBlockName.slice(1).toLowerCase();
	blockMap[newBlockName]=newBlock.description;
	res.status(201).json(newBlockName);
});

router.route('/:name').all(function(req,res,next){
	var name=req.params.name;
	var block=name[0].toUpperCase()+name.slice(1).toLowerCase();
	req.blockName=block;
	next();	
}).get(function(req,res){
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

module.exports=router;		// exports the router as a node module