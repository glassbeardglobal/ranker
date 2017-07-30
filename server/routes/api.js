const express = require('express');
const router = express.Router();

const idea = require('./idea');
router.use('/idea', idea);

/* GET api page. */
router.get('/', function(req, res, next) {
  res.json({success : true});
});

module.exports = router;
