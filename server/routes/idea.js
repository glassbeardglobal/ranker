const express = require('express');
const idea = require('../models/idea.js');
const router = express.Router();

//index
router.get('/', function(req, res) {
	idea.all(function(err, value){
		if err return next(err);
		res.json(value);
	});
});

//show
router.get('/:id', function(req, res) {
	idea.get(req.params.id, function(err, value){
		if err return next(err);
		res.json(value);
	});
});

//new
router.post('/', function(req, res) {
	idea.new(req.body.name, req.body.desc, req.body.rating, function(err, result){
		if err return next(err);
		res.json(result.insertedId);
	});
});

//update
router.put('/:id', function(req, res) {
	idea.update(req.params.id, req.body.name, req.body.desc, req.body.rating, function(err){
		if err return next(err);
		res.json({success : true});
	});
});

//delete
router.delete('/:id', function(req, res) {
  idea.delete(req.params.id, function(err){
  	if err return next(err);
  	res.json({success: true});
  });
});

module.exports = router;
