var express = require('express');

var helper = require('../lib/major_helper');

var course_helper = require('../lib/course_helper');

var router = express.Router();

router.get('/', (req, res) => {
  var user = req.session.user;
  var major = req.query.major;
  var concentration = req.query.concentration;
  var message = req.flash('login') || '';
  // var list;
  // helper.list( major, (error, courses) => {
  //   list = courses || '';
  // });
  helper.getMajors( (err, majors) =>{
    if(err){
      message = err;
      res.render('major', {
        major: major,
        concentration: concentration,
        message: message,
        user:user,
      });
      return;
    }
    if(major){
      helper.getConcentrations(major, (err, concentrations) => {
        if(err){
          message = err;
          res.render('major', {
            major: major,
            majors: majors,
            concentration: concentration,
            message: message,
            user:user,
          });
          return;
        }
        if(concentration){
          helper.list(major, concentration, (err, list) => {
            if(err){
              message = err;
              res.render('major', {
                major: major,
                majors: majors,
                concentration: concentration,
                concentrations: concentrations,
                message: message,
                user:user,
              });
              return;
            }
            if(user){
              course_helper.listUserCourses(user.name, (error, courses) => {
                if(error){
                  message = err;
                }
                var info = helper.formatCourseInfo(list, courses);
                var stats = helper.calculateStats(info);
                res.render('major', {
                  major: major,
                  concentration: concentration,
                  majors: majors,
                  concentrations: concentrations,
                  courses: info,
                  num_completed: stats[0],
                  num_remaining: stats[1],
                  message: message,
                  user:user,
                });
              });
            }
            else{
              var courses = helper.formatCourseInfo(list, undefined);
              res.render('major', {
                major: major,
                concentration: concentration,
                majors: majors,
                concentrations: concentrations,
                courses: courses,
                message: message,
                user:user,
              });
            }
          });
        }
        else{
          res.render('major', {
            major: major,
            concentration: concentration,
            majors: majors,
            concentrations: concentrations,
            message: message,
            user:user,
          });
        }
      });
    }
    else{
      res.render('major', {
        major: major,
        concentration: concentration,
        majors: majors,
        message: message,
        user:user,
      });
    }
  });
});

router.post('/select', (req, res) => {
  if(req.body.selection === 'major'){
    var major = req.body.major;
    res.redirect('/major/?major='+major);
  }
  else{
    var major = req.body.major;
    var concentration = req.body.concentration;
    res.redirect('/major/?major='+major+'&concentration='+concentration);
  }
});

router.get('/inspire', (req, res) => {
  var user = req.session.user;
  var major = req.query.major;
  var concentration = req.query.concentration;
  var dept = req.query.dept;
  var num = req.query.num;
  var message = req.flash('inspire') || '';
  // var list;
  // helper.list( major, (error, courses) => {
  //   list = courses || '';
  // });
  course_helper.listDepartments( (err, depts) => {
    if(err){
      console.log(err);
      message = err;
    }
    helper.getMajors( (err, majors) =>{
      if(err){
        message = err;
        res.render('inspire', {
          major: major,
          concentration: concentration,
          message: message,
          depts: depts,
          user:user
        });
        return;
      }
      if(major){
        helper.getConcentrations(major, (err, concentrations) => {
          if(err){
            message = err;
            res.render('inspire', {
              major: major,
              majors: majors,
              concentration: concentration,
              message: message,
              depts: depts,
              user:user,
            });
            return;
          }
          if(concentration){
            helper.list(major, concentration, (err, list) => {
              if(err){
                message = err;
                res.render('inspire', {
                  major: major,
                  majors: majors,
                  concentration: concentration,
                  concentrations: concentrations,
                  message: message,
                  depts: depts,
                  user:user,
                });
                return;
              }
              if(user){
                course_helper.listUserCourses(user.name, (error, courses) => {
                  if(error){
                    message = err;
                  }
                  var info = helper.formatCourseInfo(list, courses);
                  var stats = helper.calculateStats(info);
                  res.render('inspire', {
                    major: major,
                    concentration: concentration,
                    majors: majors,
                    concentrations: concentrations,
                    courses: info,
                    num_completed: stats[0],
                    num_remaining: stats[1],
                    message: message,
                    depts: depts,
                    user:user,
                  });
                });
              }
              else{
                var courses = helper.formatCourseInfo(list, undefined);
                res.render('inspire', {
                  major: major,
                  concentration: concentration,
                  majors: majors,
                  concentrations: concentrations,
                  courses: courses,
                  message: message,
                  depts: depts,
                  user:user,
                });
              }
            });
          }
          else{
            res.render('inspire', {
              major: major,
              concentration: concentration,
              majors: majors,
              concentrations: concentrations,
              message: message,
              depts: depts,
              user:user,
            });
          }
        });
      }
      else if(dept && num){
        var course = {dept: dept, num: num};
        helper.getMajorsWithCourse(course, (err, course_majors) => {
          if(err){
            console.log(err);
            req.flash('inspire', err);
          }
          res.render('inspire', {
            major: major,
            concentration: concentration,
            majors: majors,
            message: message,
            course_majors: course_majors,
            depts: depts,
            user:user
          });
        });
      }
      else{
        res.render('inspire', {
          major: major,
          concentration: concentration,
          majors: majors,
          message: message,
          depts: depts,
          user:user,
        });
      }
    });
  });
});

router.post('/inspire/concentration', (req, res) => {
  var user = req.session.user;
  var major = req.body.major;
  if(user){
    course_helper.listUserCourses(user.name, (error, courses) => {
      if(error){
        console.log(error);
        req.flash('inspire', error)
      }
      helper.inspireConcentration(major, courses, (err, concentration) => {
        if(err){
          console.log(err);
          req.flash('inspire', err);
        }
        res.redirect('/major/inspire/?form=concentration&major='+major+'&concentration='+concentration);
      });
    });
  }
  else{
    helper.inspireConcentration(major, undefined, (err, concentration) => {
      if(err){
        console.log(err);
        req.flash('inspire', err);
      }
      res.redirect('/major/inspire/?form=concentration&major='+major+'&concentration='+concentration);
    });
  }
});

router.post('/inspire/concentration/reqs', (req, res) => {
  var major = req.body.major;
  var concentration = req.body.concentration;
  res.redirect('/major/?&major='+major+'&concentration='+concentration);
});

router.post('/inspire/major', (req, res) => {
  var major = 'COMPSCI';
  var concentration = 'GENCOMPSCI';
  res.redirect('/major/inspire/?form=major&major='+major+'&concentration='+concentration);
});

router.post('/inspire/major/reqs', (req, res) => {
  var major = req.body.major;
  var concentration = req.body.concentration;
  res.redirect('/major/?&major='+major+'&concentration='+concentration);
});

router.post('/inspire/course', (req, res) => {
  var dept = req.body.dept;
  var num = req.body.num;
  res.redirect('/major/inspire/?form=course&dept='+dept+'&num='+num);
});

router.post('/inspire/course/reqs', (req, res) => {
  var major = 'COMPSCI';
  var concentration = 'GENCOMPSCI';
  res.redirect('/major/?&major='+major+'&concentration='+concentration);
});

module.exports = router;