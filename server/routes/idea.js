const express = require('express');
const idea = require('../models/idea.js');
const router = express.Router();

//index
router.get('/', function(req, res) {
	idea.all(function(value){
		for(i=0; i < value.length; i++){
			delete value[i]["_id"];
		}
		console.log(value);
		res.json(value);
	});
});

//show
router.get('/:id', function(req, res) {
	idea.get(req.params.id, function(value){

		//If no idea with :id exists
		if(value.length == 0)
			res.json({success : false});
		else{
			value = value[0]; //extract object from array
			delete value["_id"];
			res.json(value);
		}
	});
});

//new
router.post('/', function(req, res) {
	idea.new(req.body.name, req.body.desc, req.body.rating);
  res.json({success : true});
});

//update
router.put('/:id', function(req, res) {
	idea.update(req.params.id, req.body.name, req.body.desc, req.body.rating);
  res.json({success : true});
});

//delete
router.delete('/:id', function(req, res) {
  idea.delete(req.params.id);
  res.json({success: true});
});

module.exports = router;
