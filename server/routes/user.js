const express = require('express');
const user = require('../models/user.js');
const router = express.Router();

//index
router.get('/', function(req, res) {
  user.all(function(err, value){
    if(err) return next(err);
    res.json(value);
  });
});

//show
router.get('/:id', function(req, res) {
  user.get(req.params.id, function(err, value){
    if(err) return next(err);
    res.json(value);
  });
});

//new
router.post('/', function(req, res) {
  user.new(req.body.username, req.body.password, function(err, result){
    if(err) return next(err);
    res.json(result.insertedId);
  });
});

//update
router.put('/:id', function(req, res) {
  user.update(req.params.id, req.body.username, req.body.password, function(err){
    if(err) return next(err);
    res.json({success : true});
  });
});

//delete
router.delete('/:id', function(req, res) {
  user.delete(req.params.id, function(err){
    if(err) return next(err);
    res.json({success: true});
  });
});

module.exports = router;