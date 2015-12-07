var express = require('express');

var helper = require('../lib/major_helper');

var router = express.Router();

router.get('/', (req, res) => {
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
        message: message
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
            message: message
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
                message: message
              });
              return;
            }
            var courses = helper.formatCourseInfo(list);
            res.render('major', {
              major: major,
              concentration: concentration,
              majors: majors,
              concentrations: concentrations,
              courses: courses,
              message: message
            });
          });
        }
        else{
          res.render('major', {
            major: major,
            concentration: concentration,
            majors: majors,
            concentrations: concentrations,
            message: message
          });
        }
      });
    }
    else{
      res.render('major', {
        major: major,
        concentration: concentration,
        majors: majors,
        message: message
      });
    }
  });
});

router.post('/select', (req, res) => {
  // console.log(req.body);
  // console.log(req.body.selection);
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

module.exports = router;