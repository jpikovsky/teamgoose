var express = require('express');

var helper = require('../lib/course_helper');

var router = express.Router();

router.get('/', (req, res) => {
	var list;
    helper.list( (error, courses) => {
      list = courses;
    });

    res.render('courses', {
      courses: list,
    });
});

router.post('/add', (req, res) => {
	var dept = req.body.dept;
  var num = req.body.num;
  if(!dept || !num){
    req.flash('courses', 'Not enough information given');
    res.redirect('/courses')

  }else{
	var course = {dept : dept, num : num};
  helper.add(course, (error, new_course) => {
    res.redirect('/courses');
  });
}
});

router.post('/userAdd', (req, res) => {
  var dept = req.body.dept;
  var num = req.body.num;
  var user = req.session.user;
  var course = {dept : dept, num : num};

  helper.userAdd(course,user.name,(error, new_course) => {
    if(error)
      req.flash('profile',error);
    res.redirect('/profile');
  });
});

module.exports = router;