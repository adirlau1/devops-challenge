var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {  // eslint-disable-line no-unused-vars
  res.send('respond with a resource');
});

module.exports = router;
