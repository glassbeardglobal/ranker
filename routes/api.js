var express = require('express');
var router = express.Router();

/* GET api page. */
router.get('/', function(req, res, next) {
  res.json({success : true});
});

module.exports = router;