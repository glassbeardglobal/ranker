const express = require('express');

const router = express.Router();

router.use('/idea', require('./idea'));
router.use('/user', require('./user'));
router.use('/ideaboard', require('./ideaboard'));

/* GET api page. */
router.get('/', (req, res) => {
  res.json({ success: true });
});

module.exports = router;
