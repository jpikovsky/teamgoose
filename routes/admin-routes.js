var express = require('express');

// This gives us access to the user "model".
var model = require('../lib/user');

var helper = require('../lib/course_helper');
// A list of users who are online:

//var online = require('../lib/online').online;


// This creates an express "router" that allows us to separate
// particular routes from the main application.
var router = express.Router();

router.get('/', (req, res) => {
  var user = req.session.user;
  if (!user){
    req.flash('login', 'Please login as admin to go to the admin page');
    res.redirect('/user/login')
  }
  else if (!user.admin){
    req.flash('main', 'Not an Admin');
    res.redirect('/user/main')
  }
  else if (user.admin){
    res.render('admin');
  }
});

router.post('/users/create', (req, res) => {
  var name = req.body.name;
  var pass = req.body.pass;
  var admin=false;
  if (req.body.admin === 'yes'){
    admin = true;
  }
  var user = {name : name, pass : pass, admin : admin};
  model.add(user, (error, newuser) => {
    if(error){
      console.log("ERROR");
    }
    else{
      req.flash('admin-users',"User Added");
      res.redirect('/admin/users');
    }
  });
});

router.get('/users', (req, res) => {
  var user = req.session.user;
  if (!user){
    req.flash('login', 'Please login as admin to go to the admin page');
    res.redirect('/user/login')
  }
  else if (!user.admin){
    req.flash('main', 'Not an Admin');
    res.redirect('/user/main')
  }
  else if (user.admin){
    model.list( (error,arr) =>{
      if (error !== undefined){
        req.flash('main', error);
        res.redirect('/user/main');
      }
      else{
        var errmess = req.flash('admin-users') || '';
        res.render('admin-users', {users : arr, message : errmess});
      }
    });
  }
});

router.get('/courses', (req, res) => {
  var user = req.session.user;
  if (!user){
    req.flash('login', 'Please login as admin to go to the admin page');
    res.redirect('/user/login')
  }
  else if (!user.admin){
    req.flash('main', 'Not an Admin');
    res.redirect('/user/main')
  }
  else if (user.admin){
    helper.listDepartments( (err, depts) => {
      if(err){
        req.flash('admin-courses', err);
      }
      helper.listAllCourses((error, courses) => {
        if(error){
          req.flash('admin-courses', error);
        }
        res.render('admin-courses', {
          depts: depts,
          courses: courses
        });
      });
    });    
    //res.render('admin-courses');

  }
});

router.post('/courses/add', (req, res) => {
  var dept = req.body.dept;
  var num = req.body.num;
  var course = {dept : dept, num : num};

  helper.adminAdd(course, (error, new_course) => {
        if(error){
          console.log(error);
        }
        res.redirect('/admin/courses');
      });
  });


router.get('/requirements', (req, res) => {
  var user = req.session.user;
  if (!user){
    req.flash('login', 'Please login as admin to go to the admin page');
    res.redirect('/user/login')
  }
  else if (!user.admin){
    req.flash('main', 'Not an Admin');
    res.redirect('/user/main')
  }
  else if (user.admin){
    res.render('admin-requirements');
  }
});

module.exports = router;

