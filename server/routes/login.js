const user = require('../models/user.js');
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const mongoUtil = require('../helpers/mongoUtil.js');
const ObjectID = require('mongodb').ObjectID;

router.post('/', function(req, res) {
  mongoUtil.getDb().collection('users').findOne({username: req.body.username}, function(err, user){
    if (err) return next(err);

    if(!user) {
      res.json({sucess: false, message: 'Authentication failed. User not found.'});
    } 
    else if(user) {
      if(user.password != req.body.password){
        res.json({success: false, message: 'Authentication failed. Wrong password.'});
      }
      else {
        var token = jwt.sign(user, 'shhhhh');
        console.log(jwt.decode('awefjiowe'));
        res.json({success: true, message: 'Authenticated', token: token});
      }
    }
  });
});

module.exports = router;