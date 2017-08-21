const express = require('express');
const idea = require('../models/idea.js');

const router = express.Router();

// index
router.get('/', (req, res, next) => {
  idea.all((err, value) => {
    if (err) return next(err);
    res.json(value);
  });
});

// show
router.get('/:id', (req, res, next) => {
  idea.get(req.params.id, (err, value) => {
    if (err) return next(err);
    res.json(value);
  });
});

// new
router.post('/', (req, res, next) => {
  idea.new(req.body.name, req.body.desc, req.body.rating, (err, result) => {
    if (err) return next(err);
    res.json(result.insertedId);
  });
});

// update
router.put('/:id', (req, res, next) => {
  idea.update(req.params.id, req.body.name, req.body.desc, req.body.rating, (err) => {
    if (err) return next(err);
    res.json({ success: true });
  });
});

// delete
router.delete('/:id', (req, res, next) => {
  idea.delete(req.params.id, (err) => {
    if (err) return next(err);
    res.json({ success: true });
  });
});

module.exports = router;
