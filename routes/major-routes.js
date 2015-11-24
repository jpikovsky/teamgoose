var express = require('express');

var helper = require('../lib/major_helper');

var router = express.Router();

router.get('/', (req, res) => {
  var major = req.query.major;
  var list = '';
	res.render('major', {
    courses: list, major : major
  });
});

router.post('/select', (req, res) => {
  var major = req.body.major;
  var list;
  helper.list( major, (error, courses) => {
      list = courses || '';
    });

  res.redirect('/major/?major=' + major);
  
});

module.exports = router;