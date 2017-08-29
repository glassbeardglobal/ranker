const express = require('express');

const middlewares = require('../middlewares');

const router = express.Router();

router.use('/login', require('./login'));
router.use('/join', require('./join'));

router.use(middlewares.authenticate);

router.use('/idea', require('./idea'));
router.use('/user', require('./user'));

/* GET api page. */
router.get('/', (req, res) => {
  res.json({ success: true });
});

module.exports = router;
