/* eslint-disable consistent-return */
const jwt = require('jsonwebtoken');
const express = require('express');

const mongoUtil = require('../helpers/mongoUtil.js');
const cryptoUtil = require('../helpers/cryptoUtil.js');

const router = express.Router();

router.post('/', (req, res, next) => {
  mongoUtil.getDb().collection('users').findOne({ username: req.body.username }, (err, user) => {
    if (err) return next(err);

    if (!user) {
      return next(new Error('Authentication failed. User not found.'));
    } else if (user) {
      const result = cryptoUtil.getHashFromSalt(req.body.password, user.salt);
      if (user.password !== result) {
        next(new Error('Authentication failed. Wrong password.'));
      } else {
        const token = jwt.sign(user, process.env.JWT_KEY);
        res.json({ success: true, message: 'Authenticated', token });
      }
    }
  });
});

module.exports = router;
