/* eslint-disable consistent-return */
const express = require('express');
const user = require('../models/user.js');

const router = express.Router();

// index
router.get('/', (req, res, next) => {
  if (!req.decoded.isAdmin) {
    const error = new Error('Access Denied: Admins only');
    error.status = 401;
    return next(error);
  }
  user.all((err, value) => {
    if (err) return next(err);
    res.json(value);
  });
});

// show
router.get('/:id', (req, res, next) => {
  if (!req.decoded.isAdmin) {
    const error = new Error('Access Denied: Admins only');
    error.status = 401;
    return next(error);
  }
  user.get(req.params.id, (err, value) => {
    if (err) return next(err);
    res.json(value);
  });
});

// new
router.post('/', (req, res, next) => {
  if (!req.decoded.isAdmin) {
    const error = new Error('Access Denied: Admins only');
    error.status = 401;
    return next(error);
  }
  user.new(req.body.username, req.body.password, false, (err, result) => {
    if (err) return next(err);
    res.json(result.insertedId);
  });
});

// update
router.put('/:id', (req, res, next) => {
  if (!req.decoded.isAdmin) {
    const error = new Error('Access Denied: Admins only');
    error.status = 401;
    return next(error);
  }
  user.update(req.params.id, req.body.username, req.body.password, (err) => {
    if (err) return next(err);
    res.json({ success: true });
  });
});

// delete
router.delete('/:id', (req, res, next) => {
  if (!req.decoded.isAdmin) {
    const error = new Error('Access Denied: Admins only');
    error.status = 401;
    return next(error);
  }
  user.delete(req.params.id, (err) => {
    if (err) return next(err);
    res.json({ success: true });
  });
});

module.exports = router;
