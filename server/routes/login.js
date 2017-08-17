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
      let error = new Error('Authentication failed. User not found.')
      next(error);
    } 
    else if(user) {
      if(user.password != req.body.password){
        let error = new Error('Authentication failed. Wrong password.');
        next(error);
      }
      else {
        var token = jwt.sign(user, process.env.JWT_KEY);
        res.json({success: true, message: 'Authenticated', token: token});
      }
    }
  });
});

module.exports = router;
