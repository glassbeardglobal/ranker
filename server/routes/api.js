const express = require('express');

const router = express.Router();

router.use('/idea', require('./idea'));
router.use('/user', require('./user'));

/* GET api page. */
router.get('/', (req, res) => {
  res.json({ success: true });
});

module.exports = router;
