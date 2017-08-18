const express = require('express');
const user = require('../models/user.js');
const router = express.Router();

//index
router.get('/', function(req, res, next) {
  if(!req.decoded.isAdmin){
    let error = new Error("Access Denied: Admins only");
    error.status = 401;
    return next(error);  
  }
  user.all(function(err, value){
    if(err) return next(err);
    res.json(value);
  });
});

//show
router.get('/:id', function(req, res) {
  if(!req.decoded.isAdmin){
    let error = new Error("Access Denied: Admins only");
    error.status = 401;
    return next(error);  
  }
  user.get(req.params.id, function(err, value){
    if(err) return next(err);
    res.json(value);
  });
});

//new
router.post('/', function(req, res) {
  if(!req.decoded.isAdmin){
    let error = new Error("Access Denied: Admins only");
    error.status = 401;
    return next(error);  
  }
  user.new(req.body.username, req.body.password, false, function(err, result){
    if(err) return next(err);
    res.json(result.insertedId);
  });
});

//update
router.put('/:id', function(req, res) {
  if(!req.decoded.isAdmin){
    let error = new Error("Access Denied: Admins only");
    error.status = 401;
    return next(error);  
  }
  user.update(req.params.id, req.body.username, req.body.password, function(err){
    if(err) return next(err);
    res.json({success : true});
  });
});

//delete
router.delete('/:id', function(req, res) {
  if(!req.decoded.isAdmin){
    let error = new Error("Access Denied: Admins only");
    error.status = 401;
    return next(error);  
  }
  user.delete(req.params.id, function(err){
    if(err) return next(err);
    res.json({success: true});
  });
});

module.exports = router;