var express = require('express');

var helper = require('../lib/major_helper');

var router = express.Router();

router.get('/', (req, res) => {
	
  res.render('major');
});

router.post('/select', (req, res) => {
  var major = req.body.major;
  var list;
  helper.list( major, (error, courses) => {
      list = courses || '';
    });

  res.render('major', {
      courses: list, major : major
    });
  
});

module.exports = router;