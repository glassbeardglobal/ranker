/* eslint-disable consistent-return */
const express = require('express');
const ideaboard = require('../models/ideaboard.js');

const router = express.Router();

// index
router.get('/', (req, res, next) => {
  ideaboard.all((err, value) => {
    if (err) return next(err);
    res.json(value);
  });
});

// show
router.get('/:id', (req, res, next) => {
  ideaboard.get(req.params.id, (err, value) => {
    if (err) return next(err);
    res.json(value);
  });
});

// new
router.post('/', (req, res, next) => {
  ideaboard.new(req.body.name, req.decoded._id, (err, result) => {
    if (err) return next(err);
    res.json(result.insertedId);
  });
});

// update
router.put('/:id', (req, res, next) => {
  ideaboard.update(req.params.id,
    req.body.name,
    req.body.membersToAdd,
    req.body.membersToRemove,
    (err) => {
      if (err) return next(err);
      res.json({ success: true });
    });
});

// delete
router.delete('/:id', (req, res, next) => {
  ideaboard.delete(req.params.id, (err) => {
    if (err) return next(err);
    res.json({ success: true });
  });
});

module.exports = router;
