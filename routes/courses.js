var express = require('express');

var helper = require('../lib/course_helper');

var router = express.Router();

router.get('/', (req, res) => {
  // Grab the session if the user is logged in.
  var user = req.session.user;
  var dept = req.query.dept || req.body.dept;
  console.log("Dept = "+dept);
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
      else{
        helper.listUserCourses(user.name, (error, user_courses) => {
          if(error){
           req.flash('courses', error);
           return;
         }
         else{
          if(dept===undefined){
            var message = req.flash('courses') || '';
            res.render('courses', {
             depts: depts,
             user_courses: user_courses,
             message: message,
             user:user.name,
             admin:user.admin
           });
          }
          else{
            helper.listDeptCourses(dept, (error, courses) => {
              if(error){
                req.flash('courses', error);
                return;
              }
              else{
                var message = req.flash('courses') || '';

                res.render('courses', {
                  dept: dept,
                  depts: depts,
                  user_courses: user_courses,
                  courses,courses,
                  message: message,
                  user:user.name,
                  admin:user.admin
                });
              }
            });
          }
        }
          });
        }
});
}
});

router.post('/select', (req, res) => {
  // console.log(req.body);
  // console.log(req.body.selection);
    var dept = req.body.dept;
    res.redirect('/courses/?dept='+dept);
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
    console.log("add course "+num);
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


  var username = req.body.username;
  helper.listAllCourses((err,courses)=>{
    if(err){
      internalServerError500(err,req,res);
    }
    else{
      helper.listDepartments((err,depts)=>{
        if(err){
          internalServerError500(err,req,res);
        }
        else{
          helper.getCourse(req.body.dept,req.body.course,(err,result)=>{
            if(err){
              req.flash('/courses',err);
              res.redirect('/courses');
            }
            else{
              var instr = result.instr;
              var descr = result.descr;
              helper.getCoursePreReqs(result.course_id,(err,result)=>{
                if(err){
                  req.flash('/courses/details',err);
                  res.redirect('/courses/details');
                }
                else{
                  var prereqs = result;
                  var userCourses;
                  helper.listUserCourses(username,(err,result)=>{
                    if(err){
                      req.flash('/courses/details',err);
                      res.redirect('/courses/details');
                    }
                    else{
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

                      res.render('course_details',{instr:instr,descr:descr,prereqs:prereqs,prereqsTaken:prereqsTaken,courses:courses,depts:depts,user:username,depart:req.body.dept,cour:req.body.course});
                    }
                  });
}
});
}
});
}
});
}
});
});

router.post('/details_helper', (req, res) => {
  var dept = req.body.dept;
  helper.listDeptCourses(dept,(err,result)=>{
    if(err){
      req.flash('/courses/details',err);
      res.redirect('courses/details');
    }
    else{
      var courses = result;
      helper.listDepartments((err,result)=>{
        if(err){
          req.flash('/courses/details',err);
          res.redirect('courses/details');
        }
        else{
          res.render('course_details',{depts:result,courses:courses,depart:dept,user:req.body.username});
        }
      });
    }
  });
});


module.exports = router;