const express = require('express');
const router = express.Router();

router
  .use('/', require('./swagger'))
  .use('/users', require('./users'))
  .use('/appointments', require('./appointments'));
//router.use('/contacts', require('./contacts'))
//router.use('/', require('./users'));
//router.use('/appointments', require('../controllers/appointments'));

module.exports = router;