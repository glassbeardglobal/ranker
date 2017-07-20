const express = require('express');
const idea = require('../models/idea.js');
const router = express.Router();

//index
router.get('/', function(req, res) {
	idea.all(function(value){
		res.send(value);
	});
});

//show
router.get('/:id', function(req, res) {
	idea.get(req.params.id, function(value){
		res.send(value);
	});
});

//new
router.post('/', function(req, res) {
	idea.new(req.query.name, req.query.desc, req.query.rating);
  res.json({success : true});
});

//update
router.put('/:id', function(req, res) {
	idea.update(req.params.id, req.query.name, req.query.desc, req.query.rating);
  res.json({success : true});
});

//delete
router.delete('/:id', function(req, res) {
  idea.delete(req.params.id);
  res.json({success: true});
});

module.exports = router;
