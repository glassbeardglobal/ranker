const express = require('express');
const jwt = require('jsonwebtoken');

const user = require('../models/user.js');

const router = express.Router();

router.post('/', (req, res, next) => {
  user.new(req.body.username, req.body.password, false, (err, result) => {
    if (err) return next(err);
    const token = jwt.sign(result, process.env.JWT_KEY);
    res.json({ success: true, message: 'Authenticated', token });
  });
});

module.exports = router;
