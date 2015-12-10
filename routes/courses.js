var express = require('express');

var helper = require('../lib/course_helper');

var router = express.Router();

router.get('/', (req, res) => {
  // Grab the session if the user is logged in.
  var user = req.session.user;

  // Redirects user to login if they are no logged in
  if (!user) {
    req.flash('login', 'You must be logged in to access your courses');
    res.redirect('/user/login');
  }
  else{
    helper.listDepartments( (err, depts) => {
      if(err){
        req.flash('courses', err);
      }
      helper.listUserCourses(user.name, (error, courses) => {
        if(error){
          req.flash('courses', error);
        }
        var message = req.flash('courses') || '';
        res.render('courses', {
          depts: depts,
          courses: courses,
          message: message,
        });
      });
    });
  }
});

router.post('/add', (req, res) => {
  // Grab the session if the user is logged in.
  var user = req.session.user;

  // Redirects user to login if they are no logged in
  if (!user) {
    req.flash('login', 'You must be logged in to access your courses');
    res.redirect('/user/login');
  }
  else{
    var dept = req.body.dept;
    var num = req.body.num;
    if(!dept || !num){
      req.flash('courses', 'Not enough information given');
      res.redirect('/courses')
    }
    else{
      var course = {dept : dept, num : num};
      helper.userAdd(course, user.name, (error, new_course) => {
        if(error){
          req.flash('courses', error);
        }
        res.redirect('/courses');
      });
    }
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

router.post('/details', (req, res) => {
  // Grab the session if the user is logged in.
  var username = req.body.username;
  helper.getCourse(req.body.dept,req.body.course,req.body.sem,(err,result)=>{
    if(err){
      req.flash('/courses',err);
      res.redirect('/courses');
    }
    else{
      var instr = result.instr;
      var descr = result.descr;
      helper.getCoursePreReqs(result.course_id,(err,result)=>{
        if(err){
          req.flash('/courses',err);
          res.redirect('/courses');
        }
        else{
          var prereqs = result;
          console.log(prereqs);
          var userCourses;
          helper.listUserCourses(username,(err,result)=>{
            if(err){
              req.flash('/courses',err);
              res.redirect('/courses');
            }
            else{
              console.log(result);
              var prereqsTaken =[];
              for(var i=0;i<prereqs.length;i++){
                var breakVal =0;
                for(var j=0;j<result.length;j++){
                  if(prereqs[i].course_id == result[j].course_id){
                    prereqsTaken.push("Yes");
                    breakVal =1;
                    break;
                  }
                  if(breakVal==0)
                    prereqsTaken.push("No");
                  
                }
                
              }

              console.log(prereqsTaken);
              res.render('course_details',{instr:instr,descr:descr,prereqs:prereqs,prereqsTaken:prereqsTaken});
            }
          });
        }
      });
    }
  });
});
module.exports = router;