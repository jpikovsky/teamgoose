var express = require('express');

var helper = require('../lib/major_helper');

var router = express.Router();

router.get('/', (req, res) => {
  var major = req.query.major;
  var concentration = req.query.concentration;
  // var list;
  // helper.list( major, (error, courses) => {
  //   list = courses || '';
  // });
  helper.getMajors( (err, majors) =>{
    if(err){
      console.log(err);
    }
    if(major){
      helper.getConcentrations(major, (err, concentrations) => {
        if(err){
          console.log(err);
        }
        var list;
        if(concentration){
          helper.list(major, concentration, (err, result) => {
            if(err){
              console.log(err);
            }
            else{
              list = result;
            }
          });
        }
        res.render('major', {
          major: major,
          concentration: concentration,
          majors: majors,
          concentrations: concentrations,
          courses: list
        });
      });
    }
    else{
      res.render('major', {
        major: major,
        concentration: concentration,
        majors: majors
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