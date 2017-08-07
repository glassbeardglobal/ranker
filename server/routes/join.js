const user = require('../models/user.js');
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

router.post('/', function(req, res) {
  user.new(req.body.username, req.body.password, function(err, result) {
    if(err) return next(err);
    var token = jwt.sign(result, process.env.JWT_KEY);
    res.json({success: true, message: 'Authenticated', token: token});
  });
});

module.exports = router;